// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// FUNCTIONS - Declare of define a function
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
function func() {
  console.log('----------------------------')
  console.log('Declare of define a function')
  console.log('----------------------------')
}

func()

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// FUNCTIONS - Function as an Expression
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
const execute = function() {
  console.log('----------------------------')
  console.log('Function as an Expression')
  console.log('----------------------------')
}

execute()

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// FUNCTIONS - Prameters & Arguments
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// Parmeters: input declared on the function
// Arguments: input on function invoke
function sum(a, b) { // <- parameters are "a" and "b"
  return a + b
}

sum(10,10) // <- arguments are 10 and 10


// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// FUNCTIONS - DEFAULT PARAMETERS
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

function calc(a, b = 0) {
  return (2 * (a+b))
}

const total1 = calc(2)
const total2 = calc(2,9)

total1
total2


// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// FUNCTIONS - REST PARAMETERS
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

function calculateThis(a, b, ...rest) {
  return a + b + rest.reduce((sum, num) => sum + num, 0);
}

calculateThis(1,2,3,4,5,6,7,8,9,10,11,12,13,14,15)

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// FUNCTIONS - NESTED FUNCTIONS
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

function outer() {
  console.log('Outer')
  
  // Early Return 
  return function inner() {
    console.log('Inner')
  }
  
  // Invoke
  // inner()
}

// Partially
const result = outer();
result()

// Appended
outer()();


// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// FUNCTIONS - CALLBACK FUNCTIONS
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

function callbackFunction(fn) {
  console.log('Callback Started...')
  fn()
}

// Using anonymous function
callbackFunction(function() {
  console.log('Callback triggered!')
})

// Using arrow function
// callbackFunction(() => console.log('Callback triggered!'))


// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// FUNCTIONS - PURE FUNCTIONS
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

function greeting(name) {
  return 'Hello, '+ name + '!';
}

greeting('Vitor')
greeting('Vitor')
greeting('Vitor')
greeting('Vitor')
greeting('Vitor')


// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// FUNCTIONS - HIGH ORDER FUNCTIONS
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

function getCamera(camera) {
  camera();
}

getCamera(function() {
  console.log('Sony')
})


function HOFunc() {
  return function() {
    console.log( 'Wrapped HOF')
  }
}

const hof = HOFunc()
hof()

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// FUNCTIONS - ARROW FUNCTION
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

const greetMe1 = () => console.log('Olá!')
greetMe1()

const greetMe2 = message => message
greetMe2('Hello!')


// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// FUNCTIONS - IIFE (Immediately Invoked Function Expression)
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
(function() {
  console.log('You invoked an IIFE successfully!')
}())