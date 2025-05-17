/*

String Matching in an Array

Given an array of string words, print length of the list of all strings in words that is a substring of another word.

A substring is a contiguous sequence of characters within a string.

Input Format

The first line contains a single integer n (1 ≤ n ≤ 1000), the number of strings in the array words.

The second line contains n space-separated strings in list, each string having a length between 1 and 100 characters.

Constraints

The length of words is n (1 ≤ n ≤ 1000). Each string in words has a length between 1 and 100 characters.

Output Format

Output a single integer : the number of strings that are substrings of other strings in the array.

Sample Input 0
4
mass
as
hero
superhero
Sample Output 0
2

Explanation 0
"as" is a substring of "mass", and "hero" is a substring of "superhero". Thus, the length of the output result is 2.

Sample Input 1
3
leetcode
et
code

Sample Output 1
2
*/

#include <stdio.h>
#include <string.h>
#include <math.h>
#include <stdlib.h>

int main() {

    /* Enter your code here. Read input from STDIN. Print output to STDOUT */    
    int num , sum = 0;
    char arr[1000][101];
    scanf("%d",&num);
    for(int i = 0;i<num;i++){
        scanf("%s",arr[i]);
    }
    for(int i = 0;i<num;i++){
        for(int j = 0;j<num;j++){
            if(i == j){
                continue;
            }
            for(int k = 0;k<strlen(arr[j]);k++){
                if (arr[i][0] != arr[j][k]){
                    continue;
                }
                int flag = 0;
                for(int l = 0; l<strlen(arr[i]);l++){
                    if(arr[i][l] != arr[j][l+k]){
                        flag =1;
                        break;
                    }
                }
                if (flag == 0){
                    sum += 1;
                    break;
                }
            }    
        }
    }
    printf("%d",sum);
    return 0;
    return 0;
}
