# Creational Patterns

## Builder Pattern

## Singleton Pattern

## Factory Pattern

## Prototype Pattern

## Adapter Pattern

## Bridge Pattern

## Composite Pattern

## Facade Pattern

## Flyweight Pattern

## Proxy Pattern

# Behavioral Patterns

## Chain of Responsibility Pattern

## Command Pattern

## Iterator Pattern

## Mediator Pattern

## Observer Pattern

## State Pattern

## Strategy Pattern

## Template Method Pattern

## Visitor Pattern

# Structural Patterns

## Decorator Pattern

The decorator pattern is a structural design pattern that allows you to add new functionality to an existing object without modifying its structure. It is a way to extend the functionality of an object dynamically.

**Example:**

```js
const shallowClone = (fn) => (obj, array) => fn({ ...obj }, array);

const coffee = (obj, array) => {
  return { ...obj, ...array };
};

const coffeeWithMilk = shallowClone(coffee)({
  cost: 10,
  milk: 1,
});
const cappuccino = shallowClone(coffee)({
  cost: 15,
  milk: 0,
});

console.log(coffeeWithMilk);
console.log(cappuccino);

// Output:
// { cost: 10, milk: 1 }
// { cost: 15, milk: 0 }
```

## Adapter Pattern

## Bridge Pattern

## Composite Pattern

## Facade Pattern

## Flyweight Pattern

## Proxy Pattern
