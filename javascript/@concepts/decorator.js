const shallowClone = fn => (obj, array) => fn({ ...obj }, array)

const coffee = (obj, array) => {
  return { ...obj, ...array };
};

const coffeeWithMilk = shallowClone(coffee)({
  cost: 10,
  milk: 1
});
const cappuccino = shallowClone(coffee)({
  cost: 15,
  milk: 0
});

coffeeWithMilk
cappuccino