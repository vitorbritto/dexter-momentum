// Pipe

// Using Unary Functions
const sum = x => x + 2;
const sub = x => x - 1;
const mul = x => x * 5;

const result = mul(sub(sum(4)))

console.log(result)

// IMPORTANT: the function above is NOT a pipe function. It is only nested functions.

// To get a result from the pipe method, we read the 
// functions from left to righ, so we use the reduce.
const pipe = (...fns) => val => fns.reduce((prev, fn) => fn(prev), val)

const pipeResult = pipe(sum, sub, mul)(4)

console.log(pipeResult)


// Using Multiple Parameters
const complexPipe =
  (...fns) =>
  (x, y) =>
    fns.reduce((acc, fn) => fn(acc, y), x);

// suas funções
const sum1 = (x, y) => x + y;
const sub1 = (x, y) => x - y;
const mul1 = (x, y) => x * y;

// exemplo de uso
const complexResult = complexPipe(sum1, sub1, mul1)(5, 5);

console.log(complexResult)