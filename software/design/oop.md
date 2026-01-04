# Introduction to OOP

Object-Oriented Programming (OOP) is a programming paradigm based on the concept of "objects", which can contain data and code to manipulate that data.

# Key Concepts

The OOP has three main concepts:

- **Primary Principles**
- **Paradigm Features**
- **Model-Driven Design**

## Primary Principles

The OOP has four primary principles:

- **Abstraction**
- **Encapsulation**
- **Inheritance**
- **Polymorphism**

### Abstraction

Abstraction is the process of hiding the internal complexities of how something works and only exposing what's necessary for the user to interact with.

**There are two types of abstraction:**

- **Data abstraction**: refers to hiding the internal representation of data and providing a simplified view of the data through a set of well-defined interfaces.
- **Behavioral abstraction**: refers to hiding the internal behavior of an object and providing a simplified view of its capabilities through a set of well-defined interfaces.

**Example:**

```ts
// Example of Data Abstraction
// Exposes only necessary data through an interface
class Employee {
  #salary; // private data

  constructor(name, salary) {
    this.name = name;
    this.#salary = salary;
  }

  getSalary() {
    // Exposes simplified view of salary
    return `Salary is confidential.`;
  }
}

const emp = new Employee("Alice", 70000);
console.log(emp.name); // Alice
console.log(emp.getSalary()); // Salary is confidential.
```

```ts
// Example of Behavioral Abstraction
// Exposes only necessary behavior through an interface
class CoffeeMachine {
  #powerOn;

  constructor() {
    this.#powerOn = false;
  }

  makeCoffee() {
    this.#powerOn = true;
    // Internals of brewing are hidden
    return "Your coffee is ready!";
  }
}

const machine = new CoffeeMachine();
console.log(machine.makeCoffee()); // Your coffee is ready!
```

### Encapsulation

Encapsulation is a concept in object-oriented programming (OOP) that refers to the practice of wrapping an object's internal data and behavior within a defined interface, and hiding the implementation details from the outside world. It is one of the fundamental concepts of OOP and is closely related to the concepts of data hiding and information hiding.

Encapsulation is achieved by using access modifiers (such as "public," "private," and "protected") to control the visibility and accessibility of an object's data and methods. For example, data members of a class can be declared as private, which means they can only be accessed by methods within the class, while methods can be declared as public, which means they can be called by any code that has a reference to the object.

**Example:**

```ts
class BankAccount {
  #balance; // private field

  constructor(initialBalance) {
    this.#balance = initialBalance;
  }

  deposit(amount) {
    this.#balance += amount;
  }

  withdraw(amount) {
    this.#balance -= amount;
  }

  getBalance() {
    return this.#balance;
  }
}

const account = new BankAccount(100);
account.deposit(50);
console.log(account.getBalance()); // 150
account.withdraw(25);
console.log(account.getBalance()); // 125
```

### Inheritance

Inheritance is the process of creating a new class that inherits the properties and methods from a parent class.

**Example:**

```ts
class BankAccount {
  constructor(initialBalance) {
    this.#balance = initialBalance;
  }
}

class SavingsAccount extends BankAccount {
  constructor(initialBalance, interestRate) {
    super(initialBalance);
    this.interestRate = interestRate;
  }
}

const account = new SavingsAccount(100, 0.05);
console.log(account.getBalance()); // 100
console.log(account.interestRate); // 0.05
```

### Polymorphism

Polymorphism is the process of using the same interface to work with different underlying data types.

**There are two types of polymorphism:**

- **Compile-time polymorphism** (also called static polymorphism or early binding) occurs when the type of the object that is going to be acted upon is determined at compile-time. This is achieved through method overloading, which allows multiple methods to have the same name but different parameters within the same class.
- **Run-time polymorphism** (also called dynamic polymorphism or late binding) occurs when the type of the object is determined at run-time. This is achieved through method overriding, which allows a child class to provide a specific implementation of a method that is already defined in its parent class.

**Example:**

