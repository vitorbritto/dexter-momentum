'use strict';

// ------------------------------------------------------
// TABLE OF CONTENTS
// ------------------------------------------------------
// 1 - GENERAL NOTES
// 2 - STEP BY STEP
// 3 - GENERAL GUIDE
// 4 - COMMON PROBLEMS
// ------------------------------------------------------


// ------------------------------------------------------
// GENERAL NOTES
// ------------------------------------------------------
//
// There are three basic kinds of functions:
//
// DECLARATIVE FUNCTION
// ----------------------------------------------
// Description:
// A declarative function is a statement triggered by the use of the function keyword.
//
// Example:
// function functionName(arg1, arg2, ..., argn) {
//     function body goes here
// }
//
//
// ANONYMOUS FUNCTION OR FUNCTION CONSTRUCTOR
// ----------------------------------------------
// Description:
// An anonymous function is constructed using the 'new' operator and referencing the Function object.
// It’s anonymous because it isn’t given a name, and access to the function occurs through a variable
// or another object property.
//
// Example:
// var fn = new Function (arg1, arg2, ..., argn, functionbody);
//
//
// FUNCTION LITERAL OR FUNCTION EXPRESSION
// ----------------------------------------------
// Description:
// Functions can be both object and literal. A literal function is a function expression,
// including parameter and body, which is used in place—such as in an argument to another function.
// Like a declarative function, it’s also parsed only once, when the JavaScript application is loaded.
// Like the function created as an object, it can also be anonymous.
//
// Example:
// var myFunction = function(a, b) {
//     return a + b;
// };
// myFunction(4,4); => 8
//
// ------------------------------------------------------



// ------------------------------------------------------
// STEP BY STEP
// ------------------------------------------------------


// CREATING A FUNCTION
// ------------------------------------------------------

// First, we create the function
function showName() {
    console.log('Hello, this is my first function! =]');
}

// Note that when you create a function that doesn't mean it'll be executed,
// unless you invoke this function. So, let's do it.

showName();

// This function can be called as a "static function". It doesn't return a dynamic value besides
// a log message using the 'console' object. So, let's optimize this function passing some parameters.

// CREATING A FUNCTION WITH ARGUMENTS
// ------------------------------------------------------

// Let's provide an argument for the incoming data, and return the result
function showName(str) {
    return console.log('Hello, ' + str + '!');
}

// Invoke the function like we did before and pass a string value as a parameter. Like so:
showName('Vitor Britto');

// See that functions arguments are a good try when you want to pass data to function.
// You also don’t have to provide a one-to-one mapping between the value passed to the object,
// and the number of function parameters. Every function has an "arguments" object which contains
// all of the arguments passed to the function. It’s not a true function, but you can use array
// index notation to access the argument, and it does provide a length property for the number of arguments.

function complexName(name) {
    name[name.length] = 'Hello ' + name[0] + ' ' + name[1];
}

var name = new Array('Vitor','Britto');

complexName(name);

console.log(name[2]); // displays "Hello Ima Reader"

// But, let's face it! This is terrible and does not provide such a elegant way to scalar arguments.
// So, you can convert the function arguments property into a proper array using slice, as bellow:

function complexName() {

    var args = Array.prototype.slice.call(arguments),
        str  = args.join(' ');

    console.log('Hello, ' + str + '!');

}

complexName('Vitor', 'Britto');

// We use the join() method to spit out the comma between array values and replace it with a appropriate space.

// PASSING A FUNCTION AS ARGUMENT
// ------------------------------------------------------

// First, we create a main function with 3 arguments
// and return an other function with 2 argments.
// Note that we reference the SECOND and THIRD argument as
// the FIRST and SECOND argument for the other function
function mainFn(x,y,z) {
    return x(y,z);
}

var callDeepFn = function(arg1, arg2) {
    console.log(arg1 + ' ' + arg2);
};

// We can use a literal function
mainFn(callDeepFn, 'Welcome,', 'Vitor Britto');

// or a function expression as a function argument:
mainFn(function(arg1,arg2) { console.log(arg1 + ' ' + arg2); }, 'Welcome,', 'Vitor Britto');

// The "mainFn" function has 3 arguments, but note that we return a new function called "callDeepFn"
// When we pass the first param as a function we immediatly reference to "callDeepFn" and its arguments

