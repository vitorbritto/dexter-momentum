
// Memory
// [2] [3] [1]
// JS: [*][*][] [*][*][*] [*][][]

const arr = [1,2,3,4]
const index = arr.findIndex(item => item === 3)

// Mutable way
arr.splice(index, 0, 5)

arr

// Imutable way
const newArr = [...arr.slice(0, index), 5, ...arr.slice(index)]
newArr

// Add an element t the first index or last index we are dealing with an o(1) complexity.
// But if we adsd an element somewhere else the array, it'll be an o(n) complexity.

// WHY?

// Array: [1,2,3,4]
// Bytes in memory: [1][2][3][4]

// MEMORY HERE 😂
// [ ][ ][ ][ ][ ][ ][ ][ ]
// [ ][ ][1][2][3][4][ ][ ]
// [ ][ ][ ][ ][ ][ ][ ][ ]
// [ ][ ][ ][ ][ ][ ][ ][ ]

// UNSHIFT() -> o(1)
// [ ][ ][ ][ ][ ][ ][ ][ ]
// [ ][8][1][2][3][4][ ][ ]
// [ ][ ][ ][ ][ ][ ][ ][ ]
// [ ][ ][ ][ ][ ][ ][ ][ ]

// PUSH() -> o(1)
// [ ][ ][ ][ ][ ][ ][ ][ ]
// [ ][ ][1][2][3][4][9][ ]
// [ ][ ][ ][ ][ ][ ][ ][ ]
// [ ][ ][ ][ ][ ][ ][ ][ ]

// SPLICE() -> o(N)
//    A  B  C  D  E  F  G  H
// 1 [ ][ ][ ][ ][ ][ ][ ][ ]
// 2 [ ][ ][1][2][3][4][9][ ]
// 3 [ ][ ][ ][ ][ ][ ][ ][ ]
// 4 [ ][ ][ ][ ][ ][ ][ ][ ]

//    A  B  C  D  E  F  G  H
// 1 [ ][ ][ ][ ][ ][ ][ ][ ]
// 2 [ ][ ][1][8][2][3][4][9]
// 3 [ ][ ][ ][ ][ ][ ][ ][ ]
// 4 [ ][ ][ ][ ][ ][ ][ ][ ]

// Dense Array vs. Sparse Array
const sparsedNames = ['John', 'Jane', 'Bob', 'Chris']
sparsedNames
sparsedNames.length
sparsedNames[10] = 'Alex'
sparsedNames

const denseNames = ['John', 'Jane', 'Bob', 'Chris']
denseNames
denseNames.length
denseNames.push('Alex')
denseNames.unshift('Praticia')
denseNames

const months = Array.from({length: 12 }, (_, i) => i + 1)
months

const weekDays = Array.from({length: 7 }, (_, i) => i + 1)
weekDays