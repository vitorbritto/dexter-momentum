// Create a function wait(ms) that returns a promise which resolves after ms milliseconds. Use async/await to log messages before and after the delay

const wait = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const run = async () => {
  console.log("Before wait");
  await wait(2000); // wait for 2 seconds
  console.log("After wait");
};

run();
