import sympy as sp

# n = int(input("Enter the number of variables: "))
n = 2
variables = sp.symbols(f"x1:{n+1}")

print(f"Variables: {variables}")

# expr_input = input("Enter a non-linear function in terms of the variables (e.g., x1**2 + x1*x2 + sin(x2)): ")

f = sp.sympify("x1**2 + x1*x2 + sin(x2)")
print(f)

h = sp.hessian(f,variables)

print("\nHessian Matrix:")
sp.pprint(h)

grad = [sp.diff(f,var) for var in variables]
print( grad)

initial = (0,0)

st_pt = sp.nsolve(grad , variables,initial)
print(st_pt)
point = 0
for point in st_pt:
    h_eval = h.subs(point)
    eigenvals = h_eval.eigenvals()

    if all(val > 0 for val in eigenvals.keys()):
        print("local minima")
    elif all(val < 0 for val in eigenvals.keys()):
        print("local maxima")
    else:
        print("saddle point")

