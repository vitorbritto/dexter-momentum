'use strict';

var singleton = {
    name: 'Vitor Britto',
    email: 'code@vitorbritto.com.br',
    render: function() {
        return console.log('My name is ' + this.name + ' and my email contact is ' + this.email);
    }
};

singleton.render();
