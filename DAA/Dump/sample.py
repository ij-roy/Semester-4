import json
import heapq
import random
import folium
from geopy.distance import geodesic

class Route_Optimization:
    def __init__(self,json_path, average_toll_cost,hotel_cost):
        self.graph= {}
        self.positions={}
        self.load_data(json_path,average_toll_cost, hotel_cost)

    def load_data(self, json_path, average_toll_cost, hotel_cost):
        with open(json_path,'r') as f:
            data= json.load(f)
        
        for city, info in data.items():
            self.positions[city]= (info['lat'], info['lon'])
            for connected_city,distance in info['connections'].items():
                num_tolls= random.randint(1, 5)
                toll_cost= average_toll_cost * num_tolls
                traffic_delay=random.randint(2, 30)

                traffic_rating= 5 * (30 / traffic_delay)
                
                road_quality= random.randint(1, 5)
                aesthetics= random.randint(1, 5)

                self.add_edge(city, connected_city, distance,toll_cost, traffic_delay,traffic_rating,road_quality, aesthetics, hotel_cost)

    def add_edge(self, city1, city2, distance, toll_cost, traffic_delay, traffic_rating,road_quality, aesthetics, hotel_cost):
        
        if city1 not in self.graph:
            self.graph[city1]={}
        if city2 not in self.graph:
            self.graph[city2]= {}
        
        self.graph[city1][city2]={
            'distance': distance,
            'toll': toll_cost,
            'traffic_delay': traffic_delay,
            'traffic_rating': traffic_rating,
            'road_quality': road_quality,
            'aesthetics': aesthetics,
            'hotel_cost': hotel_cost
        }
        self.graph[city2][city1]= self.graph[city1][city2]

    def dijkstra(self, start,end, mode,mileage, fuel_price, max_distance,avg_speed,rest_time):
        pq= []

        heapq.heappush(pq,(0, start, [start]))
        visited= set()

        while pq:
            curr_weight, node, path= heapq.heappop(pq)
            if node in visited:
                continue

            visited.add(node)

            if node == end:
                return curr_weight,path
            
            for neighbor, attrs in self.graph[node].items():
                
                if neighbor in visited:
                    continue

                distance= attrs['distance']
                toll_cost= attrs['toll']
                traffic_delay=attrs['traffic_delay']
                traffic_rating= attrs['traffic_rating']
                road_quality= attrs['road_quality']
                aesthetics=attrs['aesthetics']
                hotel_cost= attrs['hotel_cost']

                if mode== "cost":
                    fuel_cost= (distance / mileage) * fuel_price
                    total_cost= fuel_cost + toll_cost
                    total_cost += (distance // max_distance) * hotel_cost
                    weight= total_cost

                elif mode== "time":
                    base_time= distance / avg_speed
                    road_factor= 5 / road_quality
                    total_time= base_time * road_factor + traffic_delay
                    resting_time= (distance // max_distance) * rest_time
                    total_time += resting_time
                    weight= total_time
                
                elif mode== "satisfaction":
                    satisfaction_score= aesthetics +road_quality -traffic_rating
                    weight= 1/max(satisfaction_score, 1)

                heapq.heappush(pq, (curr_weight +weight, neighbor, path+ [neighbor]))

        return float('inf'),[]

    def visualize_graph(self, optimal_path=None):
        m= folium.Map(location=[20.5937, 78.9629], zoom_start=5, tiles='OpenStreetMap')

        # Trying to debug :(
        print("Cities in self.positions:", list(self.positions.keys()))

        for city in self.graph:
            for neighbor, attrs in self.graph[city].items():
                if city<neighbor:

                    if neighbor not in self.positions:
                        print(f"Warning: {neighbor} not found in positions")
                        continue
                    start_coords= self.positions[city]
                    end_coords= self.positions[neighbor]

                    folium.PolyLine(
                        locations=[start_coords, end_coords],
                        weight=2,
                        color='blue',
                        opacity=0.8,
                        popup=f"{city} - {neighbor}: {attrs['distance']} km"
                    ).add_to(m)

        if optimal_path:
            for i in range(len(optimal_path)-1):
                start_city= optimal_path[i]
                end_city= optimal_path[i+1]
                if start_city not in self.positions or end_city not in self.positions:
                    print(f"Warning: Missing coordinates for {start_city} or {end_city}")
                    continue

                start_coords= self.positions[start_city]
                end_coords= self.positions[end_city]

                distance= self.graph[start_city][end_city]['distance']

                folium.PolyLine(
                    locations=[start_coords, end_coords],
                    weight=3,
                    color='red',
                    opacity=1,
                    popup=f"{start_city} - {end_city}: {distance} km"
                ).add_to(m)

        for city, coords in self.positions.items():

            folium.Marker(
                location=coords,
                popup=city,
                icon=folium.Icon(color='green', icon='info-sign')
            ).add_to(m)

        m.save('route_map.html')

        print("Map has been saved as 'route_map.html'. Open it in a browser to view.")

if __name__ == "__main__":
    json_path = r"D:\VS Code\Semester 4\DAA\Project\city_distance3.json"

    
    average_toll_cost= 50
    hotel_cost= 100

    route_optimizer= Route_Optimization(json_path, average_toll_cost, hotel_cost)
    
    start_city= "Vizag"
    end_city= "Amritsar"
    mode= "time"
    mileage= 15
    fuel_price= 100
    max_distance= 300
    avg_speed= 60
    rest_time= 2

    cost, path= route_optimizer.dijkstra(start_city, end_city, mode, mileage, fuel_price,max_distance, avg_speed, rest_time)

    print(f"Optimal {mode} route from {start_city} to {end_city}: {' -> '.join(path)}")
    print(f"Total {mode}: {cost:.2f}")

    route_optimizer.visualize_graph(path)