// =============================
// Arrays
// =============================

const items = [];


// Add element at last key on array
items.push('bazinga');


// Copy Items from Array
const itemsCopy = [...items];


// Convert an array-like object to an array
const foo   = document.querySelectorAll('.foo');
const nodes = Array.from(foo);


// Destructing
const arr = [1, 2, 3, 4];
const [first, second] = arr;
