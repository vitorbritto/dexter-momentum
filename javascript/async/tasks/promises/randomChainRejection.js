// ## Chain with Random Rejection

// - First .then() resolves to "Start".
// - Second .then() randomly throws an error or returns "Continue".
// - Handle rejection gracefully.

const execute = () => {
  return new Promise((resolve, reject) => {
    console.log("Start");
    resolve("Start");
  });
};

execute()
  .then((msg) => {
    console.log(msg);

    if (Math.random() > 0.5) {
      return "Continue";
    }

    throw new Error("Something went wrong!");
  })
  .then((msg) => {
    console.log(msg);
  })
  .catch((err) => {
    console.error("Caught error:", err.message);
  });
