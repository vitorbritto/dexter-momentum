// ReferenceError: x is not defined
// console.log(x)

// RangeError: Invalid array length
// const arr = new Array(-1) 

// TypeError: Cannot read properties of null (reading 'name')
// let obj = null
// console.log(obj.name)

//ERROR HANDLING
// try...catch

try {
  console.log('execution starts here')
  
  // const arr = new Array(-1)
  
  abc;
  
  console.log('execution ends here') 
} catch (err) {
  console.error('An error has occured')
  console.log(err.name)
  console.log(err.message)
  console.log(err.stack)
}