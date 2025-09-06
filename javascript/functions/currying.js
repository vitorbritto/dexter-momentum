// Currying
// Named after Haskell B. Curry
// Concept from lambda Calculus

// Currying takes a function that rec eives more than one parameter
// and breaks it into a series of unary (one parameter) functions.
// Therefore, a curried function only takes one parameter at a time.

const cookSandwich = (ingridient1) => {
  return (ingridient2) => {
    return (ingridient3) => {
      return `${ingridient1}, ${ingridient2}, ${ingridient3}`;
    };
  };
};

cookSandwich("bacon")("lettuce")("tomato");

// It works but thats getting ugly and nested the further we go

// Let's refactor:

const buildSammy = (ing1) => (ing2) => (ing3) => `${ing1}, ${ing2}, ${ing3}`;

buildSammy("turkey")("cheese")("bread");

const multiply = (x) => (y) => x * y;

const timesTen = multiply(10);

timesTen(20);
