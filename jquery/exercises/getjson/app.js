'use strict';

$(function() {

    function callback(data) {

        var items = [];
        $.each(data, function(key, val) {
            items.push('<li data-m3-value="' + val + '" class="moveis-item"> <input type="checkbox" name="selected-item" /> ' + key + '</li>');
        });

        $('<ul/>', { 'class': 'moveis-list', html: items.join('') }).appendTo('.moveis');
    }

    $.getJSON('items.json', callback);

});
