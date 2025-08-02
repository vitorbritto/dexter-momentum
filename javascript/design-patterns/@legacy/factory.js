'use strict';

function Factory(attrs) {
    for (var name in attrs) {
        this[name] = attrs[name];
    }
}

Factory.build = function(attrs) {
    return new Factory(attrs);
};

var factory = Factory.build({
    name: 'Vitor Britto',
    email: 'code@vitorbritto.com.br',
    render: function() {
        return console.log('My name is ' + this.name + ' and my email contact is ' + this.email);
    }
});

factory.render();
