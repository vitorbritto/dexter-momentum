// Foundational knowledge for writing Pure Functions

// ----------------------------------------
// JavaScript Data Types
// ----------------------------------------

// Primitives vs. Non-Primitives

// Primitives:
// - undefined
// - Boolean
// - Number
// - String
// - BigInt
// - Symbol

// Non-Primitives:
// - Object (Array, Map, Set, WeakMap, WeakSet, Date)
// - Function

// ----------------------------------------
// Value v.s References
// ----------------------------------------

// Primitives pass values:

let x = 2;
let y = x;

y += 1;

console.log(y);

// Structural (Non-Primitives) use references:

let xArr = [1,2,3]
let yArr = xArr

yArr.push(4)

console.log(xArr)
console.log(yArr)


// ----------------------------------------
// Mutable vs Imutable
// ----------------------------------------


let myName = 'Dave'
myName[0] = 'W'
console.log(myName)

// Reassignment is not the same as mutable
myName = 'David'
console.log(myName)


// Structures contains mutable data
yArr[0] = 9 
console.log(xArr)
console.log(yArr)


// ----------------------------------------
// Shallow Copy vs. Deep Copy (clones)
// ----------------------------------------

// Shallow Copy

// With the spread operator
const zArr = [...yArr, 10]
console.log(yArr)
console.log(zArr)
console.log(yArr === zArr)

// With Object.assign()
const tArr = Object.assign([], zArr)
console.log(zArr === tArr)
tArr.push(11)
zArr
tArr

// But if there are nested arrays or objects...
yArr.push([8,9,10])

const vArr = [...yArr]
vArr
vArr[4].push(5)

// Nested structural data types still share a reference.
yArr
vArr

// Freeze Object - will fail for nested objects
const user = {
  name: 'Vitor',
  age: 45,
  address: {
    country: 'Brazil',
    city: 'Alagoinhas',
    state: 'BA'
  }
}

console.log(user)

const frozenObject = Object.freeze(user)
frozenObject.age = 50
frozenObject.address.state = 'SP'
frozenObject.address.city = 'São Paulo'
frozenObject

// Deep Copy

// Use JSON.parse(JSON.stringify())
// Note: does not works with complex data types (regexp, date, FileLists, Blobs, Infinity, Maps, Sets and other complex data types)

const deepCloneUser = JSON.parse(JSON.stringify(user))
console.log(deepCloneUser === user)

// Using structuredClone method
const deepCloneUserAlt = structuredClone(user)
deepCloneUserAlt.age = 50
deepCloneUserAlt.address.state = 'SP'
deepCloneUserAlt.address.city = 'São Paulo'

console.log(deepCloneUserAlt)

// ----------------------------------------
// Pure Functions
// ----------------------------------------

// Impure Function that mutates the data
const addToScoreHistory = (array, score) => {
  array.push(score);
  return array;
}

// This mutates the original array and it's considered to be a side-effect.
const scoreArray = [44,23,12]
console.log(addToScoreHistory(scoreArray, 14))

// We need to modify our function so it does not mutate the original data.

// Pure Function
const pureAddToScoreHistory = (array, score, cloneFn) => {
  const newArray = cloneFn(array);
  newArray.push(score);
  return newArray;
}

const pureScoreHistory = pureAddToScoreHistory(scoreArray, 18, structuredClone)

console.log(scoreArray)
console.log(pureScoreHistory)