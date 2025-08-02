// Reverse Digits of a Number (Using while loop)
// Write a program to reverse the digits of a given number using a while loop.

// Example:
// Input: 6789
// Output: 9876

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
