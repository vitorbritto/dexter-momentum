var url = require("url");
var http = require("http");
 
http.createServer(function(req, res){
 
    var pathname = url.parse(req.url).pathname;
 
    if (pathname === "/") {
 
        res.writeHead(200, {"Content-Type": "tex/plain"});
        res.end("Home Page");
 
    } else if (pathname === "/about") {
 
        res.writeHead(200, {"Content-Type": "tex/plain"});
        res.end("About");
 
    } else if (pathname === "/contact") {
 
        res.writeHead(200, {"Content-Type": "tex/plain"});
        res.end("Contact");
 
    } else {
 
        res.writeHead(404, {"Content-Type": "text/plain"});
        res.end("Page Not Found!");
 
    }
}).listen(8080, "127.0.0.1");
 
console.log("Server is running...");
