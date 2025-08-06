// ## Multiple then() calls on same Promise

// - Create a single resolved Promise.
// - Attach two different .then() handlers to it.
// - Explain that both run independently.

const promise = Promise.resolve("Ready");

promise.then((msg) => {
  console.log("Handler 1:", msg);
});

promise.then((msg) => {
  console.log("Handler 2:", msg);
});

// Why it runs independently?
// Both .then() handlers are called separately and independently, even though they are attached to the same Promise. This happens because a Promise can have multiple observers, and all of them will be notified when it is resolved.
