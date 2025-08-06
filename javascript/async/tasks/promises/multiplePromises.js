// ## Return New Promises in .then()

// - Chain multiple .then() where each returns a new Promise with a delay and logs a step like:
//   - “First”
//   - “Second”
//   - “Third”

const delay = (message, timeMS) => {
  return new Promise((resolve, _) => {
    setTimeout(() => {
      console.log("Message: ", message);
      resolve();
    }, timeMS);
  });
};

Promise.resolve()
  .then(() => delay("First", 1000))
  .then(() => delay("Second", 1000))
  .then(() => delay("Third", 1000));
