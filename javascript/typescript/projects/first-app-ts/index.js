"use strict";
exports.__esModule = true;
var axios_1 = require("axios");
var URL = 'https://jsonplaceholder.typicode.com/todos/1';
axios_1["default"].get(URL).then(function (response) {
    console.log(response.data);
});
