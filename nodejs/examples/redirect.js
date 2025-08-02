var http = require("http");
 
http.createServer(function(req, res){
    res.writeHead(301, {
        "Location" : "http://vitorbritto.com"
    });
    res.end();
}).listen(3030, "127.0.0.1");
 
console.log("Server redirects from localhost to vitorbritto.com");
