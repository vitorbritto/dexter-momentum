class BankAccount {
  #balance; // private field

  constructor(initialBalance) {
    if (initialBalance < 0) {
      throw new Error("Initial balance cannot be negative.");
    }
    this.#balance = initialBalance;
  }

  deposit(amount) {
    if (amount <= 0) {
      console.log("Deposit amount must be positive.");
      return;
    }
    this.#balance += amount;
    console.log(`Deposited: $${amount}`);
  }

  withdraw(amount) {
    if (amount <= 0) {
      console.log("Withdrawal amount must be positive.");
      return;
    }
    if (amount > this.#balance) {
      console.log("Insufficient funds for withdrawal.");
      return;
    }
    this.#balance -= amount;
    console.log(`Withdrew: $${amount}`);
  }

  getBalance() {
    return this.#balance;
  }
}

// Scenario 1: Valid deposit and withdrawal
const account1 = new BankAccount(1000);
account1.deposit(500); // Deposited: $500
account1.withdraw(200); // Withdrew: $200
console.log(account1.getBalance()); // 1300

// Scenario 2: Attempt to withdraw more than balance
account1.withdraw(2000); // Insufficient funds for withdrawal.
console.log(account1.getBalance()); // 1300

// Scenario 3: Attempt to deposit a negative amount
account1.deposit(-100); // Deposit amount must be positive.
console.log(account1.getBalance()); // 1300

// Scenario 4: Attempt to withdraw a negative amount
account1.withdraw(-50); // Withdrawal amount must be positive.
console.log(account1.getBalance()); // 1300

// Scenario 5: Attempt to access private balance directly (should fail)
try {
  console.log(account1.#balance); // SyntaxError
} catch (e) {
  console.log("Cannot access private field #balance directly.");
}

// Scenario 6: Attempt to create account with negative initial balance
try {
  const account2 = new BankAccount(-500);
} catch (e) {
  console.log(e.message); // Initial balance cannot be negative.
}