```ts
class BankAccount {
  getAccountType() {
    console.log("This is a generic bank account.");
  }
}

class SavingsAccount extends BankAccount {
  getAccountType() {
    console.log("This is a savings account.");
  }
}

class CheckingAccount extends BankAccount {
  getAccountType() {
    console.log("This is a checking account.");
  }
}

function printAccountType(account) {
  account.getAccountType();
}

const savings = new SavingsAccount();
const checking = new CheckingAccount();

printAccountType(savings); // This is a savings account.
printAccountType(checking); // This is a checking account.
```

## Paradigm Features

The OOP has three paradigm features:

- **Abstract Classes**
- **Concrete Classes**
- **Scope / Visibility**
- **Interfaces**

### Abstract Classes

An abstract class is a class in object-oriented programming (OOP) that cannot be instantiated. Instead, it serves as a template or blueprint for other classes to inherit from. An abstract class can contain both abstract and non-abstract methods (abstract methods are methods that do not have any implementation, they just have a signature).

Abstract classes are used to provide a common interface and implementation for a group of related classes. They are also used to define common behavior that must be implemented by all subclasses. A subclass that inherits from an abstract class is called a concrete class, and it must provide an implementation for all the abstract methods declared in the parent class.

**Example:**

```ts
// Abstract class
abstract class Animal {
  abstract makeSound(): void;
}

// Concrete class
class Dog extends Animal {
  makeSound() {
    console.log("Woof!");
  }
}

const dog = new Dog();
dog.makeSound(); // Woof!

const animal = new Animal(); // Error: Cannot create an instance of an abstract class
```

### Concrete Classes

A concrete class is a class in object-oriented programming (OOP) that can be instantiated, meaning objects can be created from it. A concrete class is a class that provides an implementation for all of the abstract methods declared in its parent class, if it inherits from an abstract class. A concrete class can also be a class that does not inherit from an abstract class, in that case it can have implementation for all of its methods.

Concrete classes are used to provide specific implementation details for a group of related classes that inherit from a common abstract class. They are also used to define unique behavior for a specific class. A concrete class can have its own methods and variables, and can also override the methods of its parent class.

**Example:**

```ts
// Abstract class
abstract class Animal {
  abstract makeSound(): void;
}

// Concrete class
class Dog extends Animal {
  makeSound() {
    console.log("Woof!");
  }
}

const dog = new Dog();
dog.makeSound(); // Woof!

const animal = new Animal(); // Error: Cannot create an instance of an abstract class
```

### Scope / Visibility

Scope visibility refers to the accessibility or visibility of variables, functions, and other elements in a program, depending on the context in which they are defined. In object-oriented programming (OOP), scope visibility is controlled through the use of access modifiers, such as "public," "private," and "protected."

- **Public**: A public element can be accessed from anywhere in the program, both within the class and outside of it.
- **Private**: A private element can only be accessed within the class in which it is defined. It is not accessible to other classes, even if they inherit from the class.
- **Protected**: A protected element can only be accessed within the class and its subclasses.

**Example:**

```ts
// Public class
class Animal {
  public name: string;
}

// Private class
class Animal {
  private name: string;
}

// Protected class
class Animal {
  protected name: string;
}

const animal = new Animal();
animal.name = "Dog";
console.log(animal.name); // Dog
```

### Interfaces

In object-oriented programming (OOP), an interface is a contract or a set of methods that a class must implement. It defines a common set of methods that a class must provide, but it does not provide any implementation details. An interface can include both method signatures and constants.

Interfaces are used to define a common behavior for a group of related classes, and to provide a way for objects of different classes to be treated polymorphically. A class that implements an interface must provide an implementation for all of the methods declared in the interface. A class can implement multiple interfaces, but can only inherit from one base class.

**Example:**

```ts
// Interface
interface Animal {
  makeSound(): void;
}

class Dog implements Animal {
  makeSound() {
    console.log("Woof!");
  }
}

const dog = new Dog();
dog.makeSound(); // Woof!
```

## Model-Driven Design

