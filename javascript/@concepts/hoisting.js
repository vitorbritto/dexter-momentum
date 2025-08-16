// ------------------------------------------------------
// HOISTING
// ------------------------------------------------------

// Hoisting is the process of moving function declarations to the top of their scope during the compilation phase.

// Function Declaration Hoisting
hoistedFunction(); // Works because function declarations are hoisted

function hoistedFunction() {
  console.log("I am a hoisted function declaration!");
}

// Function Expression Hoisting
try {
  notHoistedFunction(); // ReferenceError: notHoistedFunction is not defined
} catch (e) {
  console.log(e);
}

const notHoistedFunction = () => {
  console.log("I am a function expression and not hoisted!");
};

notHoistedFunction(); // Works now, after the assignment

greetingUser(); // undefined() -> Uncaught TypeError: greetingUser is not a function

var greetingUser = function () {
  console.log("Hello!");
};

// EC
//     GEC
//         CP:
//             greetingUser: undefined
//             fn: "0xA432r32T" (heap)
//         EP:
//             greetingUser: Execute
//             [CRASH]
//     FEC
//         CP:
//         EP:

var greetingUser = function () {
  console.log("Hello!");
};

greetingUser();

// EC
//     GEC
//         CP:
//             greetingUser: undefined
//             fn: "0xA432r32T" (heap)
//         EP:
//             greetingUser: Execute
//     FEC
//         CP:
//             ---
//         EP:
//             greetings: Execute
