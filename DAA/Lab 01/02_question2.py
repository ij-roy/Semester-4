def sort_even_odd(arr):
    even_indices = [arr[i] for i in range(len(arr)) if i % 2 == 0]
    odd_indices = [arr[i] for i in range(len(arr)) if i % 2 != 0]
    
    even_indices.sort()
    
    odd_indices.sort(reverse=True)

    result = []
    even_idx, odd_idx = 0, 0
    for i in range(len(arr)):
        if i % 2 == 0:
            result.append(even_indices[even_idx])
            even_idx += 1
        else:
            result.append(odd_indices[odd_idx])
            odd_idx += 1
    
    return result

arr = [4, 1, 3, 2, 5, 6, 7, 8]
sorted_arr = sort_even_odd(arr)
print("Sorted Array:", sorted_arr)