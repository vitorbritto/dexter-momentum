// ## Leap Year Checker
// Is 2025 a Leap Year?

// - [ ] Take `year` as input.
// - [ ] Use the arithmetic operator and ternary operator to print if a year is a leap year or not.

function isLeapYear(year) {
  const result =
    (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
      ? `${year} is a Leap Year`
      : `${year} is NOT a Leap Year`;

  console.log(result);
}

isLeapYear(2025); // 2025 is NOT a Leap Year
