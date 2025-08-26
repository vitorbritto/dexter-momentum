// Set(0) {
//   __proto__: {
//     constructor: ƒ Set(),
//     has: ƒ has(),
//     add: ƒ add(),
//     delete: ƒ delete(),
//     clear: ƒ clear(),
//     entries: ƒ entries(),
//     forEach: ƒ forEach(),
//     size: 0,
//     values: ƒ values(),
//     keys: ƒ values(),
//     union: ƒ union(),
//     intersection: ƒ intersection(),
//     difference: ƒ difference(),
//     symmetricDifference: ƒ symmetricDifference(),
//     isSubsetOf: ƒ isSubsetOf(),
//     isSupersetOf: ƒ isSupersetOf(),
//     isDisjointFrom: ƒ isDisjointFrom()
//   }
// }

const salad = new Set([
  'tomato',
  'cucumber',
  'carrot',
  'avocado',
  'onion',
  'potato',
]);

salad;

// add
salad.add('limon sauce')

// delete
salad.delete('limon sauce')

// clear
// salad.clear()

// SetIterator
salad.values();
salad.entries();
salad.keys();

// ----------------------
// CONVERSIONS
// ----------------------

// Set to Array
const saladArr = [...salad] 

saladArr

// Array to Set
const dupedSaladItems = [
  'tomato',
  'tomato',
  'tomato',
  'cucumber',
  'cucumber',
  'cucumber',
  'carrot',
  'avocado',
  'avocado',
  'avocado',
  'avocado',
  'onion',
  'potato',
]

dupedSaladItems

const uniqueSaladItems = new Set(dupedSaladItems)

uniqueSaladItems