// ## Build a Calculator with switch-case
// Write a simple calculator that takes an operator (+, -, , /, %) as input, and performs the operation on two numbers. Print the output on the console.

function calculator(operator, op1, op2) {
  let total = 0;

  switch (operator) {
    case "+":
      total = op1 + op2;
      break;
    case "-":
      total = op1 - op2;
      break;
    case "/":
      total = op1 / op2;
      break;
    case "*":
      total = op1 * op2;
      break;
    default:
      total = op1 + op2;
  }

  return total;
}

calculator("+", 10, 10);
calculator("-", 10, 4);
calculator("/", 10, 5);
calculator("*", 10, 10);
