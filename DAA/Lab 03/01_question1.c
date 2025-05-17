/*
Q1. Write a program in C to implement fractional knapsack. Assume that the
arrays p[] and w[] have items sorted by decreasing pi/wi ratios.
*/
 
#include <stdio.h>

int main(){ 
    int n ,max;
    float total = 0;
    scanf("%d",&n);
    scanf("%d",&max);
    float temp1 , temp2;
    for(int i =0;i<n;i++){
        scanf("%f %f",&temp1,&temp2);
        if(temp2>max){
            temp1 = (max/temp2)*temp1;
            temp2 = (max/temp2)* temp2;
        }
        total = total+temp1;
        max = max - temp2;
    }
    printf("%.2f",total);
    return 0;
}