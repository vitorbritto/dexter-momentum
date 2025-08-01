// ## 1. What will be the output of this code snippet and why?
// let day = "Monday";

// switch (day) {
//     case "monday":
//         console.log("It's the start of the week.");
//         break;
//     default:
//         console.log("It's a normal day.");
// }

// The output will be the first case "It's a normal day.", because the variable "day" is defined as Monday and the conditions on switch-cases are case-sensitive.



// ## 2. Build an ATM Cash Withdrawal System
// Rajan goes to the Axis bank ATM. He enters an amount to withdraw. The ATM only allows multiples of 100. Print “Withdrawal successful” if valid, otherwise print “Invalid amount”.

function withdraw(amount) {
  if (amount % 100 === 0) {
    console.log('=====================')
    console.log('Withdrawal successful')
    console.log('=====================')
    
    return
  }
  
  console.log('=====================')
  console.log('Invalid amount')
  console.log('=====================')
}

withdraw(900)
withdraw(786)


// ## 3. Build a Calculator with switch-case
// Write a simple calculator that takes an operator (+, -, , /, %) as input, and performs the operation on two numbers. Print the output on the console.

function calculator(operator, op1, op2) {
  let total = 0;
  
  switch(operator) {
    case '+':
      total = op1 + op2;
      break;
    case '-':
      total = op1 - op2;
      break;
    case '/':
      total = op1 / op2;
      break;
    case '*':
      total = op1 * op2;
      break;
    default:
      total = op1 + op2;
  }
  
  return total;
}

calculator('+', 10, 10)
calculator('-', 10, 4)
calculator('/', 10, 5)
calculator('*', 10, 10)

// ## 4. Pay for your movie ticket
// Imagine, the INOX charges ticket prices based on age:
// - Children (<18 years): $3
// - Adults (18 - 60 years): $10
// - Seniors (60+ years): $8

// Write a program that prints the ticket price based on the person’s age.

function ticketAmount(personAge) {
  if (personAge < 18) {
    console.log(`Ticket: $3`)
    return;
  }
  if (personAge <= 60) {
    console.log(`Ticket: $10`)
    return;
  }
  console.log(`Ticket: $8`)
}

ticketAmount(15)
ticketAmount(30)
ticketAmount(65)


// ## 5. Horoscope Sign Checker
// Write a program that prints the zodiac sign(Aries, Taurus, Gemini, etc.) based on a person’s birth month. Make it month bases, not date based. Like March and April borns are Aries, Aplil and May born are Taurus, and so on. Do not use if-else.

function getZodiacSign(month) {
  switch (month.toLowerCase()) {
    case "march":
    case "april":
      console.log("Zodiac sign: Aries");
      break;
    case "may":
      console.log("Zodiac sign: Taurus");
      break;
    case "june":
      console.log("Zodiac sign: Gemini");
      break;
    case "july":
      console.log("Zodiac sign: Cancer");
      break;
    case "august":
      console.log("Zodiac sign: Leo");
      break;
    case "september":
      console.log("Zodiac sign: Virgo");
      break;
    case "october":
      console.log("Zodiac sign: Libra");
      break;
    case "november":
      console.log("Zodiac sign: Scorpio");
      break;
    case "december":
      console.log("Zodiac sign: Sagittarius");
      break;
    case "january":
      console.log("Zodiac sign: Capricorn");
      break;
    case "february":
      console.log("Zodiac sign: Aquarius");
      break;
    default:
      console.log("Invalid month");
  }
}

getZodiacSign("April"); // Zodiac sign: Aries
getZodiacSign("May");   // Zodiac sign: Taurus

// ## 6. Which Triangle?
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