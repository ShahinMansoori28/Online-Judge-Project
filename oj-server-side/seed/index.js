const Problem = require("../Database/model/problem");
const connectDatabase = require("../Database/connectDatabase");

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
];

connectDatabase();

async function seedDataBase() {
  await Problem.deleteMany({});
  data.forEach(async (problem) => {
    const newProblem = new Problem({ ...problem });
    await newProblem.save();
  });
}

seedDataBase()
  .then(() => {
    console.log("Seeded successfully !!!");
  })
  .catch((err) => {
    console.log("error : ", err);
  });

module.exports = seedDataBase;
