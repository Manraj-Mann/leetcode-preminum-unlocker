# Welcome to Hacktoberfest 2023 !

Purpose of the project is to create a extension to provide the Editorial , Companies List and other premimum data of leetcode using the public data available.

## What you have to do ? 

### 1. Front End Improvements 
### 2. Provide Public Data
### 3. Test & Debug Code 

*Note* : Please refer to the issues section for the following issues.


## What's not provided to you ?

To maintain the extension to keep working the backend code is not provided but as said API calls are live you can use the following routes : 

1. https://manrajmann.pythonanywhere.com/problem [ To Get the Problem Code Data ]

   1. GET - Just a test method.
      ``` JSON
      {
        "message": "GET METHOD CALLED"
      }
      ```
   2. POST - Send 'url' of problem of format 'https://leetcode.com/problems/132-pattern/' in form data.

      ``` JSON
      {
          "message": "Success",
          "data":
          {
              "id": 456,
              "name": "132 Pattern",
              "difficulty": "Medium",
              "Have Solution": true,
              "Have Premium": true,
              "Problem": "Html of Problem here...",
              "Solution": "Html of the Editorial here...",
              "Companies":
              {
                      "amazon": 3,
                      "apple": 2,
                      "google": 2,
                      "microsoft": 2,
                      "walmart-labs": 2
              }
          }
      }
      ```
2. https://manrajmann.pythonanywhere.com/topcompany [ To Get the TOP 50 Questions Data According to Companies ]

   1. GET - Just a test method.
      ``` JSON
      {
        "message": "GET METHOD CALLED"
      }
      ```
      
   2. POST - Send 'company' of problem of format 'facebook' or 'google' or 'amazon' or 'microsoft' in form data.
      ```JSON
      {
      "message": "Success",
      "data": "[
          [1.0, 1.0, \"Two Sum\", 0.492, \"https://leetcode.com/problems/two-sum/\", \"Easy\"],
          [13.0, 0.994627, \"Roman to Integer\", 0.582, \"https://leetcode.com/problems/roman-to-integer/\", \"Easy\"],
          [56.0, 0.900737, \"Merge Intervals\", 0.46, \"https://leetcode.com/problems/merge-intervals/\", \"Medium\"],
          [62.0, 0.600655, \"Unique Paths\", 0.624, \"https://leetcode.com/problems/unique-paths/\", \"Medium\"],
          [68.0, 0.764938, \"Text Justification\", 0.37, \"https://leetcode.com/problems/text-justification/\", \"Hard\"]
        ]"
      }
      ```
