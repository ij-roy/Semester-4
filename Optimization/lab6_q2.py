from scipy.optimize import minimize
import numpy as np

# Define the cost function
def cost_function(x):
    # x is the distance from P to T along the bank
    distance_underwater = np.sqrt(1 + x**2)
    distance_along_bank = 4 - x
    cost = 15000 * distance_underwater + 9000 * distance_along_bank
    return cost

# Initial guess for x
initial_guess = 2.0

# Minimize the cost function
result = minimize(cost_function, initial_guess, bounds=[(0, 4)])

# Extract the optimal distance from P to T
optimal_distance = result.x[0]
optimal_cost = result.fun

print(f"The optimal distance from P to T is {optimal_distance:.2f} kilometers.")
print(f"The minimum cost is ${optimal_cost:.2f}.")