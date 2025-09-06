// Infer
// - Less typing
// - Simple and obvious functions
// - Code used by me

// Annotations
// - Author-Intended return type
// - Prevent contract screw-ups
// - Complex functions
// - Code used by others

// Type Annotations
let apples = 10;
let speed = "fast";
let hasName = true;

let nothingMuch: null = null;
let nothing: undefined = undefined;

// Built-in objects
let now = new Date();

// Array
let colors = ["red", "green", "blue"];
let integers = [1, 2, 3, 4, 5];
let validations = [true, false, true, true];

// Classes
class Car {}
let car: Car = new Car();

// Object Literal
let point = {
  x: 10,
  y: 20,
};

// Function
const logNumber = (i: number) => {
  console.log(i);
};

// USE CASES

// Annotations
const json = '{"x": 10, "y": 20}';
const coords: { x: number; y: number } = JSON.parse(json);
console.log(coords);

// Delayed initialize
let words = ["red", "green", " blue"];
let foundWord: boolean;

for (let i = 0; i < words.length; i++) {
  if (words[i] === "green") {
    foundWord = true;
  }
}

// Persisted Inference
let numbers = [-10, -1, 12];
let numberAboveZero: boolean | number = false;

for (let i = 0; i < numbers.length; i++) {
  if (numbers[i] > 0) {
    numberAboveZero = numbers[i];
  }
}
