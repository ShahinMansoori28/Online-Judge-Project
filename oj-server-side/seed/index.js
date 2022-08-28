const Problem = require("../Database/model/problem");
const mongoose = require("mongoose");
// const connectDatabase = require("../Database/connectDatabase");

const data = [
  {
    difficulty: "Easy",
    name: "Subarray with given sum",
    description:
      "Given an unsorted array A of size N that contains only non-negative integers, find a continuous sub-array which adds to a given number S. In case of multiple subarrays, return the subarray which comes first on moving from left to right.",
    example: [
      {
        input: "N = 5, S = 12 A[] = {1,2,3,7,5}",
        output: "2 4",
        explaination:
          " The sum of elements from 2nd position to 4th position  is 12.",
      },
      {
        input: "N = 10, S = 15 A[] = {1,2,3,4,5,6,7,8,9,10}",
        output: "1 5",
        explaination:
          "The sum of elements from 1st position to 5th position is 15.",
      },
    ],
    noOfSubmissions: "0",
    noOfSuccess: "0",
    testCasesFile: "q1.js",
  },
  {
    difficulty: "Easy",
    name: "Find duplicates in an array ",
    description:
      "Given an array a[] of size N which contains elements from 0 to N-1, you need to find all the elements occurring more than once in the given array.",
    example: [
      {
        input: "N = 4 a[] = {0,3,1,2}",
        output: "1",
        explaination:
          " N=4 and all elements from 0 to (N-1 = 3) are present in the given array. Therefore output is -1.",
      },
      {
        input: "N = 5  a[] = {2,3,1,2,3}",
        output: "2 3 ",
        explaination: "2 and 3 occur more than once in the given array.",
      },
    ],
    noOfSubmissions: "0",
    noOfSuccess: "0",
    testCasesFile: "q2.js",
  },
  {
    difficulty: "Easy",
    name: "Remove all duplicates from a given string ",
    description:
      "Given a string Str which may contains lowercase and uppercase chracters. The task is to remove all duplicate characters from the string and find the resultant string. The order of remaining characters in the output should be same as in the original string.",
    example: [
      {
        input: "Str = geeksforgeeks",
        output: "geksfor",
        explaination:
          "After removing duplicate characters such as e, k, g, s, we have string as 'geksfor'. ",
      },
      {
        input: "HappyNewYear",
        output: "HapyNewYr",
        explaination:
          "After removing duplicate characters such as p, e, a, we have string as 'HapyNewYr'.",
      },
    ],
    noOfSubmissions: "0",
    noOfSuccess: "0",
    testCasesFile: "q3.js",
  },
  {
    difficulty: "Medium",
    name: "Kth smallest element ",
    description:
      "Given an array arr[] and an integer K where K is smaller than size of array, the task is to find the Kth smallest element in the given array. It is given that all array elements are distinct.",
    example: [
      {
        input: "N = 6 arr[] = 7 10 4 3 20 15 K = 3",
        output: "7",
        explaination: "3rd smallest element in the given array is 7.",
      },
      {
        input: "N = 5 arr[] = 7 10 4 20 15 K = 4",
        output: "15",
        explaination: "4th smallest element in the given array is 15",
      },
    ],
    noOfSubmissions: "0",
    noOfSuccess: "0",
    testCasesFile: "q4.js",
  },
  {
    difficulty: "Medium",
    name: "Kadane's Algorithm",
    description:
      "Given an array Arr[] of N integers. Find the contiguous sub-array(containing at least one number) which has the maximum sum and return its sum.",
    example: [
      {
        input: "N = 5 Arr[] = {1,2,3,-2,5}",
        output: "9",
        explaination:
          "Max subarray sum is 9 of elements (1, 2, 3, -2, 5) which is a contiguous subarray.",
      },
      {
        input: "N = 4 Arr[] = {-1,-2,-3,-4}",
        output: "-1",
        explaination: "Max subarray sum is -1 of element (-1)",
      },
    ],
    noOfSubmissions: "0",
    noOfSuccess: "0",
    testCasesFile: "q5.js",
  },
  {
    difficulty: "Hard",
    name: "Count the subarrays having product less than k",
    description:
      "Given an array of positive numbers, the task is to find the number of possible contiguous subarrays having product less than a given number k.",
    example: [
      {
        input: "n = 4, k = 10 a[] = {1, 2, 3, 4}",
        output: "7",
        explaination:
          "The contiguous subarrays are {1}, {2}, {3}, {4}, {1, 2}, {1, 2, 3} and {2, 3} whose count is 7.",
      },
      {
        input: "n = 7 , k = 100 a[] = {1, 9, 2, 8, 6, 4, 3}",
        output: "16",
      },
    ],
    noOfSubmissions: "0",
    noOfSuccess: "0",
    testCasesFile: "q6.js",
  },
  {
    difficulty: "Medium",
    name: "Next Greater Element",
    description:
      "Given an array arr[ ] of size N having distinct elements, the task is to find the next greater element for each element of the array in order of their appearance in the array. Next greater element of an element in the array is the nearest element on the right which is greater than the current element. If there does not exist next greater of current element, then next greater element for current element is -1. For example, next greater of the last element is always -1.",
    example: [
      {
        input: "N = 4, arr[] = [1 3 2 4]",
        output: "3 4 4 -1",
        explaination:
          " In the array, the next larger element to 1 is 3 , 3 is 4 , 2 is 4 and for 4 ? since it doesn't exist, it is -1.",
      },
      {
        input: "N = 5, arr[] [6 8 0 1 3]",
        output: "8 -1 1 3 -1",
        explaination:
          "In the array, the next larger element to 6 is 8, for 8 there is no larger elements hence it is -1, for 0 it is 1 , for 1 it is 3 and then for 3 there is no larger element on right and hence -1.",
      },
    ],
    noOfSubmissions: "0",
    noOfSuccess: "0",
    testCasesFile: "q7.js",
  },
  {
    difficulty: "Medium",
    name: "Next Permutation",
    description:
      "Implement the next permutation, which rearranges the list of numbers into Lexicographically next greater permutation of list of numbers. If such arrangement is not possible, it must be rearranged to the lowest possible order i.e. sorted in an ascending order. You are given an list of numbers arr[ ] of size N.",
    example: [
      {
        input: "N = 6 arr = {1, 2, 3, 6, 5, 4}",
        output: "{1, 2, 4, 3, 5, 6}",
        explaination:
          "The next permutation of the given array is {1, 2, 4, 3, 5, 6}.",
      },
      {
        input: " N = 3 arr = {3, 2, 1}",
        output: "{1, 2, 3}",
        explaination:
          "As arr[] is the last permutation. So, the next permutation is the lowest one.",
      },
    ],
    noOfSubmissions: "0",
    noOfSuccess: "0",
    testCasesFile: "q8.js",
  },
  {
    difficulty: "Easy",
    name: "Anagram",
    description:
      "Given two stringsaandbconsisting of lowercase characters. The task is to check whether two given strings are an anagram of each other or not. An anagram of a string is another string that contains the same characters, only the order of characters can be different. For example, act and tac are an anagram of each other.",
    example: [
      {
        input: "a = geeksforgeeks, b = forgeeksgeeks",
        output: " YES",
        explaination:
          "Both the string have samecharacters with same frequency. So, both are anagrams.",
      },
      {
        input: "a = allergy, b = allergic",
        output: "NO",
        explanation: "Characters in both the strings are not same, so they are not anagrams."
      },
    ],
    noOfSubmissions: "0",
    noOfSuccess: "0",
    testCasesFile: "q9.js",
  },
];




