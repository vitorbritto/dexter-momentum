// ## Simulate Coin Toss
// Return a Promise that randomly resolves to "Heads" or "Tails" after 1 second.

function flipCoin() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const result = Math.random() < 0.5 ? "Heads" : "Tails";
      resolve(result);
    }, 1000);
  });
}

flipCoin().then((result) => console.log(result));
