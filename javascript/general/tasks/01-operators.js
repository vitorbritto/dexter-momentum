// ## 1. Odd or Even?
//  - [ ] Take a number and find if the number is an odd or even number.
//  - [ ] Print the number and result in the console.

function checkOddOrEven(number) {
  if (number % 2 === 0) {
    console.log(`${number} is even.`);
  } else {
    console.log(`${number} is odd.`);
  }
}

checkOddOrEven(10);

// ## 2. Do you have a Driving License?
// Let's check if you are eligible to get a driving license. The eligibility to get a driving licence is 18 years.

function eligibleToDrive(age) {
  if (age >= 18) {
    console.log('Eligible to get a driving license');
  } else {
    console.log('Not eligible to get a driving license');
  }
}

eligibleToDrive(20);

// ## 3. Calculate CTC with a Bonus
// Let's calculate how much you earn from your office.

// - [ ] You get 12,300 rupees as your monthly salary.
// - [ ] You get a 20% bonus on your annual salary.
// - [ ] How much money do you make per annum as a CTC?

function calculateCTC(monthlySalary, bonusPercent) {
  const annualSalary = monthlySalary * 12;
  const bonus = annualSalary * (bonusPercent / 100);
  const totalCTC = annualSalary + bonus;

  console.log(`Monthly Salary: ₹${monthlySalary}`);
  console.log(`Annual Salary (without bonus): ₹${annualSalary}`);
  console.log(`Bonus (${bonusPercent}%): ₹${bonus}`);
  console.log(`Total CTC per annum: ₹${totalCTC}`);
}

calculateCTC(12300, 20);

// ## 4. Write a program for the Traffic Light Simulation.
// Red Light... Green Light... Let's Play!

// - [ ] Create a `color` variable.
// - [ ] Based on the color variable's value print in the console if a traveller needs to STOP or GO. The Red color is for STOP and the Green color is for GO.

function trafficLightAction(color) {
  if (color.toLowerCase() === 'red') {
    console.log('STOP');
  } else if (color.toLowerCase() === 'green') {
    console.log('GO');
  } else {
    console.log('Invalid color');
  }
}

// Testes
trafficLightAction('red'); // STOP
trafficLightAction('green'); // GO
trafficLightAction('yellow'); // Invalid color

// ## 5. Create an Electricity Bill Calculator
// Let's calculate how much you pay for electricity bills per month and annually.

// - [ ] Create a `units` variable. Based on this value you will calculate the total electricity bill for a months.
// - [ ] If each day you consume the `units` and each unit cost 150 rupees, how much will you be charged per month?
// - [ ] If there is a 20% discount on the annual payment, how much will you be charged for an annual payment?

function calculateElectricityBill(unitsPerDay) {
  const costPerUnit = 150;
  const daysInMonth = 30;
  const monthsInYear = 12;

  const monthlyBill = unitsPerDay * costPerUnit * daysInMonth;
  const annualBill = monthlyBill * monthsInYear;
  const annualDiscount = annualBill * 0.2;
  const discountedAnnualBill = annualBill - annualDiscount;

  console.log(`Daily usage: ${unitsPerDay} units`);
  console.log(`Monthly bill: ₹${monthlyBill}`);
  console.log(`Annual bill (without discount): ₹${annualBill}`);
  console.log(`Annual discount (20%): ₹${annualDiscount}`);
  console.log(`Annual bill (with discount): ₹${discountedAnnualBill}`);
}

calculateElectricityBill(10);

// ## 6. Leap Year Checker
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

// ## 7. Max of Three Numbers
// Find the max number from the lot.

// - [ ] Take three numbers and assign them to variables p, q, and r.
// - [ ] Now find the maximum of these three numbers using the comparison operators.

function findMaxOfThree(p, q, r) {
  let max;

  if (p >= q && p >= r) {
    max = p;
  } else if (q >= p && q >= r) {
    max = q;
  } else {
    max = r;
  }

  console.log(`The maximum of ${p}, ${q}, and ${r} is ${max}`);
}

findMaxOfThree(15, 27, 19); // The maximum of 15, 27, and 19 is 27

// ## 8. Bitwise Doubling
// A tricky one for you

// - [ ] Create a variable `count` and assign  a value, say, 5.
// - [ ] Now use the Bitwise shift operator to make the number double.
// - [ ] Print it on the console.


let count = 5;
let doubled = count << 1;

console.log(`Original: ${count}`);
console.log(`Doubled using bitwise: ${doubled}`);