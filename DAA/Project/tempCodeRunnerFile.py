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
