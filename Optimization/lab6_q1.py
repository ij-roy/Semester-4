import sympy as sym

# Define variables
x, h = sym.symbols('x h', positive=True)

# Given constraint: Surface Area = 108 (without top)
surface_area_eq = sym.Eq(x**2 + 4*x*h, 108)

# Solve for h in terms of x
h_expr = sym.solve(surface_area_eq, h)[0]

# Volume function
V = x**2 * h_expr

# Find derivative of V with respect to x
dV_dx = sym.diff(V, x)

# Solve for critical points (dV/dx = 0)
critical_x = sym.solve(dV_dx, x)

# Filter valid solutions (positive values only)
valid_x = [val.evalf() for val in critical_x if val.is_real and val > 0]

# Compute h and maximum volume for valid x
if valid_x:
    x_max = valid_x[0]  # Only one valid x
    h_max = h_expr.subs(x, x_max).evalf()
    V_max = V.subs(x, x_max).evalf()

    print(f"Optimal dimensions for maximum volume:")
    print(f"Side of square base (x): {x_max:.2f} inches")
    print(f"Height (h): {h_max:.2f} inches")
    print(f"Maximum Volume: {V_max:.2f} cubic inches")
else:
    print("No valid solution found.")
