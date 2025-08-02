// ## Build an ATM Cash Withdrawal System
// Rajan goes to the Axis bank ATM. He enters an amount to withdraw. The ATM only allows multiples of 100. Print “Withdrawal successful” if valid, otherwise print “Invalid amount”.

function withdraw(amount) {
  if (amount % 100 === 0) {
    console.log("=====================");
    console.log("Withdrawal successful");
    console.log("=====================");

    return;
  }

  console.log("=====================");
  console.log("Invalid amount");
  console.log("=====================");
}

withdraw(900);
withdraw(786);
