// ------------------------------------------------------
// SCOPES
// ------------------------------------------------------

// Scope determines the accessibility (visibility) of variables, functions, and objects in some particular part of your code during runtime.

// Declarations

var a = "usesVar"; // [DEPRECATED - DONT USE ANYMORE]
let b = "usesLet"; // [RECOMMENDED]
const c = "usesConst"; // [RECOMMENDED]

console.log(a); // usesVar
console.log(b); // usesLet
console.log(c); // usesConst

// Reassignments

a = "usesVar";
b = "usesLet";
c = "usesConst"; // Uncaught TypeError: Assignment to constant variable.

console.log(a); // usesVar
console.log(b); // usesLet
console.log(c); // usesConst -> Uncaught TypeError: Assignment to constant variable.

// How to test accessing variables before declaration:

// 1. 'var' is hoisted and initialized as undefined
console.log(usingVar); // Output: undefined

// 2. 'let' and 'const' are hoisted but not initialized, so accessing them before declaration throws ReferenceError
try {
  console.log(usingLet); // Throws ReferenceError
} catch (e) {
  console.log("Accessing 'usingLet' before declaration:", e.toString());
}

try {
  console.log(usingConst); // Throws ReferenceError
} catch (e) {
  console.log("Accessing 'usingConst' before declaration:", e.toString());
}

var usingVar = "usesVar"; // [DEPRECATED - DONT USE ANYMORE]
let usingLet = "usesLet"; // [RECOMMENDED]
const usingConst = "usesConst"; // [RECOMMENDED]

// ------------------------------------------------------
// SCOPE CHAIN
// ------------------------------------------------------

// The scope chain in JavaScript determines how variables are resolved in nested functions.
// When a variable is referenced, JavaScript looks for it in the current scope.
// If not found, it moves up to the outer (parent) scope, and continues this process
// until it reaches the global scope. If the variable is not found anywhere, a ReferenceError is thrown.

// Example demonstrating the scope chain:

const globalVar = "I am global";

function outerFunction() {
  const outerVar = "I am in outerFunction";

  function innerFunction() {
    const innerVar = "I am in innerFunction";
    console.log(globalVar); // Accessible: defined in global scope
    console.log(outerVar); // Accessible: defined in outerFunction's scope
    console.log(innerVar); // Accessible: defined in innerFunction's scope
  }

  innerFunction();

  // console.log(innerVar); // Uncaught ReferenceError: innerVar is not defined
}

outerFunction();

// In the above example:
// - innerFunction can access innerVar (its own variable), outerVar (from its parent), and globalVar (from the global scope).
// - outerFunction can access outerVar and globalVar, but NOT innerVar.
// - The global scope can only access globalVar (unless other variables are declared globally).

// This chain of scopes is called the "scope chain".
//
// Visual representation:
// Global Scope
//   └─ outerFunction Scope
//        └─ innerFunction Scope
