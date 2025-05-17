/*

*/

#include <stdio.h>
#include <stdlib.h>

#define EMPTY -1  // Indicator for an empty slot in the hash table

// Function to display the hash table
void displayHashTable(int hashTable[], int size) {
    printf("Hash Table:\n");
    for (int i = 0; i < size; i++) {
        if (hashTable[i] == EMPTY) {
            printf("[%d]: EMPTY\n", i);
        } else {
            printf("[%d]: %d\n", i, hashTable[i]);
        }
    }
}

int main() {
    int size, numElements, element, index, i;

    // Input the size of the hash table
    printf("Enter the size of the hash table: ");
    scanf("%d", &size);

    // Initialize the hash table
    int hashTable[size];
    for (i = 0; i < size; i++) {
        hashTable[i] = EMPTY;
    }

    // Input the number of elements to be added
    printf("Enter the number of elements to insert: ");
    scanf("%d", &numElements);

    // Insert elements into the hash table
    for (i = 0; i < numElements; i++) {
        printf("Enter element %d: ", i + 1);
        scanf("%d", &element);

        // Calculate hash value using the given hash function
        index = (element + 2) % size;

        // Linear probing to handle collisions
        int originalIndex = index;
        int inserted = 0;
        do {
            if (hashTable[index] == EMPTY) {
                hashTable[index] = element;
                inserted = 1;
                break;
            }
            index = (index + 1) % size;
        } while (index != originalIndex);

        // Throw error if the hash table is full
        if (!inserted) {
            printf("Error: Hash table is full. Cannot insert element %d.\n", element);
            break;
        }
    }

    // Display the final hash table
    displayHashTable(hashTable, size);

    return 0;
}
