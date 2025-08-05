# Closures

A closure is a function that has access to its own scope, the outer function's scope, and the global scope. Closures allow functions to retain access to variables from their containing (lexical) scope even after that scope has finished executing.

```js
function outer() {
  let outerVar = "I am outside!";
  function inner() {
    console.log(outerVar);
  }
  return inner;
}

const closure = outer();
closure(); // Output: I am outside!
```

In this example, the `outer` function returns the `inner` function, which has access to the `outerVar` variable even after the `outer` function has finished executing. This is a closure.

# Lexical Scope

Lexical scope means that the accessibility of variables is determined by the physical structure of the code. Inner functions have access to variables defined in their outer scope.

# Hoisting

Hoisting is JavaScript's default behavior of moving declarations to the top of the current scope. Variable and function declarations are hoisted, but only the declarations, not the initializations.

```js
function foo() {
  console.log(this);
}

foo(); // Output: Window object
```

# This

The `this` keyword refers to the object it belongs to. Its value depends on how a function is called: as a method, as a constructor, or as a standalone function.

# Execution Context

An execution context is the environment in which JavaScript code is evaluated and executed. It includes the variable object, scope chain, and value of `this`.

# Promises and Async/Await

A Promise is an object representing the eventual completion or failure of an asynchronous operation. It has three states: pending, fulfilled, and rejected.

```js
// Example of Promise

const myPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Promise resolved");
  }, 1000);
});

myPromise.then((result) => {
  console.log(result); // Output: Promise resolved
});

myPromise.catch((error) => {
  console.error(error); // Output: Error: Promise rejected
});
```

```js
// Example of Promise with fetch

fetch("https://api.example.com/data")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => {
    console.log("Fetched data:", data);
  })
  .catch((error) => {
    console.error("Fetch error:", error);
  });
```

Async/await is a syntax introduced in ES2017 that allows you to write asynchronous code in a way that looks synchronous, making it easier to read and maintain.

The `async` keyword is used to declare a function as asynchronous, which means it always returns a Promise. Inside an async function, you can use the `await` keyword to pause the execution of the function until a Promise is resolved or rejected.

```js
// Example of Async/Await

async function fetchData() {
  try {
    const response = await fetch("https://api.example.com/data");
    const data = await response.json();
    console.log("Fetched data:", data);
  } catch (error) {
    console.error("Fetch error:", error);
  }
}

fetchData();
```

```js
// Example of Async/Await with fetch

async function getData() {
  try {
    const response = await fetch("https://api.example.com/data");

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    console.log("Fetched data:", data);
  } catch (error) {
    console.error("Fetch error:", error);
  }
}

getData();
```

In this example, `await` pauses the execution of `getData` until the fetch Promise resolves, and then again until `response.json()` resolves. If an error occurs, it is caught by the `catch` block. This makes asynchronous code easier to write and understand compared to chaining `.then()` and `.catch()` methods.

# Array

An array is a data structure that holds an ordered list of values, which can be accessed by their index. JavaScript arrays have many built-in methods for manipulation.

```js
const arr = [1, 2, 3, 4, 5];

arr.forEach((item) => {
  console.log(item);
});

arr.map((item) => {
  return item * 2;
});

arr.filter((item) => {
  return item > 3;
});

arr.reduce((acc, item) => {
  return acc + item;
}, 0);

arr.find((item) => {
  return item > 3;
});

arr.sort((a, b) => {
  return a - b;
});

arr.includes(3);

arr.slice(1, 3);
```

# Object

An object is a collection of key-value pairs. Keys are strings (or Symbols), and values can be any type. Objects are used to store and organize data.

```js
const obj = {
  name: "John",
  age: 30,
};

obj.name;
obj.age;

obj.name = "Jane";
obj.age = 25;

delete obj.age;

obj.hasOwnProperty("name");

obj.toString();
```

# Event Loop, Call Stack, Microtask Queue and Macrotask Queue

The event loop is a mechanism that allows JavaScript to perform non-blocking operations by offloading operations to the system and executing callbacks when they are ready.

```js
// Example: Event Loop in JavaScript

console.log("Start");

setTimeout(() => {
  console.log("Timeout callback (macrotask)");
}, 0);

Promise.resolve().then(() => {
  console.log("Promise callback (microtask)");
});

console.log("End");

/*
Event Loop Diagram:

  ┌─────────────┐
  │ Call Stack  │
  └─────┬───────┘
        │
        ▼
  ┌─────────────┐
  │  Web APIs   │
  └─────┬───────┘
        │
        ▼
  ┌─────────────┐
  │ Callback    │
  │  Queue      │
  └─────┬───────┘
        │
        ▼
  ┌─────────────┐
  │ Event Loop  │
  └─────────────┘

- Synchronous code runs first ("Start", "End").
- Microtasks (Promise callbacks) run after the current script.
- Macrotasks (setTimeout) run after microtasks.
*/
```

## Call Stack

