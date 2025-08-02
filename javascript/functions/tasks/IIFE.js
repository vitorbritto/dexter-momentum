// ## 7. Use an IIFE to Print “Hello, JavaScript!”
// Write an IIFE that prints "Hello, JavaScript!" to the console. Here the Second word must be supplied using parameter and argument.

(function (greeting, subject) {
  console.log(`${greeting}, ${subject}!`);
})("Hello", "JavaScript");
