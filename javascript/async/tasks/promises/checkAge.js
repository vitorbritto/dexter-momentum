// ## Promise with Condition

// - Create a function checkAge(age) that returns a Promise.
// - Resolve if age >= 18, reject otherwise.

function checkAge(age) {
  return new Promise(function (resolve, reject) {
    if (age >= 18) {
      resolve("Access granted.");
    }

    reject("Access denied. You must be at least 18.");
  });
}

checkAge(18)
  .then((result) => console.log(result))
  .catch((err) => console.error(err));
