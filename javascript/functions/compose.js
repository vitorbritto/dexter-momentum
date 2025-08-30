// Compose

// Using Unary Functions
const sum = x => x + 2;
const sub = x => x - 1;
const mul = x => x * 5;

const result = mul(sub(sum(4)))

console.log(result)

// IMPORTANT: the function above is NOT a compose function. It is only nested functions.

// To get the compose order from right to left as we see with 
// nested functions calls abovem we need to use the reduceRight
const compose = (...fns) => val => fns.reduceRight((prev, fn) => fn(prev), val)

const composeResult = compose(
  mul,
  sub,
  sum,
)(4)

console.log(composeResult)

