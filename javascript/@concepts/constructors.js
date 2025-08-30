// Function Constructors
function Animal(species) {
  this.species = species;
  this.eats = true;
}

Animal.prototype.walks = function () {
  return `A ${this.species} is walking.`;
};

const WildAnimal = new Animal("bear");

console.log(WildAnimal.species);
console.log(WildAnimal.walks());

console.log(WildAnimal.__proto__);
console.log(WildAnimal.__proto__ === Animal.prototype);
