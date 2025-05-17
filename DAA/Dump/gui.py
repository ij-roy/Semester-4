import requests
import json
import folium
import heapq
import random
import tkinter as tk
from tkinter import messagebox
from tkinter import ttk

API_KEY = "5b3ce3597851110001cf6248c0a49010e50049b79e8741d3112f6786"

class Route_Optimization:
    def __init__(self, json_path, average_toll_cost, hotel_cost):
        self.graph = {}
        self.positions = {}
        self.load_data(json_path, average_toll_cost, hotel_cost)

    def load_data(self, json_path, average_toll_cost, hotel_cost):
        with open(json_path, 'r') as f:
            data = json.load(f)
        
        for city, info in data.items():
            self.positions[city] = (info['lat'], info['lon'])
            for connected_city, distance in info['connections'].items():
                num_tolls = random.randint(1, 5)
                toll_cost = average_toll_cost * num_tolls
                traffic_delay = random.randint(2, 30)
                traffic_rating = 5 * (30 / traffic_delay)
                road_quality = random.randint(1, 5)
                aesthetics = random.randint(1, 5)
                
                self.add_edge(city, connected_city, distance, toll_cost, traffic_delay, traffic_rating, road_quality, aesthetics, hotel_cost)

    def add_edge(self, city1, city2, distance, toll_cost, traffic_delay, traffic_rating, road_quality, aesthetics, hotel_cost):
        if city1 not in self.graph:
            self.graph[city1] = {}
        if city2 not in self.graph:
            self.graph[city2] = {}
        
        self.graph[city1][city2] = {
            'distance': distance,
            'toll': toll_cost,
            'traffic_delay': traffic_delay,
            'traffic_rating': traffic_rating,
            'road_quality': road_quality,
            'aesthetics': aesthetics,
            'hotel_cost': hotel_cost
        }
        self.graph[city2][city1] = self.graph[city1][city2]

    def dijkstra(self, start, end, mode, mileage, fuel_price, max_distance, avg_speed, rest_time):
        pq = []
        heapq.heappush(pq, (0, start, [start]))
        visited = set()
        
        while pq:
            curr_weight, node, path = heapq.heappop(pq)
            if node in visited:
                continue
            visited.add(node)
            if node == end:
                return curr_weight, path
            
            for neighbor, attrs in self.graph[node].items():
                if neighbor in visited:
                    continue
                distance = attrs['distance']
                toll_cost = attrs['toll']
                traffic_delay = attrs['traffic_delay']
                road_quality = attrs['road_quality']
                aesthetics = attrs['aesthetics']
                hotel_cost = attrs['hotel_cost']
                
                if mode == "cost":
                    fuel_cost = (distance / mileage) * fuel_price
                    total_cost = fuel_cost + toll_cost + (distance // max_distance) * hotel_cost
                    weight = total_cost
                elif mode == "time":
                    base_time = distance / avg_speed
                    road_factor = 5 / road_quality
                    total_time = base_time * road_factor + traffic_delay + (distance // max_distance) * rest_time
                    weight = total_time
                elif mode == "satisfaction":
                    satisfaction_score = aesthetics + road_quality - traffic_delay
                    weight = 1 / max(satisfaction_score, 1)
                
                heapq.heappush(pq, (curr_weight + weight, neighbor, path + [neighbor]))
        
        return float('inf'), []

    def get_road_route(self, start, end):
        url = f"https://api.openrouteservice.org/v2/directions/driving-car?api_key={API_KEY}&start={self.positions[start][1]},{self.positions[start][0]}&end={self.positions[end][1]},{self.positions[end][0]}"
        response = requests.get(url)
        if response.status_code == 200:
            return response.json()["routes"][0]["geometry"]
        return None

    def visualize_graph(self, optimal_path=None):
        m = folium.Map(location=[20.5937, 78.9629], zoom_start=5, tiles='OpenStreetMap')
        for city, coords in self.positions.items():
            folium.Marker(location=coords, popup=city, icon=folium.Icon(color='green')).add_to(m)
        if optimal_path:
            for i in range(len(optimal_path) - 1):
                route = self.get_road_route(optimal_path[i], optimal_path[i + 1])
                if route:
                    folium.PolyLine(route, color='red').add_to(m)
        m.save("route_map.html")
        messagebox.showinfo("Success", "Map saved as route_map.html")

class RouteGUI:
    def __init__(self, root, optimizer):
        self.optimizer = optimizer
        self.root = root
        self.root.title("Route Optimization")
        
        ttk.Label(root, text="Start City:").grid(row=0, column=0)
        self.start_city = ttk.Combobox(root, values=list(self.optimizer.graph.keys()))
        self.start_city.grid(row=0, column=1)
        
        ttk.Label(root, text="End City:").grid(row=1, column=0)
        self.end_city = ttk.Combobox(root, values=list(self.optimizer.graph.keys()))
        self.end_city.grid(row=1, column=1)
        
        ttk.Label(root, text="Mode:").grid(row=2, column=0)
        self.mode = ttk.Combobox(root, values=["cost", "time", "satisfaction"])
        self.mode.grid(row=2, column=1)
        
        ttk.Button(root, text="Find Route", command=self.find_route).grid(row=3, column=0, columnspan=2)
    
    def find_route(self):
        start = self.start_city.get()
        end = self.end_city.get()
        mode = self.mode.get()
        if not start or not end or not mode:
            messagebox.showerror("Error", "Please select all fields!")
            return
        
        cost, path = self.optimizer.dijkstra(start, end, mode, 15, 100, 300, 60, 2)
        if path:
            messagebox.showinfo("Optimal Route", f"Best route: {' -> '.join(path)}\nTotal {mode}: {cost:.2f}")
            self.optimizer.visualize_graph(path)
        else:
            messagebox.showerror("Error", "No route found!")

if __name__ == "__main__":
    json_path = "D:/VS Code/Semester 4/DAA/Project/city_distance3.json"
    optimizer = Route_Optimization(json_path, 50, 100)
    root = tk.Tk()
    app = RouteGUI(root, optimizer)
    root.mainloop()
