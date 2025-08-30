// ----------------------------------------------------
//
// Pure Functions
// 
// ----------------------------------------------------

// ----------------------------------------------------
// Why write Pure Functions?
// ----------------------------------------------------
// - Clean Code
// - Easy to test
// - Easy to debug
// - Decoupled and Idependent
// - Could be added to your utility functions

// ----------------------------------------------------
// Rules for Pure Functions
// ----------------------------------------------------

// 1. The same input ALWAYS gives the same output
const add = (x, y) => x + y

add(2,2)

// We can replace the function with the output
// This is called "referential transparency"

// A pure function should have at least one parameter.
// Otherwise, it is same as a constant because they can only work with their input.

// const firstName = () => 'John'
// firstName()

const firstName = 'John'
firstName

// 2. No side effects
const z = 5;
const sum = (x,y) => x + y + z
console.log(sum(2,2))
