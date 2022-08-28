// { Driver Code Starts
#include <bits/stdc++.h>
using namespace std;


 // } Driver Code Ends
class Solution
{
    public:
    //Function to find a continuous sub-array which adds up to a given number.
    vector<int> subarraySum(int arr[], int n, long long s)
    {
       long long sum = 0;
       int i = 0, j = 0;
       for(; i < n; i++)
       {
            sum += arr[i];
            if(sum > s && j < n)
            {
                for(; j < n; j++)
                {
                    if(sum > s) 
                    {
                        sum -= arr[j];
                    }
                    else
                        break;
                }
            }
            if(sum == s)
            {
                break;
            }
       }
       if(i == n)
       {
           return {-1};
       }
       return {j + 1, i + 1};
    }
};

// { Driver Code Starts.

int main()
 {
        int n;
        long long s;
        cin>>n>>s;
        int arr[n];
        const int mx = 1e9;
        for(int i=0;i<n;i++)
        {
            cin>>arr[i];
        }
        Solution ob;
        vector<int>res;
        res = ob.subarraySum(arr, n, s);
        
        for(int i = 0;i<res.size();i++)
            cout<<res[i]<<" ";
        cout<<endl;
	return 0;
}  // } Driver Code Ends