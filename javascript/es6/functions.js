// =============================
// Functions
// =============================

// Dealing with Arguments
function concatenateAll(...args) {
    return args.join("");
}

// Default Params
function handleThings(name, opts = {}) {
    // ...
}

// Arows Functions
const numbers = [1, 2, 3];

// Single Argument
numbers.map((x) => x * x);

// Guards
() => {
    const name = "Vitor Britto";
    return name;
};

// This Context
function foo() {
    return () => {
        console.log(this);
    };
}
