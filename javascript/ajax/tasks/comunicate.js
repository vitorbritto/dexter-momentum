'use strict';

// ------------------------------------------------------
// TABLE OF CONTENTS
// ------------------------------------------------------
// 1 - GENERAL NOTES
// 2 - GENERAL GUIDE
// 3 - COMMON PROBLEMS
// ------------------------------------------------------


// ------------------------------------------------------
// GENERAL NOTES
// ------------------------------------------------------

// AJAX STEPS OF COMMUNICATION
// ------------------------------------------------------
// An AJAX application has 3 steps:
// - Prepare the server-side API call
// - Make the call
// - Process the result

// NEW GUYS
// ------------------------------------------------------
// postMessage functionality created in HTML5,
// allows communication between parent and child windows
// even if the child window is located in another domain.

// There are two other APIs:
// - CORS (Cross Domain Resource Sharing)
// - Web Sockets

// METHODS INCLUDED
// ------------------------------------------------------
// open: initializes a request with params: method ("GET", "POST", "PUT", "DELETE"), url, async (true|false), user/pass.
// setRequestHeader: sets the MIME type of the request.
// send: send the request.
// sendAsBinary: send the request as a binary data.
// abort: aborts an already sent request.
// getResponseHeader: retrieves the header text. Return "null" if there's no response or header.
// getAllResponseHeaders: retrieves the header text for a multipart request.

// IMPORTANT NOTE:
// For instance, if we want to ensure that our client application receives data as XML,
// we can use the following in a PHP application: header("Content-Type: text/xml; charset=utf-8");

// PROPERTIES INCLUDED
// ------------------------------------------------------
// status: the HTTP status of the req/res
// statusText: the response text returned from the server
// readyState: the state of request
// responseText: the text-based response to the request.
// responseXML: the response to the request as an XML-based DOM object.

// IMPORTANT NOTE:
// A major restriction associated with the XMLHttpRequest object is
// the same-origin security restriction. This means that you can’t
// use XMLHttpRequest to make a service request to an API in another domain.

// HTTP REQUESTS TYPES
// ------------------------------------------------------

// GET: retrieve data with params in URL
// POST: create a new data and send params via functions arguments
// PUT: update data and params are sent via functions arguments
// DELETE: remove data and params are sent via function arguments

// READYSTATE PROPERTIES
// ------------------------------------------------------

// 0 | UNINITIALIZED | 'open' has not been called yet
// 1 | LOADING       | 'send' has not been called yet
// 2 | LOADED        | 'send' has been called
// 3 | INTERACTIVE   | response is not completed yet
// 4 | COMPLETED     | request is complete!

// IMPORTANT NOTE:
// Avoid synchronous Ajax calls!!!!!!!!!!



// ------------------------------------------------------
// GENERAL GUIDE
// ------------------------------------------------------

// INSTANCE OF OBJECT XMLHttpRequest
// ------------------------------------------------------

// First, we create a cross-browser function for HTTP Requests
var crossHttp = function() {
    var http;
    if (window.XMLHttpRequest) {
        http = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        http = new ActiveXObject('Microsoft.XMLHTTP');
    }
};

console.log(crossHttp);

// If you don't want to support Internet Explorer 8 and older,
var http = new XMLHttpRequest();


// MAKE AN AJAX CALL (POST and GET methods)
// ------------------------------------------------------

// Use POST request for an update
var url,
    param;

http.open('POST', url, true);
http.setRequestHeader('Content Type', 'application/x-www-form-urlencoded');
http.send(param);

// Use GET for a query
var url = url + '?' + param;
http.open('GET', url, true);
http.send(null);

// CREATING AJAX REQUEST FUNCTIONS (POST and GET methods)
// ------------------------------------------------------

// GET Data form Server
function getRequest(evt) {

    var evt     = evt || window.event,
        param1  = encodeURIComponent(document.getElementById('param1').value),
        param2  = encodeURIComponent(document.getElementById('param2').value),
        params  = 'param1=' + param1 + '&param2=' + param2,
        url     = 'data.php?' + params;

    evt.prevendDefault();
    evt.returnValue = false;

    http.open('GET', url, true);
    http.onreadystatechange = response;
    http.send(null);

}

// POST data on server
function postRequest(evt) {

    var evt     = evt || window.event,
        param1  = encodeURIComponent(document.getElementById('param1').value).replace('/%20/g','+'),
        param2  = encodeURIComponent(document.getElementById('param2').value).replace('/%20/g','+'),
        params  = 'param1=' + param1 + '&param2=' + param2,
        url     = 'data.php';

    http.open('POST', url, true);
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    http.setRequestHeader('Content-length', params.length);
    http.setRequestHeader('Connection', 'close');
    http.onreadystatechange = response;
    http.send(params);

}

// CREATING A CALLBACK FUNCTION (for response)
// ------------------------------------------------------

function response() {

    if (http.readyState === 4 && http.status === 200) {
        document.getElementById('result').innerHTML=http.responseText;
    } else {
        console.log('HTTP status %s', http.statusText);
    }

}



// ------------------------------------------------------
// COMMON PROBLEMS
// ------------------------------------------------------

// CROSS DOMAIN REQUEST (using JSONP)
// ------------------------------------------------------

function addScript(url) {
    var script = document.createElement('script');
    script.type = 'type/javascript';
    script.url = url;
    document.getElementsByTagName('head')[0]appendChild(script);
}

var request = addScript('http://api.flickr.com/services/rest/?method=flickr.photos.search&format=json');

console.log(request);

// CROSS DOMAIN REQUEST (using postMessage)
// ------------------------------------------------------

// Check the "postmessage.html" file.


// POPULATE SELECT LIST
// ------------------------------------------------------

// Check the "populate.php" file.


// REFRESH DATA ON PAGE
// ------------------------------------------------------

// Ajax method: check the "ajax-refresh.html" file.
// WebSocket method: check the "websocket-refresh.html" file.










