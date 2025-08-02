// ## 4. Write a Function to Find Factorial of a Number
// Create a function factorial(n) that returns the factorial of n.
// Example 5! = 5 * 4 * 3 * 2 * 1

function factorial(n) {
  if (!Number.isInteger(n) || n < 0) {
    console.error("factorial(n): n must be a non-negative integer");
  }

  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

factorial(-1); // 'factorial(n): n must be a non-negative integer'
factorial(1); // 1
factorial(3); // 6
factorial(5); // 120
factorial(10); // 3628800
