class Car {
  constructor() {}
  
  drive() {
    this.#start()
    this.#accelerate()
  }
  
  #start () {
    console.log('Starting the car...')
  }
  
  #accelerate() {
    console.log('Accelerating the car...')
  }
}

const myCar = new Car()

myCar.drive()