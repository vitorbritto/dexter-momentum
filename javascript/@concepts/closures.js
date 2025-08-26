// Lexical Scope defines how variable names are resolved in nested functions.
// Nested (child) functions haves access to the scope of their parent functions.
// This is often confused with closure, but lexical scope is only an important part of closure.

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// LEXICAL SCOPE
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

// Global Scope
// let x = 1;

// const parentFunction = () => {
//   // Local Scope
//   let myValue = 2;

//   console.log(x);
//   console.log(myValue);

//   const childFunction = () => {
//     console.log((x += 5));
//     console.log((myValue += 1));
//   };

//   return childFunction();
// };

// parentFunction();

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// CLOSURE
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

// A Closure is a function that have acces to the parent scope,
// even after the parent function has been executed.

let x = 1;

const parentFunction = () => {
  // Local Scope
  let myValue = 2;

  console.log(x);
  console.log(myValue);

  const childFunction = () => {
    console.log((x += 5));
    console.log((myValue += 1));
  };

  return childFunction;
};

const result = parentFunction();

result();
result();
result();

console.log(x);

// Reference Error:
// private variable in function scope. Not acessible by global scope.
console.log(myValue);

// IIFE (Immediatily Invoked Function Expression)
const privateCounter = (() => {
  let count = 0;

  console.log("Initial value: ", count);

  return () => {
    count += 1;
    console.log(count);
  };
})();

privateCounter();
privateCounter();
privateCounter();
privateCounter();
privateCounter();

// Example
const credits = ((num) => {
  console.log("Initial credits: ", num);

  return () => {
    num -= 1;

    if (num > 0) {
      console.log("playing game, current credit: ", num);
    }

    if (num <= 0) {
      console.log("not enough credits");
    }
  };
})(5);

credits();
credits();
credits();
credits();
credits();

function createCounter() {
  let count = 0;

  return {
    increment: function () {
      count += 1;
      return count;
    },

    decrement: function () {
      count -= 1;
      return count;
    },
  };
}

const counter = createCounter();

counter.increment();
counter.increment();
counter.decrement();

// Event handlers

function createButton() {
  let msg;

  return {
    click: function () {
      msg = "Button clicked";
      return msg;
    },
  };
}

const button = createButton();

button.click();
button.click();

// Local storage

function createLocalStorage() {
  return {
    get: function (key) {
      return localStorage.getItem(key);
    },
    set: function (key, value) {
      localStorage.setItem(key, value);
      return true;
    },
  };
}

const storage = createLocalStorage();

storage.get("data");
storage.set("data", "Data set");

// Data validation

function createValidator() {
  function isEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function isPhone(phone) {
    return /^(\+?\d[\d\s-]{8,14}\d)$/.test(phone);
  }

  function isDocument(doc) {
    return /^[a-zA-Z0-9]{6,12}$/.test(doc);
  }

  return {
    validateEmail: function (email) {
      return isEmail(email);
    },
    validatePhone: function (phone) {
      return isPhone(phone);
    },
    validateDocument: function (doc) {
      return isDocument(doc);
    },
  };
}

const validator = createValidator();

validator.validateEmail("test@test.com");
validator.validatePhone("1234567890");
validator.validateDocument("1234567890");