The OOP has a model-driven design approach. It's a design approach that is based on the model of the system.

- **Domain Models**
- **Anemic Models**
- **Domain Language**
- **Class Variants**
- **Layered Architectures**

### Domain Models

A domain model is a representation of a specific area of knowledge
or business that is used to model the objects and concepts within
that domain, and to capture the relationships and constraints
between them. In object-oriented programming (OOP), a domain model
is typically represented by a set of classes and interfaces, with
each class or interface representing a specific concept or object
within the domain.

A domain model is used to provide a clear and consistent
representation of the problem domain, and to capture the business
requirements and constraints of the system. It is also used to
guide the design of the system and to ensure that the system
accurately reflects the real-world problem it is intended to solve.

```ts
// Domain Model Interface
interface IEntity {
  id: number;
}

interface ICustomer extends IEntity {
  name: string;
  email: string;
}

interface IProduct extends IEntity {
  name: string;
  price: number;
}

interface IOrderItem {
  product: Product;
  quantity: number;
  getTotal(): number;
}

interface IOrder extends IEntity {
  customer: Customer;
  addItem(product: Product, quantity: number): void;
  getTotal(): number;
}

// Domain Model Implementation
class Customer implements ICustomer {
  constructor(public id: number, public name: string, public email: string) {}
}

class Product implements IProduct {
  constructor(public id: number, public name: string, public price: number) {}
}

class OrderItem implements IOrderItem {
  constructor(public product: Product, public quantity: number) {}

  getTotal(): number {
    return this.product.price * this.quantity;
  }
}

class Order implements IOrder {
  private items: OrderItem[] = [];

  constructor(public id: number, public customer: Customer) {}

  addItem(product: Product, quantity: number) {
    this.items.push(new OrderItem(product, quantity));
  }

  getTotal(): number {
    return this.items.reduce((total, item) => total + item.getTotal(), 0);
  }
}

// Usage
const customer = new Customer(1, "Alice", "alice@email.com");
const product1 = new Product(10, "Book", 50);
const product2 = new Product(11, "Pen", 5);

const order = new Order(1001, customer);
order.addItem(product1, 2); // 2 books
order.addItem(product2, 4); // 4 pens

console.log(`Order Total: $${order.getTotal()}`); // Order Total: $110
```

### Anemic Models

> 🔥 **Anemic models are considered an anti-pattern in object-oriented programming (OOP) because they violate the principles of encapsulation and separation of concerns.**

An Anemic model, also known as an anemic domain model, is a type of domain model in which the domain objects only contain data (attributes) and lack behavior. An anemic model often results in the use of data-transfer objects (DTOs) and service layer to handle the behavior.

An anemic model is considered an anti-pattern in object-oriented programming (OOP) because it violates the principles of encapsulation and separation of concerns. In an anemic model, the behavior is separated from the data, and is typically implemented in a separate service layer, which can lead to a complex, tightly coupled, and hard-to-maintain codebase.

**Example:**

```ts
// Example of an Anemic Model

// Data entities (anemic: only data, no behavior)
class User {
  constructor(public id: number, public name: string, public email: string) {}
}

class Article {
  constructor(
    public id: number,
    public title: string,
    public content: string
  ) {}
}

// Services that operate on the data (behavior outside the model)
class ArticleService {
  static publishArticle(user: User, article: Article) {
    if (!user || !article) {
      throw new Error("User and Article are required.");
    }
    // Business logic handled by the service, not the model
    console.log(`Publishing article "${article.title}" by ${user.name}.`);
  }
}

// Usage
const user = new User(1, "Jane Doe", "jane@email.com");
const article = new Article(
  101,
  "Encapsulation in OOP",
  "Encapsulation is a key principle..."
);

ArticleService.publishArticle(user, article); // Publishing article "Encapsulation in OOP" by Jane Doe.
```

### Domain Language

A domain language is a specific vocabulary and set of concepts used to describe and communicate about a specific area of knowledge or business. In software development, a domain language is used to model the objects and concepts within a specific domain, and to capture the relationships and constraints between them.

