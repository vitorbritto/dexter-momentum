class User {
  constructor(name, email, password) {
    this.name = name;
    this.email = email;
    this.password = password;
  }

  // static factory method
  static createUser(name, email, password) {
    console.log("Creating user...");
    return new User(name, email, password);
  }

  static isValidEmail(email) {
    return email.includes("@");
  }
}

const isValidEmail = User.isValidEmail("john@example.com")
const user = User.createUser("John", "john@example.com", "123456");

isValidEmail

user.name
user.password
user.email