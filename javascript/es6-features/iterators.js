// =============================
// Iterators
// =============================

// Using forEach
const numbers = [1,2,3,4,5];
let sum = 0;
numbers.forEach(num => sum += num);
sum === 15;

// Using reduce (functional FTW!)
const numbers = [1,2,3,4,5];
const sum = numbers.reduce((total, num) => total + num, 0);
console.log(sum);
