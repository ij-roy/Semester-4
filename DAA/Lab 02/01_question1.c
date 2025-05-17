/*
Q1. Using Fermat’s little theorem find if a given positive integer, n is prime. Note: Finding the
exponent should have a complexity of log n so that the complexity of your code is O(log2n).
Input: 5 Output: true
Input: 12 Output: false
Input: any Carmichael ‘s number Output: ?
*/

#include <stdio.h>

int modularExponentiation(int base, int exp, int mod) {
    int result = 1;
    base = base % mod; 

    while (exp > 0) {
        if (exp % 2 == 1) { 
            result = (result * base) % mod;
        }
        exp = exp / 2; 
        base = (base * base) % mod;
    }

    return result;
}

int isPrime(int n) {
    if (n <= 1) return 0; 
    if (n == 2 || n == 3) return 1; 

    int base = 2;

    // Fermat's Little Theorem: base^(n-1) ≡ 1 (mod n)
    if (modularExponentiation(base, n - 1, n) != 1) {
        return 0; 
    }

    return 1;
}

int main() {
    int n;

    printf("Enter a positive integer: ");
    scanf("%d", &n);

    if (isPrime(n)) {
        printf("%d is prime.\n", n);
    } else {
        printf("%d is not prime.\n", n);
    }

    return 0;
}
