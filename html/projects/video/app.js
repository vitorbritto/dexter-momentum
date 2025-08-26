'use strict';

document.addEventListener('DOMContentLoaded', function(event) {

    var $button = document.querySelectorAll('.btn'),
        $video  = document.getElementById('video');

    Array.prototype.forEach.call($button, function(el, i){
        if ($button[i].nodeType == 1) {
            $button[i].addEventListener('click', function(event) {
                $video.pause();
                console.log('Clicked!');
            });
            $button[i].addEventListener('mouseover', function(){
                $this.addClass('animate bounce');
                console.log('Hovered!');
            });
        }
    });

    console.log('DOM fully loaded and parsed');

});
