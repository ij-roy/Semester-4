/*

*/

#include <stdio.h>

int isSubset(int a[], int m, int b[], int n) {
    for (int i = 0; i < n; i++) {
        int found = 0;
        
        for (int j = 0; j < m; j++) {
            if (b[i] == a[j]) {
                found = 1;
                break;
            }
        }
        
        if (!found) return 0;
    }
    
    return 1;
}

int main() {
    int a[] = {11, 1, 13, 21, 3, 7};
    int b[] = {11, 3, 7, 1};
    int m = sizeof(a) / sizeof(a[0]);
    int n = sizeof(b) / sizeof(b[0]);
    
    if (isSubset(a, m, b, n)) {
        printf("true\n");
    } else {
        printf("false\n");
    }
    return 0;
}