The **Call Stack** is a data structure that keeps track of the function calls in your JavaScript program. When a function is called, it is added ("pushed") to the top of the stack. When the function returns, it is removed ("popped") from the stack. The JavaScript engine executes code from the top of the call stack, and only one thing can run at a time (single-threaded).

## Microtask Queue

The **Microtask Queue** is a queue that holds tasks scheduled to run after the currently executing script and before any macrotasks. Microtasks include things like `Promise` callbacks (`.then`, `.catch`, `.finally`) and `MutationObserver` callbacks. After the main script finishes running, the event loop will process all microtasks in the queue before moving on to the next macrotask. If a microtask schedules another microtask, it will also be executed before any macrotask.

**Examples of microtasks:**

- `Promise.resolve().then(...)`
- `queueMicrotask(...)`
- `MutationObserver` callbacks

## Macrotask Queue

The **Macrotask Queue** (also known as the task queue or callback queue) holds tasks that are scheduled to run after the current script and all microtasks have finished. Macrotasks include things like `setTimeout`, `setInterval`, `setImmediate` (Node.js), and DOM event callbacks. After all microtasks are cleared, the event loop picks the next macrotask from this queue and executes it.

**Examples of macrotasks:**

- `setTimeout(...)`
- `setInterval(...)`
- `requestAnimationFrame(...)`
- DOM event callbacks

**Key difference:**  
Microtasks are always executed before the next macrotask. This means that if you schedule both a microtask and a macrotask, the microtask will run first, even if the macrotask was scheduled earlier in the code.

# Debouncing

Debouncing is a technique to limit the rate at which a function is executed. It ensures that the function is only called after a certain period of inactivity.

```js
// Example: Debouncing
function debounce(func, delay) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
}

const handleResize = debounce(() => {
  console.log("Window resized");
}, 100);

window.addEventListener("resize", handleResize);

// This will only log "Window resized" once every 100ms
```

# Throttling

Throttling is a technique to limit the number of times a function can be called over time. It ensures a function is called at most once in a specified interval.

```js
// Example: Throttling

function throttle(func, delay) {
  let lastTime = 0;
  return function (...args) {
    const now = Date.now();
    if (now - lastTime >= delay) {
      func.apply(this, args);
      lastTime = now;
    }
  };
}

const handleScroll = throttle(() => {
  console.log("Scroll event");
}, 100);

window.addEventListener("scroll", handleScroll);

// This will only log "Scroll event" once every 100ms
```

# Prototypes and Inheritance

Every JavaScript object has a prototype, which is another object it inherits properties from. Prototypes are used for inheritance and sharing methods.

Inheritance allows one object to access the properties and methods of another. In JavaScript, this is typically achieved through prototypes.

```js
function Animal(name) {
  this.name = name;
}

Animal.prototype.speak = function () {
  console.log(`${this.name} makes a noise.`);
};

const dog = new Animal("Dog");
dog.speak(); // Output: Dog makes a noise.

const cat = new Animal("Cat");
cat.speak(); // Output: Cat makes a noise.

// Inheritance

function Dog(name) {
  Animal.call(this, name);
}

Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

const dog = new Dog("Buddy");
dog.speak(); // Output: Buddy makes a noise.

const cat = new Animal("Whiskers");
cat.speak(); // Output: Whiskers makes a noise.
```

# Shallow Copy and Deep Copy

A shallow copy creates a new object that is a copy of the original, but the nested objects are still the same. Changes to the copy do not affect the original.

````js
const obj = {
  name: "John",
  age: 30,
  address: {
    city: "New York",
    state: "NY",
  },
};

const shallowCopy = { ...obj };

shallowCopy.name = "Jane";
shallowCopy.address.city = "Los Angeles";

console.log(obj); // Output: { name: "John", age: 30, address: { city: "Los Angeles", state: "NY" } }
console.log(shallowCopy); // Output: { name: "Jane", age: 30, address: { city: "Los Angeles", state: "NY" } }

// A deep copy creates a new object that is a complete copy of the original, including all nested objects. Changes to the copy do not affect the original.

```js
const obj = {
  name: "John",
  age: 30,
  address: {
    city: "New York",
    state: "NY"
  }
};

const deepCopy = JSON.parse(JSON.stringify(obj));

deepCopy.name = "Jane";
deepCopy.address.city = "Los Angeles";

console.log(obj); // Output: { name: "John", age: 30, address: { city: "New York", state: "NY" } }
console.log(deepCopy); // Output: { name: "Jane", age: 30, address: { city: "Los Angeles", state: "NY" } }
```;

// # Type Coercion

// Type coercion is the automatic or implicit conversion of values from one data type to another, such as converting a string to a number.

// # Equality

// JavaScript has two types of equality: `==` (loose equality, with type coercion) and `===` (strict equality, without type coercion).

// # DOM

// The Document Object Model (DOM) is a programming interface for HTML and XML documents. It represents the page so that programs can change the document structure, style, and content.

// # Event Handling

// Event handling is the process of responding to user actions or browser events, such as clicks or key presses, usually by attaching event listeners to DOM elements.

// ```

// ```
````
