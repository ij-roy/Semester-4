import sympy as sym
import numpy as np

# Important Note Before asking the user for Input
print("NOTE: Please enter variables in the form of x1, x2, x3...")
print("Enter powers as *.\nExample: x1^2 should be entered as 'x1*2'\n")

# Asking for the number of variables
n = int(input("Enter the number of variables in the objective function: "))

# Defining symbolic variables dynamically
variables = [sym.symbols(f'x{i+1}') for i in range(n)]

# Taking input for the function
fun = input("Enter the function: ")
f = sym.sympify(fun)  # Convert input string to a symbolic expression

# Finding the gradient (first derivatives)
gradient = [sym.diff(f, var) for var in variables]

# Finding critical points (solving df = 0)
critical_points = sym.solve(gradient, variables)

print("\nCritical Points:")
print(critical_points if critical_points else "No critical points found.")

# Making the Hessian Matrix
hessian = np.zeros((n, n), dtype=object)

for i in range(n):
    for j in range(n):
        hessian[i][j] = sym.diff(sym.diff(f, variables[i]), variables[j])

# Convert Hessian to SymPy matrix
hessian_matrix = sym.Matrix(hessian)
print("\nHessian Matrix:")
sym.pprint(hessian_matrix)

# Checking Convexity/Concavity
print("\nChecking Convexity/Concavity using Leading Principal Minors:")

determinants = []  # Store leading principal minor determinants

for i in range(1, n + 1):  # Loop for submatrix sizes (1x1, 2x2, ..., nxn)
    for j in range(1, n + 1):  # Check every row-column pair
        if i == j:  # Condition to check leading principal minor
            minor = hessian_matrix[:i, :i]  # Extract top-left i×i submatrix
            determinant = minor.det()  # Compute determinant
            determinants.append(determinant)
            print(f"Determinant of {i}x{i} leading minor:", determinant)

if all(d > 0 for d in determinants):
    print("The function is *convex* (all leading principal minors are positive).")
elif all((d > 0 if i % 2 == 0 else d < 0) for i, d in enumerate(determinants, start=1)):
    print("The function is *concave* (Sylvester's criterion for concavity met).")
else:
    print("The function is *neither convex nor concave* (indefinite Hessian).")