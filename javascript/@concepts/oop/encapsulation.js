class Employee {
  #salary; // private field

  constructor(name, age, salary) {
    this.name = name;
    this.age = age;
    this.#salary = salary; // private property
  }

  getSalary() {
    return this.#salary;
  }

  setSalary(newSalary) {
    if (newSalary > 0) {
      this.#salary = newSalary;
    } else {
      console.log("Invalid salary amount!");
    }
  }
}

const employee = new Employee("John", 30, 1000);
console.log(employee.getSalary()); // 1000

// Trying to access the private field directly (will fail)
console.log(employee.#salary); // SyntaxError: Private field '#salary' must be declared in an enclosing class

// Trying to modify the private field directly (will fail)
employee.#salary = 2000; // SyntaxError: Private field '#salary' must be declared in an enclosing class

// Correct way: use the setter method
employee.setSalary(2000);
console.log(employee.getSalary()); // 2000

// Trying to set an invalid salary
employee.setSalary(-500); // Invalid salary amount!
console.log(employee.getSalary()); // 2000

// Public property can still be accessed
employee.name = "Jane";
console.log(employee.name); // Jane