// GETTING INTO CLOSURES
// ------------------------------------------------------

var createTask = function(title, time) {

    var title,
        time;

    return {
        getTitle: function() {
            return 'Task: ' + title;
        },
        getTime: function() {
            if (time > 1) {
                return 'Time: ' + time + ' minutos';
            } else {
                return 'Time: ' + time + ' minuto';
            }
        }
    };
};

var task = createTask('Reply E-mails', 25);

console.log(task.getTitle());
console.log(task.getTime());


// UNDERSTANDING THE CURRYING CONCEPT
// ------------------------------------------------------


// CACHING THE RESULTS WITH MEMOIZATION
// ------------------------------------------------------


// WRAPPING ALL THESE FUNCTIONS
// ------------------------------------------------------

// But there's a more elegant way to create a function
// and avoid global variables to be exposed in our script.
// By doing that, we can provide a namespace and define which
// functions we want to return.

;(function($, window, document, undefined) {

  'use strict';

  var APP = (function() {

    var obj = obj || {};

    // -----------------------------------
    // PRIVATE METHODS
    // -----------------------------------
    obj.foo = function() {
        // code goes here
    };

    // -----------------------------------
    // PUBLIC METHODS
    // -----------------------------------
    obj.bar = function() {
        // code goes here
    };

    // -----------------------------------
    // INITIALIZE MODULE
    // -----------------------------------
    return obj;

  })();

  // Global
  window.APP = APP;

})(jQuery, window, document);


// ------------------------------------------------------
// GENERAL GUIDE
// ------------------------------------------------------

// ARGUMENTS
// ------------------------------------------------------
var sum = function() {
    var sum = 0,
        i   = 0,
        len = arguments.length;

    for (; i < len; i += 1) {
        sum += arguments[i];
    }

    return sum;
};

console.log(sum(1,2,3,4,5,5,6,7,8,9));


// CONSTRUCTORS
// ------------------------------------------------------

// 01
var showDate = function(num) {
    return new Date(num, 0, 1);
};

function Language(developer, created, influences) {
    this.developer = developer;
    this.created = created;
    this.influences = influences;
}

var javascript = new Language(
    'Brendan Eich',
    showDate(1995),
    ['Self', 'Scheme', 'Java']
);

var c = new Language(
    'Dennis Ritchie',
    showDate(1972),
    ['B', 'ALGOL']
);

console.log(javascript);
console.log(c);


// 02
function Person(name, age, place) {
    this.name = name;
    this.age = age;
    this.place = place;
}

Person.prototype.info = function(name, age, place) {
    return console.log(name + ' has ' + age + ' years old and lives in ' + place + '.');
};

var person = new Person();

person.info('Vitor Britto', 33, 'Brazil');
person.info('Douglas Crockford', 73, 'USA');
person.info('Brendan Eich', 53, 'USA');


// CONTEXT
// ------------------------------------------------------

// THAT

// Define Object
var obj = {} || obj;

// Create a property
obj.msg = 'Welcome ';

// Create "name" method
obj.name = function(str) {
    return str;
};

// Create "retrieve" method
obj.retrieve = function(str) {

    // Some developers may refer to "this" with
    // "self" or "_this", instead of "that".

    // var _this = this;
    // var self = this;

    var that = this;

    var helper = function() {
        return console.log(that.msg + that.name(str));
    };

    helper();

};

obj.retrieve('Vitor Britto');

// THIS

// Define Object
var obj = {} || obj;

// Create a property
obj.msg = 'The sum is: ';

// Create "add" method
obj.add = function(a, b) {
    return a + b;
};

// Create "retrieve" method
obj.retrieve = function(a, b) {
    return console.log(this.msg + this.add(a, b));
};

obj.retrieve(4,6);


// INVOCATION
// ------------------------------------------------------

// Invoke Function
var add = function add(a, b) {
    return a + b;
};

console.log(add(5,5));  // 5 + 5


// Invoke Method
var calc = {

    a: function(a, b) { // ADD
        return console.log(a + b);
    },
    s: function(a, b) { // SUBTRACTION
        return console.log(a - b);
    },
    m: function(a, b) { // MULTIPLE
        return console.log(a * b);
    },
    d: function(a, b) { // DIVIDE
        return console.log(a / b);
    }
};

