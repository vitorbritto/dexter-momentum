"use strict";

// ------------------------------------------------------
// THIS KEYWORD
// ------------------------------------------------------

// The `this` keyword refers to the object it belongs to.
// Its value depends on how a function is called: as a method, as a constructor, or as a standalone function.

// 1. Global Scope
console.log("this at the global", this); // In browser: window, in Node: {}

// 2. Object Scope (Implicit Binding)
const employee = {
  id: "A5778",
  firstName: "Alex",
  lastName: "B",
  returnThis: function () {
    return this;
  },
  getFullName: function () {
    return `${this.firstName} ${this.lastName}`;
  },
};

console.log("Employee Id", employee.id); // "A5778"
console.log("this inside the employee object", employee.returnThis());
console.log("Constructed Full Name using this", employee.getFullName());

// 3. Dynamic Method Assignment (Implicit Binding)
const tom = { name: "Tom", age: 7 };
const jerry = { name: "Jerry", age: 3 };

function addLogMessage(obj) {
  obj.logMessage = function () {
    console.log(`${this.name} is ${this.age} years old!`);
  };
}

addLogMessage(tom);
tom.logMessage();

addLogMessage(jerry);
jerry.logMessage();

// 4. Function Scope (Default Binding)
function sayName() {
  console.log("this inside a function", this);
}
sayName(); // In strict mode: undefined, otherwise: global object

function outer(a) {
  console.log("this inside an outer function", this);
  return function inner(b) {
    console.log("this inside an inner function", this);
  };
}
const outerResult = outer(5);
outerResult(3);

// 5. Arrow Functions (Lexical Binding)
const getFood = () => this;
console.log(
  "this inside the arrow function defined in global scope",
  getFood()
);

const food = {
  name: "mango",
  color: "yellow",
  // Arrow function here captures 'this' from where getDesc is called (the object)
  getDesc: function () {
    return () => `${this.name} is ${this.color}`;
  },
};
const descFunc = food.getDesc();
console.log(descFunc());

// 6. Explicit Binding (call, apply, bind)
// --- call ---
function greeting() {
  console.log(`Hello, ${this.name} belongs to ${this.address}`);
}
const user = { name: "javaScript", address: "All of YOU!" };
greeting.call(user);

// --- call with arguments ---
const likes = function (hobby1, hobby2) {
  console.log(`${this.name} likes ${hobby1} , ${hobby2}`);
};
const person = { name: "javaScript" };
likes.call(person, "Teaching", "Blogging");

// --- apply ---
const hobbiesToApply = ["Sleeping", "Eating"];
likes.apply(person, hobbiesToApply);

// --- bind ---
const newHobbies = function (hobby1, hobby2) {
  console.log(`${this.name} likes ${hobby1} , ${hobby2}`);
};
const officer = { name: "Bob" };
const newFn = newHobbies.bind(officer, "Dancing", "Singing");
newFn();

// 7. Constructor Function (new Binding)
function Cartoon(name, animal) {
  this.name = name;
  this.animal = animal;
  this.log = function () {
    console.log(`${this.name} is a ${this.animal}`);
  };
}

const tomCartoon = new Cartoon("Tom", "Cat");
tomCartoon.log();

const jerryCartoon = new Cartoon("Jerry", "Mouse");
jerryCartoon.log();
