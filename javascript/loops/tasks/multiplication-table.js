// Create Multiplication Table (Using for loop)
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
    console.log(`${num}x${i} = ${num * i}`);
  }
}

createMultiplicationTable(4);
