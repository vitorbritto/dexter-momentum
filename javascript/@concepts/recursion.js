// In programming, recursion occurs when a function cals itself.

// Any iterator function (aka function with a loop)
// can be recursive instead.

// Iterator Function
const countToTen = (num = 1) => {
  while (num <= 10) {
    console.log(num);
    num++;
  }
};

countToTen();

// Recursive functions have 2 parts:
// 1. the recursive call to the function
// 2. at least one condition to exit

const recursiveCount = (num = 1) => {
  if (num > 10) {
    return;
  }

  console.log(num);
  num++;
  recursiveCount(num);
};

recursiveCount();

// Reasons to use (not abuse) recursion
// 1. Less Code
// 2. Elegant Code
// 3. Increased Readability

// Reasons to NOT use Recursion
// 1. Performance
// 2. Possibly more difficult to debug (aka follow the logic)
// 3. Is the Readability Improved?

// The Standard Example: The Fibonacci Sequence
// 0, 1, 1, 2, 3, 5, 8, 13, 21, etc.

// Without Recursion
const fibonacci = (num, array = [0, 1]) => {
  while (num > 2) {
    const [nextToLast, last] = array.slice(-2);
    array.push(nextToLast + last);
    num -= 1;
  }

  return array;
};

fibonacci(12);

// With Recursion
const fib = (num, array = [0, 1]) => {
  if (num <= 2) return array;

  const [nextToLast, last] = array.slice(-2);
  return fib(num - 1, [...array, nextToLast + last]);
};

fib(12);

// Real-Life Examples:

// Continuation Token from an API

const getAWSProductImages = async () => {
  // get the data with await fetch request

  if (data.IsTruncated) {
    // recursive
    return await getAWSProductImages(
      productId,
      s3, // connection to s3
      resultArray, // accumulator
      data.NextContinuationToken,
    );
  }

  return resultArray;
};

getAWSProductImages();

// A Parser:
// - a company directory
// - a file directory
// - web crawler
// - data export

const artistsByGenre = {
  jazz: ["Miles Davis", "John Coltrane"],
  rock: {
    classic: ["Bob Seger", "The Eagles"],
    hair: ["Def Leppard", "Whitesnake", "Poison"],
    alt: {
      classic: ["Pearl Jam", "The Killers"],
      current: ["Joywave", "Sir Sly"],
    },
  },
  unclassified: {
    new: ["Caamp", "Neil Young"],
    classic: ["Seal", "Morcheeba", "Chris Stapleton"],
  },
};

const getArtistNames = (data, list = []) => {
  Object.keys(data).forEach((key) => {
    if (Array.isArray(data[key])) {
      return data[key].forEach((artist) => list.push(artist));
    }

    getArtistNames(data[key], list);
  });

  return list;
};

getArtistNames(artistsByGenre);
