var http = require("http"),
    urls = ["vitorbritto.com", "vitorbritto.com.br", "www.vitorbritto.com.br"];
 
for (var i = 0; i < urls.length; i++) {
    ping(urls[i]);
}
 
function ping(url) {
    console.time('Response Time: ');
    
    http.get({host: url}, function(res){
        console.log("URL: " + url);
        console.timeEnd('Response Time: ');
    });
}
