'use strict';

// __filename and __dirname
console.log(__filename);
console.log(__dirname);

// Timer
setTimeout(function() {
    console.log('nodejs running!');
}, 1000);

setInterval(function(){
    console.log('i am running...');
}, 200);
