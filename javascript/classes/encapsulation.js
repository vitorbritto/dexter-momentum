class Car {
  #speed = 0
  #engineOn = false
  #fuel = 100

  drive(targetSpeed) {
    this.#start()
    this.#checkFuel()
    this.accelerateUntil(targetSpeed)
  }

  accelerateUntil(targetSpeed) {
    while (this.#speed < targetSpeed) {
      this.#accelerate()
      this.#monitorEngine()
      if (this.#speed >= 80) {
        this.#safetyStuff()
      }
    }
    console.log(`Reached ${this.#speed} mph!`)
  }

  // 🔒 Private methods

  #start() {
    this.#engineOn = true
    console.log('🔑 Starting the car...')
  }

  #accelerate() {
    if (!this.#engineOn) {
      console.log('❌ Engine is off. Cannot accelerate.')
      return
    }
    this.#speed += 10
    this.#consumeFuel()
    console.log(`🚗 Accelerating: ${this.#speed} mph...`)
  }

  #safetyStuff() {
    console.log('⚠️ Safety systems active: seatbelt check, ABS, stability control...')
  }

  #checkFuel() {
    if (this.#fuel <= 0) {
      throw new Error('⛽ No fuel left! Cannot start driving.')
    }
    console.log(`⛽ Fuel level: ${this.#fuel}%`)
  }

  #consumeFuel() {
    this.#fuel -= 5
    console.log(`⛽ Fuel decreased, now at ${this.#fuel}%`)
  }

  #monitorEngine() {
    if (this.#speed > 120) {
      console.log('🔥 Engine overheating! Slowing down...')
    }
  }
}

const myCar = new Car()
myCar.drive(140)