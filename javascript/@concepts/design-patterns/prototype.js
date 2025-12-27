'use strict';

function Object(private1, private2, public1, public2) {

    var private1 = private1,
        private2 = private2;

    this.public1 = public1;
    this.public2 = public2;

    this.init();

}

Object.prototype = {

    init: function() {
        // init
        console.log('Object initialized');
    },

    foo: function() {
        // code goes here
    },
    bar: function() {
        // code goes here
    },
    baz: function() {
        // code goes here
    }

};

console.log(Object.init());
