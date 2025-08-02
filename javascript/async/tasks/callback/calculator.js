function calculator(a, b, operationCallback) {
    return operationCallback(a, b);
}

function add(x, y) {
    return x + y;
}

function subtract(x, y) {
    return x - y;
}

function multiply(x, y) {
    return x * y;
}

function divide(x, y) {
    if (y === 0) {
        return "Cannot divide by zero";
    }

    return x / y;
}

calculator(5, 5, add);
calculator(5, 5, subtract);
calculator(5, 5, multiply);
calculator(5, 5, divide);
