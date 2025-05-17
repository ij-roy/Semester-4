import pandas as pd
import networkx as nx
import heapq
import os
import tkinter as tk
from tkinter import ttk, messagebox
import folium
import webbrowser
from geopy.geocoders import Nominatim
import openrouteservice

ORS_API_KEY = "5b3ce3597851110001cf62480d415889d20f40ddb2189f88b962dd2d"
ors_client = openrouteservice.Client(key=ORS_API_KEY)

def get_road_route(start_coord, end_coord):
    try:
        route = ors_client.directions(
            coordinates=[start_coord, end_coord],
            profile='driving-car',
            format='geojson'
        )
        return [(pt[1], pt[0]) for pt in route['features'][0]['geometry']['coordinates']]
    except Exception as e:
        print(f"ORS API error: {e}")
        return [start_coord, end_coord]

def load_graph(file_path="realistic_route_dataset.csv"):
    file_path = os.path.join(os.path.dirname(__file__), file_path)
    if not os.path.exists(file_path):
        raise FileNotFoundError(f"CSV file not found: {file_path}")
        
    graph = nx.Graph()
    data = pd.read_csv(file_path)
    for _, row in data.iterrows():
        edge_data = dict(
            distance=row["Distance_km"],
            tolls=row["Tolls"],
            traffic=row["Traffic_Level"] * row["Peak_Hour_Factor"] + row["Weather_Impact"],
            road_quality=row["Road_Quality"] * row["Seasonal_Factor"],
            hotel_cost=row["Hotel_Cost"],
            aesthetics=row["Aesthetics"],
            fuel_price=row["Fuel_Price"],
            toll_price=row["Toll_Cost"]
        )
        graph.add_edge(row["Source"], row["Destination"], **edge_data)
    return graph

def cost_function(graph, start, end, mileage=15, max_distance=300):
    edge = graph[start][end]
    fuel_needed = edge["distance"] / mileage
    fuel_cost = fuel_needed * edge["fuel_price"]
    hotel_stops = edge["distance"] // max_distance
    hotel_cost = hotel_stops * edge["hotel_cost"]
    return fuel_cost + edge["toll_price"] + hotel_cost

def time_function(graph, start, end, avg_speed=60, max_distance=300):
    edge = graph[start][end]
    travel_time = edge["distance"] / avg_speed
    rest_time = edge["distance"] // max_distance
    return travel_time + edge["traffic"] + rest_time

def satisfaction_function(graph, start, end):
    edge = graph[start][end]
    score = edge["aesthetics"] + edge["road_quality"] - edge["traffic"]
    return max(0.01, 10 - score)

def dijkstra(graph, source, destination, weight_function, *args):
    pq = [(0, source)]
    distances = {node: float('inf') for node in graph.nodes}
    previous = {node: None for node in graph.nodes}
    distances[source] = 0
    while pq:
        current_dist, current_node = heapq.heappop(pq)
        if current_node == destination:
            break
        for neighbor in graph.neighbors(current_node):
            weight = weight_function(graph, current_node, neighbor, *args)
            new_dist = current_dist + weight
            if new_dist < distances[neighbor]:
                distances[neighbor] = new_dist
                previous[neighbor] = current_node
                heapq.heappush(pq, (new_dist, neighbor))
    path, current = [], destination
    while current is not None:
        path.append(current)
        current = previous[current]
    if distances[destination] == float('inf'):
        raise ValueError(f"No valid path found from {source} to {destination}.")
    return path[::-1], distances[destination]

def astar(graph, source, destination, weight_function, *args):
    def heuristic(u, v): return 0
    open_set = [(0, source)]
    g_score = {node: float('inf') for node in graph.nodes}
    f_score = {node: float('inf') for node in graph.nodes}
    previous = {node: None for node in graph.nodes}
    g_score[source] = 0
    f_score[source] = heuristic(source, destination)
    while open_set:
        _, current = heapq.heappop(open_set)
        if current == destination:
            break
        for neighbor in graph.neighbors(current):
            temp_g = g_score[current] + weight_function(graph, current, neighbor, *args)
            if temp_g < g_score[neighbor]:
                previous[neighbor] = current
                g_score[neighbor] = temp_g
                f_score[neighbor] = temp_g + heuristic(neighbor, destination)
                heapq.heappush(open_set, (f_score[neighbor], neighbor))
    path, current = [], destination
    while current is not None:
        path.append(current)
        current = previous[current]
    if g_score[destination] == float('inf'):
        raise ValueError(f"No valid path found from {source} to {destination}.")
    return path[::-1], g_score[destination]

def bellman_ford(graph, source, destination, weight_function):
    distances = {node: float('inf') for node in graph.nodes}
    previous = {node: None for node in graph.nodes}
    distances[source] = 0
    for _ in range(len(graph.nodes) - 1):
        for u, v in graph.edges:
            weight = weight_function(graph, u, v)
            if distances[u] + weight < distances[v]:
                distances[v] = distances[u] + weight
                previous[v] = u
            if distances[v] + weight < distances[u]:
                distances[u] = distances[v] + weight
                previous[u] = v
    path, current = [], destination
    while current is not None:
        path.append(current)
        current = previous[current]
    if distances[destination] == float('inf'):
        raise ValueError(f"No valid path found from {source} to {destination}.")
    return path[::-1], distances[destination]

