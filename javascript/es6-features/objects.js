// =============================
// Objects
// =============================


// Syntax
// ----------------------

// Set Object Properties and Methods
const item = {};

const profile = {
    id: 1,
    name: 'Vitor Britto',
    email: 'code@vitorbritto.com.br',
    'time-date': true,
    [getKey('enabled')]: true,
    addRole(role) {
        return profile.name + role;
    },
};

// Get Value

const userID    = profile.id;
const userName  = profile.name;
const userEmail = profile.email;

// Destructing
// ----------------------
function getFullName({ firstName, lastName }) {
  return `${firstName} ${lastName}`;
}

// Multiple Values
function processInput(input) {
  return { left, right, top, bottom };
}

const { left, right } = processInput(input);
