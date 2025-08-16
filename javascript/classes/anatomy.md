# Anatomy of a Class

Classes are blueprints for creating objects. They are defined using the `class` keyword.

## Syntax

```ts
class User {
  // constructor
  constructor(name: string, email: string, password: string) {
    // arguments
    // properties
    this.name = name;
    this.email = email;
    this.password = password;
  }

  // getters
  get getName() {
    return this.name;
  }

  get getEmail() {
    return this.email;
  }

  get getPassword() {
    return this.password;
  }

  // setters
  set setName(value: string) {
    this.name = value;
  }

  set setEmail(value: string) {
    this.email = value;
  }

  set setPassword(value: string) {
    this.password = value;
  }
}

// instance of the class
const user = new User("John", "john@example.com", "123456");

console.log(user.getName);
console.log(user.getEmail);
console.log(user.getPassword);

user.setName = "Jane";
user.setEmail = "jane@example.com";
user.setPassword = "654321";

console.log(user.getName);
console.log(user.getEmail);
console.log(user.getPassword);
```

## Static Properties and Methods

Think static properties and methods as utilities that is shared across all instances of the class. They are not associated with any specific instance of the class.

```ts
class User {
  constructor(name: string, email: string, password: string) {
    this.name = name;
    this.email = email;
    this.password = password;
  }

  // static factory method
  static createUser(name: string, email: string, password: string) {
    console.log("Creating user...");
    return new User(name, email, password);
  }

  static isValidEmail(email: string) {
    return email.includes("@");
  }
}

console.log(User.isValidEmail("john@example.com"));
const user = User.createUser("John", "john@example.com", "123456");
```

## Private and Protected Properties and Methods

```ts
class User {
  constructor(name: string, email: string, password: string) {
    this.name = name;
    this.email = email;
    this.password = password;
  }

  // private properties
  #name: string;
  #email: string;
  #password: string;

  // private methods
  #validateEmail(email: string) {
    return email.includes("@");
  }

  // protected properties
  protected name: string;
  protected email: string;
  protected password: string;

  // protected methods
  protected validateEmail(email: string) {
    return email.includes("@");
  }

  // public properties
  public name: string;
  public email: string;
  public password: string;

  // public methods
  public validateEmail(email: string) {
    return email.includes("@");
  }
}
```
