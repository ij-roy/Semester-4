#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

pair<int, int> min_max(vector<int>& v, int s, int e) {
    if (s == e) return {v[s], v[s]};

    int mid = (s + e) / 2;
    pair<int, int> left = min_max(v, s, mid);
    pair<int, int> right = min_max(v, mid + 1, e);

    int minval = min(left.first, right.first);
    int maxval = max(left.second, right.second);

    return {minval, maxval};
}

int main() {
    int n;
    cin >> n;
    vector<int> v(n);
    for (int i = 0; i < n; i++) cin >> v[i];

    pair<int, int> result = min_max(v, 0, n - 1);
    cout << "Max Distance: " << result.second - result.first << endl;
}