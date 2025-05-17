import math

def dist(p1, p2):
    return math.sqrt((p1[0] - p2[0]) ** 2 + (p1[1] - p2[1]) ** 2)

def brute_force(points, n):
    min_dist = float("inf")
    for i in range(n):
        for j in range(i + 1, n):
            min_dist = min(min_dist, dist(points[i], points[j]))
    return min_dist

def strip_closest(strip, d):
    min_dist = d
    strip.sort(key=lambda p: p[1])  # Sort by y-coordinates
    
    for i in range(len(strip)):
        j = i + 1
        while j < len(strip) and (strip[j][1] - strip[i][1]) < min_dist:
            min_dist = min(min_dist, dist(strip[i], strip[j]))
            j += 1
    return min_dist

def closest_util(points, n):
    if n <= 3:
        return brute_force(points, n)

    mid = n // 2
    mid_point = points[mid]

    dl = closest_util(points[:mid], mid)
    dr = closest_util(points[mid:], n - mid)
    d = min(dl, dr)

    strip = [p for p in points if abs(p[0] - mid_point[0]) < d]
    
    return min(d, strip_closest(strip, d))

def closest_pair(points):
    points.sort()  # Sort by x-coordinates
    return closest_util(points, len(points))

# Example usage
points = [(2, 3), (12, 30), (40, 50), (5, 1), (12, 10), (3, 4)]
print("The smallest distance is:", closest_pair(points))
