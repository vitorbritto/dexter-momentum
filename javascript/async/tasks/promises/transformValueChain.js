// ## Value Transformation in Chain

// - Create a Promise that resolves with 5.
// - Chain .then() handlers to double it, then square it.
// - Final output should be 100.

const transformValue = () => {
  return new Promise((resolve, _) => {
    console.log("Total: ", 5);
    resolve(5);
  });
};

transformValue()
  .then((result) => {
    console.log("Total: ", result * 2);
    return result * 2;
  })
  .then((result) => {
    console.log("Total: ", result ** 2);
    return result ** 2;
  });
