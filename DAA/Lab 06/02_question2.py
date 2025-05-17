def find_min_max(arr, left, right):
    if left == right:
        return arr[left], arr[right]
    
    if right == left + 1:
        return (min(arr[left], arr[right]), max(arr[left], arr[right]))
    
    mid = (left + right) // 2
    left_min, left_max = find_min_max(arr, left, mid)
    right_min, right_max = find_min_max(arr, mid + 1, right)
    
    return (min(left_min, right_min), max(left_max, right_max))

arr = [3, 5, 1, 8, 2, 7, 6, 4]
min_val, max_val = find_min_max(arr, 0, len(arr) - 1)
print(f"Minimum: {min_val}, Maximum: {max_val}")