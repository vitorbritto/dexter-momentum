// ------------------------------------------------------
// INHERITANCE IN JAVASCRIPT - EXAMPLE
// ------------------------------------------------------

// JavaScript uses prototypal inheritance. You can create inheritance
// using constructor functions and prototypes, or using ES6 classes.

// 1. Using Constructor Functions and Prototypes

function Animal(name) {
    this.name = name;
}

Animal.prototype.speak = function () {
    console.log(this.name + " makes a noise.");
};

function Dog(name, breed) {
    // Call the parent constructor
    Animal.call(this, name);
    this.breed = breed;
}

// Inherit from Animal
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

// Override speak method
Dog.prototype.speak = function () {
    console.log(this.name + " barks.");
};

var dog1 = new Dog("Rex", "German Shepherd");
dog1.speak(); // Rex barks.
console.log(dog1 instanceof Dog); // true
console.log(dog1 instanceof Animal); // true

// 2. Using ES6 Classes

class Vehicle {
    constructor(make) {
        this.make = make;
    }
    drive() {
        console.log(`${this.make} is driving.`);
    }
}

class Car extends Vehicle {
    constructor(make, model) {
        super(make); // Call the parent constructor
        this.model = model;
    }
    drive() {
        console.log(`${this.make} ${this.model} is zooming on the road!`);
    }
}

const myCar = new Car("Toyota", "Corolla");
myCar.drive(); // Toyota Corolla is zooming on the road!
console.log(myCar instanceof Car); // true
console.log(myCar instanceof Vehicle); // true

// 3. Prototypal Inheritance with Object.create

const animal = {
    eats: true,
    walk() {
        console.log("Animal walks");
    },
};

const rabbit = Object.create(animal);
rabbit.hops = true;

console.log(rabbit.eats); // true (inherited)
rabbit.walk(); // Animal walks
console.log(rabbit.hops); // true (own property)
