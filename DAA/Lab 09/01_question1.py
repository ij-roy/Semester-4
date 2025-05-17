def knapsack_01(weights, values, capacity):
    n = len(weights)
    dp = [[0] * (capacity + 1) for _ in range(n + 1)]

    for i in range(1, n + 1):
        for w in range(capacity + 1):
            if weights[i - 1] <= w:  
                dp[i][w] = max(dp[i - 1][w], values[i - 1] + dp[i - 1][w - weights[i - 1]])
            else:
                dp[i][w] = dp[i - 1][w]  

    return dp[n][capacity]

# Given input
weights = [3, 2, 2]
values = [1.5, 1, 1]
capacity = 4

max_value = knapsack_01(weights, values, capacity)
print("Maximum value in Knapsack:", max_value)
