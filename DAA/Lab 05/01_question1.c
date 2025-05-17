#include <stdio.h>
#include <stdlib.h>

#define MAX_SIZE 100  

int parent[MAX_SIZE];
int rank[MAX_SIZE];  


void initialize(int n) {
    for (int i = 0; i < n; i++) {
        parent[i] = i;
        rank[i] = 0;
    }
}


int find(int x) {
    if (parent[x] != x) {
        parent[x] = find(parent[x]);  
    }
    return parent[x];
}


void weighted_union(int x, int y) {
    int rootX = find(x);
    int rootY = find(y);

    if (rootX != rootY) {
        
        if (rank[rootX] < rank[rootY]) {
            parent[rootX] = rootY;
        } else if (rank[rootX] > rank[rootY]) {
            parent[rootY] = rootX;
        } else {
            parent[rootY] = rootX;
            rank[rootX]++;
        }
    }
}

void display_sets(int n) {
    printf("Element:  ");
    for (int i = 0; i < n; i++) {
        printf("%d ", i);
    }
    printf("\nParent:   ");
    for (int i = 0; i < n; i++) {
        printf("%d ", parent[i]);
    }
    printf("\n");
}

int main() {
    int n, choice, x, y;

    printf("Enter the number of elements: ");
    scanf("%d", &n);

    initialize(n);

    while (1) {
        printf("\nMenu:\n");
        printf("1. Union\n2. Find\n3. Display Sets\n4. Exit\n");
        printf("Enter your choice: ");
        scanf("%d", &choice);

        switch (choice) {
            case 1:
                printf("Enter two elements to union: ");
                scanf("%d %d", &x, &y);
                weighted_union(x, y);
                break;
            case 2:
                printf("Enter an element to find its set representative: ");
                scanf("%d", &x);
                printf("Set representative of %d is %d\n", x, find(x));
                break;
            case 3:
                display_sets(n);
                break;
            case 4:
                exit(0);
            default:
                printf("Invalid choice!\n");
        }
    }
    return 0;
}