class RouteOptimizerApp:
    def __init__(self, root):
        self.root = root
        self.root.title("🚗 Route Optimizer - India Map")
        self.root.geometry("420x300")
        self.root.configure(bg="#f0f2f5")
        self.graph = load_graph()
        self.build_ui()

    def build_ui(self):
        frm = ttk.Frame(self.root, padding=20)
        frm.pack(fill="both", expand=True)

        ttk.Label(frm, text="Start City:").grid(row=0, column=0, sticky="w")
        self.start_var = ttk.Combobox(frm, values=list(self.graph.nodes), state="readonly", width=30)
        self.start_var.grid(row=0, column=1)

        ttk.Label(frm, text="Destination City:").grid(row=1, column=0, sticky="w")
        self.dest_var = ttk.Combobox(frm, values=list(self.graph.nodes), state="readonly", width=30)
        self.dest_var.grid(row=1, column=1)

        ttk.Label(frm, text="Optimization Mode:").grid(row=2, column=0, sticky="w")
        self.opt_var = ttk.Combobox(frm, values=["Cost", "Time", "Satisfaction"], state="readonly", width=30)
        self.opt_var.grid(row=2, column=1)

        ttk.Label(frm, text="Mileage (km/l):").grid(row=3, column=0, sticky="w")
        self.mileage_entry = ttk.Entry(frm, width=32)
        self.mileage_entry.insert(0, "15")
        self.mileage_entry.grid(row=3, column=1)

        ttk.Label(frm, text="Avg Speed (km/h):").grid(row=4, column=0, sticky="w")
        self.speed_entry = ttk.Entry(frm, width=32)
        self.speed_entry.insert(0, "60")
        self.speed_entry.grid(row=4, column=1)

        ttk.Button(frm, text="Find Route", command=self.calculate_route).grid(row=5, column=0, columnspan=2, pady=10)
        ttk.Button(frm, text="View All Cities", command=self.view_entire_graph).grid(row=6, column=0, columnspan=2)

    def calculate_route(self):
        start = self.start_var.get()
        end = self.dest_var.get()
        mode = self.opt_var.get().lower()
        if not start or not end or not mode:
            messagebox.showerror("Error", "Please select all fields.")
            return
        mileage = float(self.mileage_entry.get())
        speed = float(self.speed_entry.get())
        try:
            if mode == "cost":
                path, value = dijkstra(self.graph, start, end, cost_function, mileage)
                algo = "Dijkstra's Algorithm"
            elif mode == "time":
                path, value = astar(self.graph, start, end, time_function, speed)
                algo = "A* Algorithm"
            else:
                path, value = bellman_ford(self.graph, start, end, satisfaction_function)
                algo = "Bellman-Ford Algorithm"
            print(f"\n{'='*50}\nROUTE FOUND USING {mode.upper()} OPTIMIZATION ({algo})\n{'='*50}")
            total = 0
            for i in range(len(path)-1):
                src, dst = path[i], path[i+1]
                if mode == "cost":
                    step = cost_function(self.graph, src, dst, mileage)
                elif mode == "time":
                    step = time_function(self.graph, src, dst, speed)
                else:
                    step = satisfaction_function(self.graph, src, dst)
                print(f"{src} -> {dst} | {mode.title()} Value: {step:.2f}")
                total += step
            print(f"\nTotal {mode.title()}: {total:.2f}\n{'='*50}\n")
            messagebox.showinfo("Optimal Route", f"Route: {' -> '.join(path)}\n{mode.title()} Value: {value:.2f}")
            self.display_on_map(path, highlight='blue')
        except ValueError as e:
            messagebox.showerror("Route Error", str(e))
            self.display_on_map([start, end], highlight='red')

    def display_on_map(self, cities, highlight='blue'):
        geolocator = Nominatim(user_agent="route_optimizer")
        coords = []
        for city in cities:
            location = geolocator.geocode(f"{city}, India")
            if location:
                coords.append((location.latitude, location.longitude))
        if coords:
            m = folium.Map(location=coords[0], zoom_start=5)
            folium.Marker(coords[0], tooltip="Start").add_to(m)
            folium.Marker(coords[-1], tooltip="End").add_to(m)
            full_path = []
            for i in range(len(coords) - 1):
                segment = get_road_route((coords[i][1], coords[i][0]), (coords[i+1][1], coords[i+1][0]))
                full_path.extend(segment)
            folium.PolyLine(full_path, color=highlight, weight=5).add_to(m)
            m.save("route_map.html")
            webbrowser.open("route_map.html")

    def view_entire_graph(self):
        geolocator = Nominatim(user_agent="route_optimizer")
        coords = {}
        for city in self.graph.nodes:
            location = geolocator.geocode(f"{city}, India")
            if location:
                coords[city] = (location.latitude, location.longitude)
        m = folium.Map(location=list(coords.values())[0], zoom_start=5)
        for node in coords:
            folium.Marker(coords[node], tooltip=node).add_to(m)
        for src, dst in self.graph.edges:
            if src in coords and dst in coords:
                folium.PolyLine([coords[src], coords[dst]], color='gray').add_to(m)
        m.save("all_cities_map.html")
        webbrowser.open("all_cities_map.html")

if __name__ == "__main__":
    root = tk.Tk()
    app = RouteOptimizerApp(root)
    root.mainloop()