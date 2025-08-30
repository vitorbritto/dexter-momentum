// Checking for epty arrays
let myArray = [];

// Arrays have a length property
console.log(myArray.length); // 0

// Because of the length, we're inclined to check if the array exists using it.
// But that's where the danger lies. Imagine a case where the array comes back as undefined or null.

myArray = undefined;

// EPIC FAIL!
// console.log(myArray.length); // TypeError: Cannot read properties of undefined (reading 'length')

// But then we end up leaning toward another mistake: checking if the array exists and if it's not empty.
console.log(myArray && myArray.length); // undefined

// But there is a better and concise way to do this verification using optional chaining
console.log(myArray?.length); // undefined

myArray = [{ id: 1 }, { id: 2 }, { id: 3 }];
console.log(myArray?.length); // undefined
console.log(myArray?.[0]?.id); // 1
console.log(!!myArray?.[0]?.id); // true

// Also, you can use ?? (Nullish coalescing operator)
let userData = {
  data: null,
  pagination: {
    // ...
  },
};
console.log(userData?.data?.length ?? "No data available"); // No data available

userData = undefined;
console.log(userData?.data?.length ?? "No data available"); // No data available

// Or you can also try with the Array.isArray() method to validate if its an array
let myFreakingArray = [];
console.log(Array.isArray(myFreakingArray));

myFreakingArray = ["a", 1, {}, [3, 4, 5]];
console.log(Array.isArray(myFreakingArray));

myFreakingArray = {};
console.log(Array.isArray(myFreakingArray));

myFreakingArray = "John";
console.log(Array.isArray(myFreakingArray));
