// ## 1. Write a Function to Convert Celsius to Fahrenheit
// Create a function celsiusToFahrenheit(celsius) that converts a temperature from Celsius to Fahrenheit.
// Formula: (Celsius * 9/5) + 32 = Fahrenheit

function celsiusToFahrenheit(celsius) {
  return (celsius * 9/5) + 32;
}

celsiusToFahrenheit(32)

// ## 2. Create a Function to Find the Maximum of Two Numbers
// Write a function findMax(num1, num2) that returns the larger of the two numbers. It should work for negative numbers as well.

function findMax(num1, num2) {
  return num1 > num2 ? num1 : num2;
}

findMax(10,45)
findMax(100,45)
findMax(1,-5)

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

isPalindrome("madam");   // Palindrome
isPalindrome("hello");   // Not a palindrome


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
factorial(1);  // 1
factorial(3);  // 6
factorial(5);  // 120
factorial(10); // 3628800

// ## 5. Write a function to Count Vowels in a String
// Write a function countVowels(str) that counts the number of vowels (a, e, i, o, u) in a given string.

function countVowels(str) {
  if (typeof str !== "string") {
    console.error("countVowels(str): str must be a string");
  }

  const vowels = new Set(["a", "e", "i", "o", "u"]);
  let count = 0;

  for (const char of str.toLowerCase()) {
    if (vowels.has(char)) {
      count++;
    }
  }

  return count;
}

countVowels('Vitor Britto')

// ## 6. Write a Function to Capitalize the First Letter of Each Word in a Sentence
// Write a function capitalizeWords(sentence) that takes a sentence and capitalizes the first letter of each word. You can use the toUpperCase() method of string to convert the lowercase to uppercase.

function capitalizeWords(sentence) {
  if (typeof sentence !== "string") {
    console.error("capitalizeWords(sentence): sentence must be a string");
  }

  return sentence
    .split(" ")
    .map((word) => {
      if (word.length === 0) return "";
      return word[0].toUpperCase() + word.slice(1);
    })
    .join(" ")
}

capitalizeWords("hello world");                   // "Hello World"
capitalizeWords("  multiple   spaces here  ");    // "  Multiple   Spaces Here  "
capitalizeWords("javaScript is fun.");            // "JavaScript Is Fun."

// ## 7. Use an IIFE to Print “Hello, JavaScript!”
// Write an IIFE that prints "Hello, JavaScript!" to the console. Here the Second word must be supplied using parameter and argument.

(function (greeting, subject) {
  console.log(`${greeting}, ${subject}!`);
})("Hello", "JavaScript");

// ## 8. Create a Simple Callback Function
// Write a function greet(name, callback), where callback prints a message using the name parameter.

function greet(name, callback) {
  callback(name)
}

greet('Vitor', function(n) {
  console.log(`Good morning, ${n}`)
})

// ## 9. Create Call Stack Execution Diagram for this flow

// ```js
// function f1() {}
// function f2() {
//     f1();
// }
// f2();
// ```

// sequenceDiagram
//     participant G as Global Context
//     participant F2 as f2()
//     participant F1 as f1()

//     G->>+F2: invoke f2()
//     note right of F2: Stack: [Global, f2]

//     F2->>+F1: invoke f1()
//     note right of F1: Stack: [Global, f2, f1]

//     F1-->>-F2: return from f1()
//     note left of F2: Stack: [Global, f2]

//     F2-->>-G: return from f2()
//     note left of G: Stack: [Global]


// ## 10. Create Call Stack Execution Diagram for this flow

// ```js
// function f1() {}
// function f2() {}
// function f3() {
//     f1();
// }
// f2();
// f3();
// f1();
// ```