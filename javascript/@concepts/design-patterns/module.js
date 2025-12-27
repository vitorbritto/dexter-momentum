;(function(window, document, undefined) {

    'use strict';

    var myModule = (function() {

        var obj = {} || obj;

        obj._privateFoo = function(arg1, arg2) {
            return console.log('Private Method');
        };

        obj._privateBar = function(arg1, arg2) {
            return console.log('Private Method');
        };

        obj.publicBaz = function(arg1, arg2) {
            return console.log('Public Method');
        };

        return {
            init: obj.publicBaz
        };

    })();

    window.myModule = myModule;

})(window, document);

// myModule.init();
