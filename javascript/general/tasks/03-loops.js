// ## 1. Generate a Pyramid Pattern using Nested Loop as it is shown below:

// ```bash
// *
// * *
// * * *
// * * * *
// * * * * *
// ```

function printPyramid(rows) {
  for (let i = 1; i <= rows; i++) {
    let pattern = "";
    for (let j = 1; j <= i; j++) {
      pattern += "* ";
    }
    console.log(pattern.trim());
  }
}

printPyramid(3)

// ## 2. Create Multiplication Table (Using for loop)
// Write a program to print the multiplication table of a given number up to 10.
// For Example: If N = 3, output should be:

// ```bash
// 3 x 1 = 3
// 3 x 2 = 6
// ...
// 3 x 10 = 30
// ```

function createMultiplicationTable(num) {
  for (let i = 1; i <= 10; i++) {
    console.log(`${num}x${i} = ${num*i}`)
  }
}

createMultiplicationTable(4)

// ## 3. Find the summation of all odd numbers between 1 to 500 and print them on teh console log.

function oddSummation() {
  let sum = 0;

  for (let i = 1; i <= 500; i += 2) {
    sum += i;
  }

  console.log("Sum of all odd numbers from 1 to 500 is:", sum);
}

oddSummation()

// ## 4. Skipping Multiples of 3
// Write a program to print numbers from 1 to 20, but skip multiples of 3.

for (let i = 1; i <= 20; i++) {
  if (i % 3 === 0) continue;
  console.log(i);
}

// ## 5. Reverse Digits of a Number (Using while loop)
// Write a program to reverse the digits of a given number using a while loop.

// Example:

// ```bash
// Input: 6789
// Output: 9876
// ```

function reverseNumber(num) {
  let reversed = 0;

  while (num !== 0) {
    let digit = num % 10;
    reversed = reversed * 10 + digit;
    num = Math.floor(num / 10);
  }

  console.log("Reversed number:", reversed);
}

reverseNumber(12345); // Reversed number: 54321


// ## 6. Write your understanding on the difefrences between for, while, and do-while loop. Create their flow charts.

// 1️⃣ for Loop

// flowchart TD
//   A[Start] --> B[Initialize]
//   B --> C[Check Condition]
//   C -->|True| D[Execute Block]
//   D --> E[Increment/Update]
//   E --> C
//   C -->|False| F[End]

// 2️⃣ while Loop

// flowchart TD
//   A[Start] --> B[Check Condition]
//   B -->|True| C[Execute Block]
//   C --> B
//   B -->|False| D[End]

// 3️⃣ do-while Loop

// flowchart TD
//   A[Start] --> B[Execute Block]
//   B --> C[Check Condition]
//   C -->|True| B
//   C -->|False| D[End]

