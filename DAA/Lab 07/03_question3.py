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