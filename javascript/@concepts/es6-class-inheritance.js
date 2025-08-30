class Vehicle {
  constructor() {
    this.wheels = 4;
    this.motorized = true;
  }

  ready() {
    return "Ready to go!";
  }
}

class Motorcycle extends Vehicle {
  constructor() {
    super();
    this.wheels = 2;
  }

  wheelie() {
    return "On one wheel now!";
  }
}

const myBike = new Motorcycle();

console.log(myBike);
console.log(myBike.wheels);
console.log(myBike.ready());
console.log(myBike.wheelie());
