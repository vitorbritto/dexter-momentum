// =============================
// Primitives types
// =============================
// - string
// - number
// - boolean
// - null
// - undefined
// - NaN
// - Symbol
// - BigInt
// =============================

const foo = 1;
let bar = 3;

bar = 9;

console.log(foo, bar); //  => 1, 9

// =============================
// Non-primitives types
// =============================
//  - object
//  - array
//  - function
// =============================

const source = [1, 2];
const cloned = arr;

source[0] = 9;

console.log(source[0], cloned[0]); // => 9, 9
