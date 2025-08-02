'use strict';

// ------------------------------------------------------
// TABLE OF CONTENTS
// ------------------------------------------------------
// 1 - GENERAL NOTES
// 2 - GENERAL GUIDE
// 3 - STEP BY STEP
// 4 - COMMON PROBLEMS
// ------------------------------------------------------


// ------------------------------------------------------
// GENERAL NOTES
// ------------------------------------------------------



// ------------------------------------------------------
// GENERAL GUIDE
// ------------------------------------------------------

// GLOBAL HANDLERS
// ------------------------------------------------------

// Ajax Stop
$(document).ajaxStop((function() {
    /* stuff to do when all AJAX calls have completed */;
});

// Ajax Send
$(document).ajaxSend(function(event, xhr, settings) {
    /* stuff to do before an AJAX request is sent */;
});

// Ajax Error
$(document).ajaxError(function(event, xhr, settings, thrownError) {
    /* Stuff to do when an AJAX call returns an error */;
});

// Ajax Start
$(document).ajaxStart(function() {
    /* Stuff to do when an AJAX call is started and no other AJAX calls are in progress */;
});

// Ajax Success
$(document).ajaxSuccess(function(event, xhr, settings) {
    /* executes whenever an AJAX request completes successfully */
});

// Ajax Complete
$(document).ajaxComplete(function(event, xhr, settings) {
    /* executes whenever an AJAX request completes */
});

// LOW-LEVEL INTERFACE
// ------------------------------------------------------

$.ajax({
    url: '/path/to/file',
    type: 'default GET (Other values: POST)',
    dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
    data: {param1: 'value1'},
})
.done(function() {
    console.log("success");
})
.fail(function() {
    console.log("error");
})
.always(function() {
    console.log("complete");
});


// SHORTHAND METHODS
// ------------------------------------------------------

// INITIAL CONFIGURATION
var $file = '/path/to/file';

var $data = {
    param1: "value1",
    param2: "value2"
};

var fnCallback = function(type, status, xhr) {
    /* Stuff to do after the page is loaded */
};

// LOAD
$('selector').load($file, $data, fnCallback);

// GETJSON
$.getJSON($file, $data, fnCallback);

// GETSCRIPT
$.getScript($file, $data, fnCallback);

// GET
$.get($file, $data, fnCallback);

// POST
$.post($file, $data, fnCallback);


// HELPERS FUNCTIONS
// ------------------------------------------------------

jQuery.param();
jQuery.serialize();
jQuery.serializeArray();



// ------------------------------------------------------
// STEP BY STEP
// ------------------------------------------------------


// Low-Level Interface XHR
var $ajaxPath   = '/path/to/file',
    $methodType = 'GET',
    $dataType   = 'json',
    $dataObject = {param1: 'value1'};

var responseStatus = {
    done: function() {
        console.log('Request Success!');
    },
    fail: function() {
        console.log('Request Fail!');
    },
    always: function() {
        console.log('Request Complete!');
    }
};

var responseCode = {
    404: function() {
        console.log('404 - Not Found!');
    },
    500: function() {
        console.log('500 - Server Not responding!');
    }
    503: function() {
        console.log('Server cannot deal with this information!');
    }
};

$.ajax({
    url:        $ajaxPath,
    type:       $methodType,
    dataType:   $dataType,
    data:       $dataObject
})
.done(responseStatus.done)
.fail(responseStatus.fail)
.always(responseStatus.always)
.statusCode: responseCode;


// ------------------------------------------------------
// COMMON PROBLEMS
// ------------------------------------------------------

// Request JSON from Server
$.getJSON('files/test.json', function(data) {
    var items = [];
    $.each(data, function(key, val) {
        items.push('<li id=\'' + key + '\'>' + val + '</li>');
    });

    $('<ul/>', {
        'class': 'my-new-list',
        html: items.join("")
    })
    .appendTo('body');
});
