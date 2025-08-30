// Portotypal Inheritance and the Prototype Chain

// ES6 introduced classes which is the modern way to construct objects.

// That said, prototypal inheritance and the prototype chain are
// "under the hood", (ES6 Classes are considered "syntatic sugar")

const person = {
  alive: true,
};

const musician = {
  plays: true,
};

musician.__proto__ = person;

console.log(musician.plays); // true
console.log(musician.alive); // true

console.log(musician);
// {
//   plays: true
//     [[Prototype]]: Object
//       alive: true
//       [[Prototype]]: Object
// }

// JS now has getPrototypeOf and setPrototypeOf
// methods instead of using __proto__.

Object.setPrototypeOf(musician, person);

console.log(Object.getPrototypeOf(musician));
console.log(musician.__proto__);
console.log(Object.getPrototypeOf(musician) === musician.__proto__);

// Extending the prototype chain => general to specific to more specific.
const guitarrist = {
  strings: 6,
  __proto__: musician,
};

console.log(guitarrist.alive); // {}.__proto__.__proto__.alive
console.log(guitarrist.plays); // {}.__proto__.plays
console.log(guitarrist.strings); // {}.strings

// No circular references allowed (person.__proto__ can't be guitarrist)
// The __proto__ value must be an object or null.
// An object can only directly inherit from one object.

// Getter and Setter
const car = {
  doors: 4,
  seats: "vinyl",
  get seatMaterial() {
    return this.seats;
  },
  set seatMaterial(material) {
    return (this.seats = material);
  },
};

const luxuryCar = {};
Object.setPrototypeOf(luxuryCar, car);
luxuryCar.seatMaterial = "leather";
console.log(luxuryCar);
console.log(luxuryCar.doors);
console.log(car);

// Walking up the chain - props and methods are not copied
console.log(luxuryCar.valueOf());

// Getting the keys of an object
console.log(Object.keys(luxuryCar));

// Loop through each object key
Object.keys(luxuryCar).forEach((key) => console.log(key));

// Using for...in loop will includes inherited props
for (let key in luxuryCar) {
  console.log(key);
}

// Using for...in but with only own props.
for (const key in luxuryCar) {
  if (Object.hasOwn(luxuryCar, key)) {
    console.log(key);
  }
}

// using for...in with key/value pairs and iteration.
for (const [k, v] of Object.entries(luxuryCar)) {
  console.log(`key: ${k}`);
  console.log(`value: ${v}`);
}
