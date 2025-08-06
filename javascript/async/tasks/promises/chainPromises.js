// ## Chain Promises Sequentially

// - Create three Promises that log:
//   - "Step 1 done"
//   - "Step 2 done"
//   - "Step 3 done"
// - Chain them using .then().

const step1 = () => {
  return new Promise((resolve) => {
    console.log("Step 1 done");
    resolve();
  });
};

const step2 = () => {
  return new Promise((resolve) => {
    console.log("Step 2 done");
    resolve();
  });
};

const step3 = () => {
  return new Promise((resolve) => {
    console.log("Step 3 done");
    resolve();
  });
};

step1().then(step2).then(step3);
