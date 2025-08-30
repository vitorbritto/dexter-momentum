// MEMOIZATION
// Intensive Processing
// APi Requests (not ideal)
// Recursive Functions

// Pure Functions
// input -> processing -> output

const initApp = async () => {
  // const memoizedMultBy10 = memoize(multiplyBy10);
  // console.log(memoizedMultBy10(10));
  // console.log(memoizedMultBy10(10));
  // console.log(memoizedMultBy10(10));
  // console.log(memoizedMultBy10(5));
  // console.log(memoizedMultBy10(5));

  // const memoizedAdd3 = memoize(add3);
  // console.log(memoizedAdd3(10, 4, 6));
  // console.log(memoizedAdd3(10, 4, 6));
  // console.log(memoizedAdd3(10, 4, 6));
  // console.log(memoizedAdd3(5, 7, 8));
  // console.log(memoizedAdd3(5, 7, 8));

  // -------------------------------------------------------
  // Se the diference:
  // -------------------------------------------------------
  const memoizedFib = memoize(fib);
  console.log(memoizedFib(40));
  console.log(memoizedFib(40));
  console.log(memoizedFib(40));

  // console.log(fib(40));
  // console.log(fib(40));
  // console.log(fib(40));
};

document.addEventListener("DOMContentLoaded", initApp);

const multiplyBy10 = (num) => num * 10;

const addSome = (num1, num2, num3) => num1 + num2 + num3;
const addMany = (...args) => args.reduce((acc, num) => acc + num);

const memoizedMultiplyBy10 = () => {
  const cache = {};

  return (num) => {
    if (num in cache) {
      console.log(cache);
      return cache[num];
    }

    const result = num * 10;
    cache[num] = result;
    return result;
  };
};

const memoize = (fn) => {
  const cache = {};

  return (...args) => {
    if (args.toString() in cache) {
      console.log(cache);
      return cache[args.toString()];
    }

    const result = fn(...args);
    cache[args.toString()] = result;
    return result;
  };
};

const fib = (pos) => {
  if (pos < 2) return pos;
  return fib(pos - 1) + fib(pos - 2);
};