calc.a(5,5);     // 5 + 5  => 10
calc.s(10,8);    // 10 - 8 => 2
calc.m(2,4);     // 2 * 4  => 8

// Other Invoke Method
var obj = {
    value: 1,
    increment: function(inc) {
        this.value += typeof inc === 'number' ? inc : 1;
    }
};

obj.increment();        // 1 + 1
console.log(obj.value); // => 2

obj.increment(5);       // 2 + 5 = 7
console.log(obj.value); // => 7

// Constructor Invoke
var Mood = function(status) {
    this.status = status;
};

Mood.prototype.getStatus = function() {
    return this.status;
};

var mood = new Mood('Happy!');
console.log(mood.getStatus());


// Invoke with Apply
var add = function(num1, num2) {
    return num1 + num2;
};
var arr = [4,8];
console.log(add.apply(null, arr));


// EXCEPTION
// ------------------------------------------------------
var add = function(a,b) {
    try {
        if (typeof a !== 'number' || typeof b !== 'number') {
            throw {
                name: 'TypeError',
                message: 'Define a number'
            };
        }

        return a + b;

    } catch (e) {
        console.log(e.name + ' : ' + e.message);
    }
};

console.log(add(7,7));


// EXTENDING OBJECTS
// ------------------------------------------------------

// Extend Object
Function.prototype.method = function(name, func) {
    this.prototype[name] = func;
    return this;
};

// Object 'Number'
Number.method('integer', function(){
    return Math[this < 0 ? 'ceil' : 'floor'](this);
});

console.log((-10/3).integer());

// Object 'String'
String.method('trim', function() {
    return this.replace(/^\s+|\s+$/g, '');
});

console.log('         Vitor Britto         '.trim());


// MODULES
// ------------------------------------------------------

Function.prototype.method = function(name, func) {
    this.prototype[name] = func;
    return this;
};

String.method('deify', function() {
    var entity = {
        quot: '"',
        lt: '<',
        gt: '>'
    };
    return function() {
        return this.replace(/&([ˆ&;]+);/g,
            function(a,b) {
                var r = entity[b];
                return typeof r === 'string' ? r : a;
            }
        );
    };
})();

console.log(('&lt;&quot;&gt;').deify());

// CURRY
// ------------------------------------------------------


// CHANING METHOD
// ------------------------------------------------------
var SomeClass = function() {

    var _this = this;

    this.one = function() {
        console.log('method one!');
        return _this;
    },
    this.two = function() {
        console.log('method two!');
        return _this;
    },
    this.three = function() {
        console.log('method three!');
        return _this;
    },
    this.four = function() {
        console.log('method four!');
        return _this;
    },
    this.five = function() {
        console.log('method five!');
        return _this;
    };

};

var myclass = new SomeClass();

myclass
    .one()
    .two()
    .three()
    .four()
    .five();


// MEMOIZATION
// ------------------------------------------------------



// ------------------------------------------------------
// COMMON PROBLEMS
// ------------------------------------------------------

// EXCCED PARAMS / ARGS
// ------------------------------------------------------

// Equal params and arguments
function showMessage(name, age, place, work) {
    return ['Nome: ' + name, 'Idade: ' + age + ' anos', 'Residência: ' + place, 'Profissão: ' + work].join('\n');
}

// Output will be fine
console.log(showMessage('Vitor Britto', '33', 'Brazil', 'Full Stack Web Developer'));

// If number of params excced the number of arguments on invocation:
function showMessage(name, age, place, work) {
    return ['Nome: ' + name, 'Idade: ' + age + ' anos', 'Residência: ' + place, 'Profissão: ' + work].join('\n');
}

// The aditional param will be set as 'udefined'
console.log(showMessage('Vitor Britto', '33', 'Brazil'));

// If arguments excced the param number on function
function showMessage(name, age, place) {
    return ['Nome: ' + name, 'Idade: ' + age + ' anos', 'Residência: ' + place, 'Profissão: ' + work].join('\n');
}

// ReferenceError is returned
console.log(showMessage('Vitor Britto', '33', 'Brazil', 'Full Stack Web Developer'));
