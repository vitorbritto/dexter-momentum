// WeakMap {
//   __proto__: {
//     constructor: ƒ WeakMap(),
//     delete: ƒ delete(),
//     get: ƒ get(),
//     set: ƒ set(),
//     has: ƒ has()
//   }
// }

new WeakMap()


let user = { name: 'Vitor' }

user

const uMap = new Map()

uMap.set(user, true)

user = null

uMap

const person = { name: 'Vitor' }

const wMap = new WeakMap()
wMap.set(person, true);

person = null

wMap