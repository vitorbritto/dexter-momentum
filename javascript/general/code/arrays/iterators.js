// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// ARRAY - ITERATORS
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

const users = [
    { id: 1, name: "Alice", email: "alice@example.com", isAdmin: false },
    { id: 2, name: "Bob", email: "bob@example.com", isAdmin: true },
    { id: 3, name: "Charlie", email: "charlie@example.com", isAdmin: true },
    { id: 4, name: "Diana", email: "", isAdmin: true },
];

// filter()
users.filter((user) => user.isAdmin === true);

// map()
const usersWithTitle = users.map((user) => {
    let title = "";

    if (user.isAdmin) {
        title = "Super";
    }

    return {
        ...user,
        fullName: `${title} ${user.name}`,
    };
});

usersWithTitle;

// reduce()
const adminCounter = users.reduce((acc, user) => {
    if (user.isAdmin) {
        acc = acc + 1;
    }

    return acc;
}, 0);

adminCounter;

// reduceRight()
const adminCounterRight = users.reduceRight((acc, user) => {
    if (user.isAdmin) {
        acc = acc + 1;
    }

    return acc;
}, 0);

adminCounterRight;

// some()
users.some((user) => user.isAdmin);

// every()
users.every((user) => user.isAdmin);

// find() - find the first match in array
const admins = users.find((user) => user.isAdmin);
admins;

// findIndex()
const adminIndex = users.findIndex((user) => user.isAdmin);
adminIndex;

// findLastIndex()
const adminLastIndex = users.findLastIndex((user) => user.isAdmin);
adminLastIndex;

// Array method chaining

// forEach()
let sum = 0;
const _numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
_numbers.forEach((num) => {
    sum = sum + num;
});

sum;

// entries()
const numEntries = _numbers.entries();
// numEntries.next().value
// numEntries.next().value
// numEntries.next().value
// numEntries.next().value

// WITH fo...of
for (const [index, element] of numEntries) {
    console.log("Index: ", index);
    console.log("Element", element);
}

// values()
const numValues = _numbers.values();
// numValues.next().value
// numValues.next().value
// numValues.next().value
// numValues.next().value
// numValues.next().value
// numValues.next().value
// numValues.next().value
// numValues.next().value
// numValues.next().value

// WITH fo...of
for (const value of numValues) {
    console.log("Value: ", value);
}

// flatMap()

// IMPORTANT
// Using **for...in** on arrays is a misuse because it iterates over enumerable properties, not just numeric indexes — and in any order.

// ❌ Misuse Example:

const arr = [10, 20, 30];
arr.custom = "oops";

for (const key in arr) {
    console.log(arr[key]); // prints 10, 20, 30, 'oops'
}

// ✅ Proper Alternatives:
// - for loop
// - for...of
// - .forEach(), .map(), etc.

for (const value of arr) {
    console.log(value); // only array elements
}

// 👉 Use for...in only for objects — not arrays.
