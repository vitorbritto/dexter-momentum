// map
//     constructor: ƒ Map(),
//     get: ƒ get(),
//     set: ƒ set(),
//     has: ƒ has(),
//     delete: ƒ delete(),
//     clear: ƒ clear(),
//     entries: ƒ entries(),
//     forEach: ƒ forEach(),
//     keys: ƒ keys(),
//     size: 3,
//     values: ƒ values()

const map = new Map([
  ['name', 'Vitor Britto'],
  ['email', 'hy@vitorbritto.dev'],
  ['phone', '99999990000'],
])

// set(key, value)
map.set('document', '12345678900')

// get(key)
map.get('name')

// has(key)
map.has('phone')
map.has('address')

// delete(key)
map.delete('document')
// map

// clear all
// map.clear()
// map

// get all the keys
const keys = map.keys();
keys.forEach(key => console.log(key))

// get all the entries
const entries = map.entries();
entries.forEach(key => console.log(key))

// get all the values
const values = map.values();
values.forEach(key => console.log(key))

// Iterate directly using forEach
map.forEach((value, key) => console.log(key, value))


// ----------------------
// CONVERSIONS
// ----------------------

// Convert object to Map
const steps = {
  step01: 'in_progress',
  step02: 'pending',
  step03: 'pending',
}

const stepsMap = new Map(Object.entries(steps))

stepsMap

// Convert Map to object
const stepsObj = Object.fromEntries(stepsMap)

stepsObj

// Convert Map into an Array
Array.from(stepsMap)

