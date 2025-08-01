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
