// Strings
let message = "Hello!"
let phrase = message

message
phrase

// Objects
let user = {
  name: 'John',
  surname: 'Doe',
  // role: 'user',
}

user

let admin = user;

admin

admin.name = 'Peter';

user
admin

// Comparison by reference

let a = {}
let b = a;

a == b
a === b

let a1 = {}
let a2 = {}

a1 === a2 

// Clonning and merging

let operator = {
  name: 'Vitor',
  surname: 'Britto',
  role: 'operator',
}
const operatorData = Object.assign(operator, user)

operatorData
