A domain language is used to provide a common understanding of the problem domain among all stakeholders, including developers, business analysts, and domain experts. It is also used to ensure that the software system accurately reflects the real-world problem it is intended to solve.

### Class Variants

A class invariant is a set of conditions that must be true for any object of a class, at any point in time. In object-oriented programming (OOP), class invariants are used to define the valid states of an object and to ensure that the object always remains in a valid state.

Class invariants are typically defined in the constructor of a class and are enforced through the use of private methods and data members that are used to validate the state of the object. They are also checked in the class's methods before and after any operation that can change the state of the object.

```ts
// Example of Class Invariants (Class Variants)

class Rectangle {
  private _width: number;
  private _height: number;

  constructor(width: number, height: number) {
    if (width <= 0 || height <= 0) {
      throw new Error("Width and Height must be positive numbers.");
    }
    this._width = width;
    this._height = height;
    this._checkInvariant();
  }

  set width(value: number) {
    if (value <= 0) {
      throw new Error("Width must be positive.");
    }
    this._width = value;
    this._checkInvariant();
  }

  set height(value: number) {
    if (value <= 0) {
      throw new Error("Height must be positive.");
    }
    this._height = value;
    this._checkInvariant();
  }

  get width() {
    return this._width;
  }

  get height() {
    return this._height;
  }

  area() {
    return this._width * this._height;
  }

  // Class invariant: width and height must always be positive
  private _checkInvariant() {
    if (this._width <= 0 || this._height <= 0) {
      throw new Error("Invariant violated: width and height must be positive.");
    }
  }
}

// Usage
const rect = new Rectangle(5, 10);
console.log(rect.area()); // 50
rect.width = 8;
console.log(rect.area()); // 80
// rect.height = -3; // Error: Height must be positive.
```

### Layered Architectures

A layered architecture is a software design pattern in which the functionality of a system is divided into a set of layers, with each layer having a specific responsibility and interacting with the layers above and below it. The main idea behind a layered architecture is to separate the concerns of the system into distinct and independent layers, making the code more modular, easier to understand, test, and modify.

There are several types of layered architectures, but a common one is the three-layer architecture which consists of:

- **Presentation Layer**: The outermost layer, responsible for displaying the data to the user and collecting user input.
- **Business Layer**: The middle layer, responsible for the business logic of the system.
- **Data Access Layer**: The innermost layer, responsible for the data access and persistence.

**Example:**

```ts
// Example of Layered Architecture in TypeScript

// --- Data Access Layer ---
class UserRepository {
  private users = [
    { id: 1, name: "Alice", isActive: true },
    { id: 2, name: "Bob", isActive: false },
  ];

  getUserById(id: number) {
    return this.users.find((user) => user.id === id) || null;
  }

  getActiveUsers() {
    return this.users.filter((user) => user.isActive);
  }
}

// --- Business Layer ---
class UserService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  fetchUserProfile(id: number) {
    const user = this.userRepository.getUserById(id);
    if (!user) {
      throw new Error("User not found.");
    }
    // Business logic - only return profile if user is active
    if (!user.isActive) {
      throw new Error("User is not active.");
    }
    return { id: user.id, name: user.name };
  }

  listActiveUserNames() {
    return this.userRepository.getActiveUsers().map((user) => user.name);
  }
}

// --- Presentation Layer ---
function showUserProfile(id: number, userService: UserService) {
  try {
    const profile = userService.fetchUserProfile(id);
    console.log("User Profile:", profile);
  } catch (e) {
    console.log("Error:", (e as Error).message);
  }
}

function showAllActiveUsers(userService: UserService) {
  const names = userService.listActiveUserNames();
  console.log("Active Users:", names.join(", "));
}

// -- Usage --
const userRepository = new UserRepository();
const userService = new UserService(userRepository);

showUserProfile(1, userService); // User Profile: { id: 1, name: 'Alice' }
showUserProfile(2, userService); // Error: User is not active.
showAllActiveUsers(userService); // Active Users: Alice
```
