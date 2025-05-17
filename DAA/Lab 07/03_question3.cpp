/*
Q3. Using Greedy approach, solve the following problem:
There are items {i1,i2...in} and placed at {d1,d2......dn}. We have to place guards
to protect the items. Each guard can protect only 1 unit distance to his right
and 1 unit distance to his left. Find the minimum number of guards required to
guard the items.
Input: {i1,i2,i3,i4} placed at {12,7,11,4}.
Output: the number of guards needed is 3
Hint: Sort the items based on their positions and start from any one end.
Remember to place the guard in-between wherever possible, for getting the
minimum number. Maintain an array for storing the distance/position of the
guard for easier calculations.

*/

#include<iostream>
#include<vector>
#include<algorithm>
using namespace std;

int main(){
    int n;
    cin>>n;

    vector<int>items(n);

    for(int i=0;i<n;i++){
        cin>>items[i];
    }

    sort(items.begin(),items.end());

    int i=0,guard=0;
    while(i<n){
        int g_pos=items[i]+1;
        guard++;

        i++;
        while(i<n && items[i]<=g_pos+1){
            i++;
        }
    }
    cout<<guard;

}

/*
#include <stdio.h>
#include <stdlib.h>
int main()
{
    int n;
    printf("Enter the number of Item you want to place: ");
    scanf("%d", &n);
    char item[n][50];
    int distance[n];
    for (int i=0; i<n; i++)
    { 
        printf("Enter the %d Item: ", i+1);
        scanf("%s", &item[i]);
        printf("Enter the %d Distance: ", i+1);
        scanf("%d", &distance[i]);
    }
    int i, j;
    int flag;
    for (i=0; i<n-1; i++)
    {
        flag=0;
        for (j=0;j<n-i-1; j++)
        {
            if (distance[j]>distance[j+1])
            {
                int temp_distance=distance[j];
                distance[j]=distance[j+1];
                distance[j+1]=temp_distance;
                flag=1;
            }
        }
        if (flag==0)
        {
            break;
        }
    }
    for (i=0; i<n; i++)
    {
        printf("%d Distance is %d\n", i+1, distance[i]);
    }
    int guard=0;
    int len;
    for (i=0; i<n; i++)
    {
        len=distance[i];
        if ((distance[i+1]+1)==len || (distance[i+1]-1)==len)
        {
            continue;
        }
        else
        {
            guard++;
        }
    }
    printf("Total number of Guard Required are: %d", guard);
    return 0;
}

*/