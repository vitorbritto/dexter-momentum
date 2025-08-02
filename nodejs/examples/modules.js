'use strict';

// module.exports

// sum.js
var sum = function(a,b) {
    return a + b;
};

module.exports = sum;

// main.js
var sum = require('./sum');

sum(4,4); // => 8


// exports.foo (alias)

// secondary.js
var sum = function sum(a,b) {
    return a + b;
};

exports.show = function() {
    return console.log('The sum is: ' + sum(4,4));
};

// main.js
module.exports = require('./secondary.js');
