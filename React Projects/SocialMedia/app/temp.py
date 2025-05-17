import sympy as sym
import numpy as np

# Important Note Before asking the user for Input
print("NOTE: Please enter variables in the form of x1, x2, x3...")
print("Enter powers using '**'.\nExample: x1^2 should be entered as 'x1**2'\n")

# Asking for the number of variables
n = int(input("Enter the number of variables in the objective function: "))

# Defining symbolic variables dynamically
variables = [sym.symbols(f'x{i+1}') for i in range(n)]

# Taking input for the function
fun = input("Enter the function: ")
f = sym.sympify(fun)  # Convert input string to a symbolic expression

# Finding the gradient (first derivatives)
gradient = [sym.diff(f, var) for var in variables]

# Finding critical points (solving df/dx = 0)
critical_points = sym.solve(gradient, variables, dict=True)

print("\nCritical Points:")
if critical_points:
    for cp in critical_points:
        print(cp)
else:
    print("No critical points found.")

# Making the Hessian Matrix
hessian = sym.Matrix([[sym.diff(sym.diff(f, variables[i]), variables[j]) for j in range(n)] for i in range(n)])

print("\nHessian Matrix:")
sym.pprint(hessian)

# Checking Convexity/Concavity using Leading Principal Minors
print("\nChecking Convexity/Concavity using Leading Principal Minors:")

determinants = []  # Store leading principal minor determinants

for i in range(1, n + 1):  # Only leading principal minors
    minor = hessian[:i, :i]  # Extract top-left i×i submatrix
    determinant = minor.det()  # Compute determinant
    determinants.append(determinant)
    print(f"Determinant of {i}x{i} leading minor:", determinant)

# Checking Convexity/Concavity
if all(sym.simplify(d).is_positive for d in determinants):
    print("\nThe function is *convex* (all leading principal minors are positive).")
elif all(sym.simplify(d).is_positive if i % 2 == 0 else sym.simplify(d).is_negative for i, d in enumerate(determinants, start=1)):
    print("\nThe function is *concave* (Sylvester's criterion for concavity met).")
else:
    print("\nThe function is *neither convex nor concave* (indefinite Hessian).")
