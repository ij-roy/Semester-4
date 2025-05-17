from collections import deque 

def is_bipartite(graph , V):
    color = [-1] * V
    # print(color)

    for start in range(V):
        if color[start] == -1:
            queue = deque([start])
            # print(deque)
            color[start] = 0
            # print(color)
            # print(queue)

            while queue:
                # print(queue)
                node = queue.popleft()
                # print(queue)
                # print(node)
                
                for neighbor in graph[node]:
                    # print(graph)
                    # print(graph[node])
                    # print(color[neighbor])
                    if color[neighbor] == -1:
                        color[neighbor] = 1 - color[node]
                        queue.append(neighbor)
                        # print(queue)
                        # print(color)
                    elif color[neighbor] == color[node]:
                        print("Graph is not Bipartite")
                        return False

    print("\nGraph is bipartite . Node colors:")
    for i,c in enumerate(color):
        print(f"Node {i}: Color {c}")
    return True

#_________Main Program________
V = int(input("Enter number of vertices: "))
E = int(input("Enter number of Edges: "))

# Create adjacency list
graph = [[] for _ in range(V)]

print("Enter edges (u,v): ")
for _ in range(E):
    u,v = map(int,input().split())
    graph[u].append(v)
    graph[v].append(u)
    # print(graph)

is_bipartite(graph, V)