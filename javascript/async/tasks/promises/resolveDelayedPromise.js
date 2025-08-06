// ## Create Your First Promise
// - Create a Promise that resolves with the string "Hello, Promises!" after 1 second.
// - Log the result using .then().

const p = new Promise(function (resolve, _) {
  setTimeout(function () {
    resolve("Hello, Promises!");
  }, 1000);
});

p.then((result) => console.log(result));
