var http = require("http");

http.get({host: "vitorbritto.com.br"}, function(res) {
    if (res.statusCode === 200) {
        console.log("This site is up and runnning!");
    } else {
        console.log("This site might be down!");
    }
});
