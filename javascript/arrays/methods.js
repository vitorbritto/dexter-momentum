const first = [1,2,3]
const second = [4,5,6]
const third = [7,8,9]
const colors = ['red', 'green', 'blue']
const names = ['Tom', 'Jane', 'Alex', 'Bob', 'Christine', 'Tom']
const nums = [2,3,4,1,100,1000,8,45,3343,232,943,776,2,7,876]
const junkFood = ['🍔', '🍟', '🌭', '🍕', '🥪', '🌮', '🌯', '🍿']
const techs = ['💻', '🖥️', '🖱️', '🖲️', '📱', '💽', '💾']
const stuff = [0,1,2,[3,4, [5,6,7,[8,9]]]]
const months = ['Jan', 'Fev', 'Mar']
const days = [1,2,3,4,5,6,7]
const users = [
  {
    name: 'Vitor',
    age: 45,
    category: 'adult'
  },
  {
    name: 'Priscilla',
    age: 42,
    category: 'adult'
  },
  {
    name: 'Arthur',
    age: 10,
    category: 'kid'
  },
  {
    name: 'Agnes',
    age: 5,
    category: 'kid'
  }
]

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// ARRAY - CONCAT -> arr1.(arr2,arr3,...,arrN)
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
first
second
third

const merged = first.concat(second, third) 
merged

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// ARRAY - JOIN
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

const joined = [...first, ...second, ...third].join(' - ')
joined

const emptyJoined = [].join()
emptyJoined

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// ARRAY - FILL -> Mutable
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

colors
// const filled = colors.fill('black')
// filled
const partialFilled = colors.fill('black', 1,3)
partialFilled

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// ARRAY - INCLUDES
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
names.includes('tom')
names.includes('Tom')

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// ARRAY - INDEXOF - LASTINDEXOF
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
names
names.indexOf('Alex')
names.indexOf('Rob')
names.lastIndexOf('Tom')

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// ARRAY - REVERSE
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
names
names.reverse()
names === names.reverse()

const reversed = [...names].reverse()
names === reversed // false

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// ARRAY - SORT
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
names.sort()
nums.sort()

// ASC
nums.sort(function (a,b) {
  return a === b ? 0 : a > b ? 1 : -1
})
// DESC
nums.sort(function (a,b) {
  return a === b ? 0 : a > b ? -1 : 1
})

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// ARRAY - SPLICE
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
names
names.splice(0,1)

names
names.splice(2,2)

names
names.splice(0,1, 'Vitor')

names
names.splice(1,0, 'Zack')

names
names.splice(2,1, 'Zack')

names


// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// ARRAY - AT
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
junkFood

junkFood[0]
junkFood[3]
junkFood[junkFood.length - 1]
junkFood[junkFood.length - 2]
junkFood[junkFood.length - 3]

junkFood.at(0)
junkFood.at(3)
junkFood.at(-1)
junkFood.at(-2)
junkFood.at(-3)

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// ARRAY - COPYWITHIN
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
techs
techs.copyWithin(0,3,6) 

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// ARRAY - FLAT
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
stuff
stuff.flat(Infinity)

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// ARRAY - GROUP ELEMENTS IN ARRAY
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
const groupedByCategory = Object.groupBy(users, ({ category }) => category)

groupedByCategory

const groupedByAgeType = Object.groupBy(users, ({ age }) => {
  return age > 18 ? "authorized" : "not_authorized"
})

groupedByAgeType


// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// ARRAY - IMUTABILLITY
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

// toReversed()
techs
techs.toReversed()
techs === techs.toReversed()

// toSorted()
names
names.toSorted()
names === names.toSorted()

// toSpliced()
months
months.toSpliced(Infinity)
months === months.toSpliced(Infinity)

// with()
days
days.with(2,6)
days.with(-2,0)