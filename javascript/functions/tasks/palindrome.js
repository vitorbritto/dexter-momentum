// ## 3. Function to Check if a String is a Palindrome
// Create a function isPalindrome(str) that checks if a given string is a palindrome (reads the same forward and backward). You can not use any string function that we have not learned in the series so far.

function isPalindrome(str) {
  let reversed = "";

  for (let i = str.length - 1; i >= 0; i--) {
    reversed += str[i];
  }

  if (str === reversed) {
    console.log("Palindrome");
  } else {
    console.log("Not a palindrome");
  }
}

isPalindrome("madam"); // Palindrome
isPalindrome("hello"); // Not a palindrome
