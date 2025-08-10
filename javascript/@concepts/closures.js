// ------------------------------------------------------
// CLOSURES
// ------------------------------------------------------

// A closure is a function that has access to its own scope, the outer function's scope, and the global scope. Closures allow functions to retain access to variables from their containing (lexical) scope even after that scope has finished executing.

// Counter

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
