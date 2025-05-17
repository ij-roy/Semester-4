#include <stdio.h>
#include <stdlib.h>
int main() {

    /* Enter your code here. Read input from STDIN. Print output to STDOUT */   
    int n;
    scanf("%d",&n);
    int *start = (int *)(malloc(n*sizeof(int))) ;
    int *finish = (int *)(malloc(n*sizeof(int)));
    for(int i = 0;i<n;i++){
        scanf("%d",&start[i]);
    }
    for(int i = 0;i<n;i++){
        scanf("%d",&finish[i]);
    }
    int smallest,index,max;
    for(int i = 0;i < n;i++){
        if(finish[i]>max){
            max = finish[i];
        }
    }
    smallest = max;
    for(int i = 0;i < n;i++){
        if(finish[i]<smallest){
            smallest = finish[i];
            index = i;
        }
    }
    printf("%d ",index+1);
    
    for(int ij = 0;ij<n-1;ij++){
        int indi;
        smallest = max;
        int flag = 0;
        for(int i = 0;i < n;i++){
            if(start[i]>= finish[index] && finish[i] <= smallest){
                smallest = finish[i];
                indi = i;
                flag = 1;
            }
        }
        if(flag){
            index = indi;
        printf("%d ",index+1);
        } 
    }
    return 0;
}