// connectDatabase();

async function seedDataBase() {
  data.forEach(async (problem) => {
    const newProblem = new Problem({ ...problem });
    await newProblem.save();
  });
}

mongoose
.connect("mongodb+srv://shahin28:454441Sm@cluster0.amjezrh.mongodb.net/ojserver?retryWrites=true&w=majority")
.then(() => {
  console.log("Database Connected!!");
  seedDataBase()
  .then(() => {
    console.log("Seeded successfully !!!");
  })
  .catch((err) => {
    console.log("error : ", err);
  });
})
.catch((error) => {
  console.log("Oh no mongoose Error !!!");
  console.log(error);
});




//await Problem.deleteMany({});
/*
 {
    difficulty: "Easy",
    name: "Subarray with given sum",
    description:
      "Given an unsorted array A of size N that contains only non-negative integers, find a continuous sub-array which adds to a given number S. In case of multiple subarrays, return the subarray which comes first on moving from left to right.",
    example: [
      {
        input: "N = 5, S = 12 A[] = {1,2,3,7,5}",
        output: "2 4",
        explaination:
          " The sum of elements from 2nd position to 4th position  is 12.",
      },
      {
        input: "N = 10, S = 15 A[] = {1,2,3,4,5,6,7,8,9,10}",
        output: "1 5",
        explaination:
          "The sum of elements from 1st position to 5th position is 15.",
      },
    ],
    noOfSubmissions: "0",
    noOfSuccess: "0",
    testCasesFile: "q1.js",
  },
  {
    difficulty: "Easy",
    name: "Find duplicates in an array ",
    description:
      "Given an array a[] of size N which contains elements from 0 to N-1, you need to find all the elements occurring more than once in the given array.",
    example: [
      {
        input: "N = 4 a[] = {0,3,1,2}",
        output: "1",
        explaination:
          " N=4 and all elements from 0 to (N-1 = 3) are present in the given array. Therefore output is -1.",
      },
      {
        input: "N = 5  a[] = {2,3,1,2,3}",
        output: "2 3 ",
        explaination: "2 and 3 occur more than once in the given array.",
      },
    ],
    noOfSubmissions: "0",
    noOfSuccess: "0",
    testCasesFile: "q2.js",
  },
  {
    difficulty: "Easy",
    name: "Remove all duplicates from a given string ",
    description:
      "Given a string Str which may contains lowercase and uppercase chracters. The task is to remove all duplicate characters from the string and find the resultant string. The order of remaining characters in the output should be same as in the original string.",
    example: [
      {
        input: "Str = geeksforgeeks",
        output: "geksfor",
        explaination:
          "After removing duplicate characters such as e, k, g, s, we have string as 'geksfor'. ",
      },
      {
        input: "HappyNewYear",
        output: "HapyNewYr",
        explaination:
          "After removing duplicate characters such as p, e, a, we have string as 'HapyNewYr'.",
      },
    ],
    noOfSubmissions: "0",
    noOfSuccess: "0",
    testCasesFile: "q3.js",
  },
  {
    difficulty: "Medium",
    name: "Kth smallest element ",
    description:
      "Given an array arr[] and an integer K where K is smaller than size of array, the task is to find the Kth smallest element in the given array. It is given that all array elements are distinct.",
    example: [
      {
        input: "N = 6 arr[] = 7 10 4 3 20 15 K = 3",
        output: "7",
        explaination: "3rd smallest element in the given array is 7.",
      },
      {
        input: "N = 5 arr[] = 7 10 4 20 15 K = 4",
        output: "15",
        explaination: "4th smallest element in the given array is 15",
      },
    ],
    noOfSubmissions: "0",
    noOfSuccess: "0",
    testCasesFile: "q4.js",
  },
  {
    difficulty: "Medium",
    name: "Kadane's Algorithm",
    description:
      "Given an array Arr[] of N integers. Find the contiguous sub-array(containing at least one number) which has the maximum sum and return its sum.",
    example: [
      {
        input: "N = 5 Arr[] = {1,2,3,-2,5}",
        output: "9",
        explaination:
          "Max subarray sum is 9 of elements (1, 2, 3, -2, 5) which is a contiguous subarray.",
      },
      {
        input: "N = 4 Arr[] = {-1,-2,-3,-4}",
        output: "-1",
        explaination: "Max subarray sum is -1 of element (-1)",
      },
    ],
    noOfSubmissions: "0",
    noOfSuccess: "0",
    testCasesFile: "q5.js",
  },
   difficulty: "Hard",
    name: "Count the subarrays having product less than k",
    description:
      "Given an array of positive numbers, the task is to find the number of possible contiguous subarrays having product less than a given number k.",
    example: [
      {
        input: "n = 4, k = 10 a[] = {1, 2, 3, 4}",
        output: "7",
        explaination:
          "The contiguous subarrays are {1}, {2}, {3}, {4}, {1, 2}, {1, 2, 3} and {2, 3} whose count is 7.",
      },
      {
        input: "n = 7 , k = 100 a[] = {1, 9, 2, 8, 6, 4, 3}",
        output: "16",
      },
    ],
    noOfSubmissions: "0",
    noOfSuccess: "0",
    testCasesFile: "q6.js",
  },
  {
    difficulty: "Medium",
    name: "Next Greater Element",
    description:
      "Given an array arr[ ] of size N having distinct elements, the task is to find the next greater element for each element of the array in order of their appearance in the array. Next greater element of an element in the array is the nearest element on the right which is greater than the current element. If there does not exist next greater of current element, then next greater element for current element is -1. For example, next greater of the last element is always -1.",
    example: [
      {
        input: "N = 4, arr[] = [1 3 2 4]",
        output: "3 4 4 -1",
        explaination:
          " In the array, the next larger element to 1 is 3 , 3 is 4 , 2 is 4 and for 4 ? since it doesn't exist, it is -1.",
      },
      {
        input: "N = 5, arr[] [6 8 0 1 3]",
        output: "8 -1 1 3 -1",
        explaination:
          "In the array, the next larger element to 6 is 8, for 8 there is no larger elements hence it is -1, for 0 it is 1 , for 1 it is 3 and then for 3 there is no larger element on right and hence -1.",
      },
    ],
    noOfSubmissions: "0",
    noOfSuccess: "0",
    testCasesFile: "q7.js",
  },
  {
    difficulty: "Medium",
    name: "Next Permutation",
    description:
      "Implement the next permutation, which rearranges the list of numbers into Lexicographically next greater permutation of list of numbers. If such arrangement is not possible, it must be rearranged to the lowest possible order i.e. sorted in an ascending order. You are given an list of numbers arr[ ] of size N.",
    example: [
      {
        input: "N = 6 arr = {1, 2, 3, 6, 5, 4}",
        output: "{1, 2, 4, 3, 5, 6}",
        explaination:
          "The next permutation of the given array is {1, 2, 4, 3, 5, 6}.",
      },
      {
        input: " N = 3 arr = {3, 2, 1}",
        output: "{1, 2, 3}",
        explaination:
          "As arr[] is the last permutation. So, the next permutation is the lowest one.",
      },
    ],
    noOfSubmissions: "0",
    noOfSuccess: "0",
    testCasesFile: "q8.js",
  },
  */
