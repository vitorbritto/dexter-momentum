// arrayExample: indexes -> 0,1,2,3
// arrayExample: length - 1 -> last index from array

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// ARRAY - CREATE
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

// Object Literal to create an Array
const salad = ["🍅", "🥒", "🥕"];
salad

// Constructor to create an Array
const saladAlternative = new Array("🍅", "🥒", "🥕", "🫑");
saladAlternative

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// ARRAY - MANIPULATE
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
salad
salad.push("🥔"); // insert last
salad.unshift("🥦"); // insert first
salad
salad.pop(); // remove last
salad.shift(); // remove first
salad

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// ARRAY - CLONE or COPY
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

const saladCopy = salad.slice()

// salad
// saladCopy
salad === saladCopy

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// ARRAY - CHECK IF IS AN ARRAY
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
Array.isArray(salad)
Array.isArray(3)
Array.isArray(Number(3))
Array.isArray("foo")
Array.isArray(String("foo"))
Array.isArray({})
Array.isArray({ foo: 1, baz: 2, bar: 3 })
Array.isArray(true)
Array.isArray(Boolean(true))
Array.isArray([1,2,3,4,5])

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// ARRAY - DESTRUCTURING
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
const _salad = ["🍅", "🥒", "🥕", "🫑", "🥔", "🥦"];

// ES5
const tomato_1 = _salad[0]
const cucumber_1 = _salad[1]
const potato_1 = _salad[4]

tomato_1
cucumber_1
potato_1

// ES6
const [tomato_2, cucumber_2, potato_2] = _salad

tomato_2
cucumber_2
potato_2

const [first, second, ...rest] = _salad

first
second
rest

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// ARRAY - NESTED
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
const arr = [1,2,3, ["foo", salad]]
const tomate_old_way = arr[3][1][0]

tomate_old_way

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// ARRAY - SKIP VALUE
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
const [,,,[,[tomato_3]]] = [1,2,3, ["foo", salad]]

tomato_3

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// ARRAY - REST AND SPREAD
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
const mySalad = [ '🥦', '🍅', '🥒', '🥕', '🥔' ]

const [mySaladBrocolli, mySaladTomato, ...mySaladRest] = mySalad
mySaladBrocolli
mySaladTomato
mySaladRest

const mySaladCopy = [...mySalad]
mySaladCopy

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// ARRAY - SWAP VALUES
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

let happy = '🙂';
let sad = '🙁';

[happy, sad] = [sad, happy]

happy
sad

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// ARRAY - MERGE
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

const emotions = ['🙂', '🙁'];
const veggies = [ '🥦', '🥒', '🥕' ];

const emoVeggies = [...emotions, ...veggies];

emoVeggies


// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// ARRAY - LENGTH
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

emotions.length // get the length of an array
emotions.length = 6 // Add new 4 items
emotions // output curent array
emotions.length = 1 // leave just one item
emotions // output curent array
emotions.length = 0 // Remove all items
emotions // output curent array
emotions.length = 2 ** 32 // RangeError
emotions.length = 2 ** 32 - 1 // Limit