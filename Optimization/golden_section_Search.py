import math

def golden_section_search(f, a, b, tol=1e-5):
    """
    Golden Section Search to find the minimum of a unimodal function.
    
    Parameters:
        f   : function to minimize
        a   : left bound of the interval
        b   : right bound of the interval
        tol : tolerance (stopping condition)
    
    Returns:
        x_min : approximate minimum point
        f(x_min) : minimum function value
    """
    phi = (1 + math.sqrt(5)) / 2  # Golden ratio
    resphi = 2 - phi              # 1 - 1/phi

    # Initial points
    x1 = b - resphi * (b - a)
    x2 = a + resphi * (b - a)
    f1 = f(x1)
    f2 = f(x2)

    while abs(b - a) > tol:
        if f1 < f2:
            b = x2
            x2 = x1
            f2 = f1
            x1 = b - resphi * (b - a)
            f1 = f(x1)
        else:
            a = x1
            x1 = x2
            f1 = f2
            x2 = a + resphi * (b - a)
            f2 = f(x2)

    x_min = (a + b) / 2
    return x_min, f(x_min)

# Example usage
if __name__ == "__main__":
    # Define the function to minimize
    def f(x):
        return (x - 2)**2 + 1

    a, b = 0, 5  # Interval
    x_min, f_min = golden_section_search(f, a, b)
    print(f"Minimum at x = {x_min:.5f}, f(x) = {f_min:.5f}")
