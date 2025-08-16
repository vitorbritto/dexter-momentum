const prepare = () => {
  return {
    prepare: () => console.log('Preparing...'),
  };
};

const bake = () => {
  return {
    bake: () => console.log('Baking...'),
  };
};

const ready = () => {
  return {
    ready: () => console.log('Pizza is ready!'),
  };
};

const cookPizza = (size, crust, sauce) => {
  const pizza = {
    size,
    crust,
    sauce,
    toppings: []
  }
  
  return {
    ...pizza,
    ...prepare(),
    ...bake(),
    ...ready(),
  };
};

const pepperoni = cookPizza('medium', 'thin', 'original')

pepperoni.size
pepperoni.crust
pepperoni.sauce

pepperoni.prepare()
pepperoni.bake()
pepperoni.ready()
