// Create a Simple Callback Function
// Write a function greet(name, callback), where callback prints a message using the name parameter.

function greet(name, callback) {
  callback(name);
}

greet("Vitor", function (n) {
  console.log(`Good morning, ${n}`);
});
