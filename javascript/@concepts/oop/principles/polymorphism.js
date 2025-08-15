class BankAccount {
  constructor(balance) {
    this.balance = balance;
  }
  deposit(amount) {
    this.balance += amount;
  }
  withdraw(amount) {
    this.balance -= amount;
  }
  getBalance() {
    return this.balance;
  }
}

class SavingsAccount extends BankAccount {
  constructor(balance, interestRate) {
    super(balance);
    this.interestRate = interestRate;
  }

  // Polymorphic method
  withdraw(amount) {
    // Savings accounts cannot be overdrawn
    if (amount > this.balance) {
      console.log("Insufficient funds in savings account.");
      return;
    }
    this.balance -= amount;
  }
}

class CheckingAccount extends BankAccount {
  constructor(balance, overdraftLimit) {
    super(balance);
    this.overdraftLimit = overdraftLimit;
  }
  // Polymorphic method
  withdraw(amount) {
    if (amount > this.balance + this.overdraftLimit) {
      console.log("Overdraft limit exceeded in checking account.");
      return;
    }
    this.balance -= amount;
  }
}

// Polymorphism in action:
const accounts = [
  new SavingsAccount(1000, 0.05),
  new CheckingAccount(1000, 500),
];

accounts.forEach((account) => {
  account.withdraw(1200); // Will behave differently based on account type
  console.log(account.getBalance());
});
