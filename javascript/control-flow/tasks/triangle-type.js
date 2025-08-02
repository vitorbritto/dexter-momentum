// Which Triangle?
// A triangle has 3 sides. A Triangle type is determined by its sides:
// - All sides equal is called, `Equilateral Triangle`.
// - Two sides equal is called, `Isosceles Triangle`.
// - All sides different is called, `Scalene Triangle`.

// Take the sides of a triangle as input and write a program to determine the triangle type. Change the inputs everytime manually to see if the output changes correctly.

function checkTriangleType(a, b, c) {
  if (a === b && b === c) {
    console.log("Equilateral Triangle");
  } else if (a === b || b === c || a === c) {
    console.log("Isosceles Triangle");
  } else {
    console.log("Scalene Triangle");
  }
}

// Test cases
checkTriangleType(5, 5, 5); // Equilateral Triangle
checkTriangleType(5, 5, 3); // Isosceles Triangle
checkTriangleType(4, 5, 6); // Scalene Triangle
