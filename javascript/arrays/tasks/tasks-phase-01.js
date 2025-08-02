// **T-001**: Create an array of 5 elements using the Array Constructor.
const nums = new Array(1, 2, 3, 4, 5);

// **T-002**: Create an array of 3 empty slots.
const emptyArray = new Array(3);

// **T-003**: Create an array of 6 elements using the Array literals and access the fourth element in the array using its `length` property.
const literalArray = [1, 2, 3, 4, 5, 6];
literalArray[4];

// **T-004**: Use the `for` loop on the above array to print elements in the odd index.
for (let i = 0; i < literalArray.length; i++) {
  if (i % 2 !== 0) {
    console.log(i);
  }
}

// **T-005**: Add one element at the front and the end of an array.
literalArray.unshift(0);
literalArray.push(7);

// **T-006**: Remove an element from the front and the end of an array.
literalArray.pop(7);
literalArray.shift(0);

// **T-007**: Create an array containing the name of your favourite foods(10 foods). Destructure the 6th food element from the array using destructuring.
const favoriteFoods = [
  "Steak",
  "Burger",
  "Lasagna",
  "Pizza",
  "Pasta",
  "Sushi",
  "Ice Cream",
  "Tacos",
  "French Fries",
  "Hot-dog",
];
const [, , thirdFood] = favoriteFoods;
thirdFood;

// **T-008**: Take out the last 8 food items from the above array using the Array destructuring. Hint: rest parameter.
const [, , ...lastEightFoods] = favoriteFoods;

// **T-009**: Clone an Array(Shallow cloning)
const favoriteFoodsCloned = favoriteFoods;

// **T-010**: Empty an array using its length property
favoriteFoodsCloned.length = 0;

// **T-011**: Create an array of 10 elements(number 1 to 10). Resize the array to length 6 once you find the number 5 in that array. Hint: Use `for-loop`.

// **T-012**: Create an Array of 10 elements. Use the `splice()` method to empty the array.
const willBeEmpty = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
willBeEmpty.splice(0, 0);

// **T-013**: Create an Array of 10 elements. You can empty the array in multiple ways: using the `length` property, using the `pop()` method, using the `shift()` method, setting the array with `[]`, or the `splice()` method. Which among these methods are most efficient and why?
let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// Using length property
arr.length = 0;

// Using pop() in a loop
while (arr.length > 0) {
  arr.pop();
}

// Using shift() in a loop
while (arr.length > 0) {
  arr.shift();
}

// Reassigning with []
arr = [];

// Using splice()
arr.splice(0, -1);

// The arr.length =0 and arr = [] are the most efficient ways to empty an array.
// arr.length = 0 clears the array in-place without creating a new one.
// arr = [] creates a new array (it's a good way to keep the reference).
// pop() and shift() are slower, specially shift(), because it re-indexes all the elements after each removal.

// **T-014**: What happens when you concatenate two empty arrays?
const concatEmptyArrays = [].concat([]);
console.log(concatEmptyArrays);

// **T-015**: How can you check if a value is partially matching with any of the elements of an Array?
const arr = ["apple", "banana", "grape"];
const match = arr.some((item) => item.includes("app"));
console.log(match); // true

// **T-016**: What is the difference between the slice() and splice() methods?
// The slice() method don't mutate the oriiginal array, it returns a new array and can extract portions of it.
// The splice() method will mutate the original array, will remove items and can manipulate them (adding or removing).

// **T-017**: Create an Array of alphanumeric strings. Sort the elements in both ascending and descending orders. You must be doing this in an immutable way such that the source array never gets modified.
const alphaNumeric = ["c", "d", "e", "a", "b"];
const [...alphaNumericClonedASC] = alphaNumeric;
const [...alphaNumericClonedDESC] = alphaNumeric;

const alphanumericASC = alphaNumericClonedASC.sort();
const alphanumericDESC = alphaNumericClonedDESC.sort().reverse();

console.log(alphanumericASC);
console.log(alphanumericDESC);

// **T-018**: Can you give examples of sparse and dense arrays?
const denseArray = [1, 2, 3, 4, 5];
const [...sparseArray] = denseArray;

sparseArray.length = 10;

console.log(sparseArray);

// **T-019**: Give a practical usages of the .fill() method

// Initialize an array of 5 zeroes
const zeros = new Array(5).fill(0);
console.log(zeros); // [0, 0, 0, 0, 0]

// Mask a password
const masked = Array(8).fill("*").join("");
console.log(masked); // ********

// **T-020**: How to convert an array to a string?
const convertedArray = ["foo", "baz", "bar"];
convertedArray.join("");
convertedArray.join("-");
convertedArray.toString();
