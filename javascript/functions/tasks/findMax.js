// ## 2. Create a Function to Find the Maximum of Two Numbers
// Write a function findMax(num1, num2) that returns the larger of the two numbers. It should work for negative numbers as well.

function findMax(num1, num2) {
    return num1 > num2 ? num1 : num2;
}

findMax(10, 45);
findMax(100, 45);
findMax(1, -5);
