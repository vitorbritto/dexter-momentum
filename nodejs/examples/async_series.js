function someFunc(foo, bar, baz, callback) {
    async.series([
        function (step) {
            step();
        },
        function (step) {
            step();
        },
        function (step) {
            step();
        },
        function (step) {
            step();
        },
        function (step) {
            step();
        }
        ], 
        function () {
            callback();
        }
    );
}
