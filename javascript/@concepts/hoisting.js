// Function Declaration Hoisting
hoistedFunction(); // Works because function declarations are hoisted

function hoistedFunction() {
  console.log("I am a hoisted function declaration!");
}

// Function Expression Hoisting
try {
  notHoistedFunction(); // Error: notHoistedFunction is not a function
} catch (e) {
  console.log(e);
}

var notHoistedFunction = function () {
  console.log("I am a function expression and not hoisted!");
};

notHoistedFunction(); // Works now, after the assignment

// greetingUser(); // undefined()

// var greetingUser = function greetings() {
//     console.log("Hello!");
// };

// EC
//     GEC
//         CP:
//             greetingUser: undefined
//             greetings: "0xA432r32T" (heap)
//         EP:
//             greetingUser: Execute
//             [CRASH]
//     FEC
//         CP:
//         EP:

var greetingUser = function greetings() {
  console.log("Hello!");
};

greetingUser();

// EC
//     GEC
//         CP:
//             greetingUser: undefined
//             greetings: "0xA432r32T" (heap)
//         EP:
//             greetingUser: Execute
//     FEC
//         CP:
//             ---
//         EP:
//             greetings: Execute
