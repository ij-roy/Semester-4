def binary_search(arr, item):
    first, last = 0, len(arr)-1

    while first <= last:
        mid = (first + last)//2
        if arr[mid] == item:
            return mid
        elif arr[mid] < item:
            first = mid + 1
        else:
            last = mid - 1
    return -1

listt = [34, 56, 79, 23, 10, 92]
sorted_list = sorted(listt)
item = 79
bs = binary_search(sorted_list, item)
print(f"sorted array is: {sorted_list}")
print(f"index of the item is: {bs}")