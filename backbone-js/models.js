// ------------------------------------------------------
// MODELS
// ------------------------------------------------------

// Note: based on backbone.org website

// Extend
var Note = Backbone.Model.extend({});
var PrivateNote = Note.extend({});

// Initialize
new Note({
    title: 'Foo Bar Baz',
    author: 'John Doe',
    content: '<script>alert(\'some content here\')</script>'
});

// Constructor
var Library = Backbone.Model.extend({
    constructor: function() {
        this.books = new Books();
        Backbone.Model.apply(this, arguments);
    },
    parse: function(data, options) {
        this.books.reset(data.books);
        return data.library;
    }
});

// get
note.get('title');

//set
note.set({title: 'Foo Bar Baz', author: 'John Doe'});
note.set('title', 'John Doe');

//escape
alert(note.escape('content'));

// has
if (note.has('title')) {
    // do something
}

// unset
note.unset('title');

// clear
note.clear();

// id
note.id();

// idAttribute
var Meal = Backbone.Model.extend({
    idAttribute: '_id'
});

var cake = new Meal({ _id: 1, name: 'Cake' });
window.alert('Cake id: ' + cake.id);

// Defaults
var Meal = Backbone.Model.extend({

    defaults: {
        'appetizer':  'caesar salad',
        'entree':     'ravioli',
        'dessert':    'cheesecake'
    }

});

// toJSON
var artist = new Backbone.Model({
    firstName: 'Wassily',
    lastName: 'Kandinsky'
});

artist.set({birthday: 'December 16, 1866'});

window.alert(JSON.stringify(artist));

// sync
note.sync();

// fetch
setInterval(function() {
  channel.fetch();
}, 10000);

// save
note.save();

// destroy
book.destroy({ success: function(model, response) {
    // something goes here
});

// Sync + Save
Backbone.sync = function(method, model) {
    alert(method + ': ' + JSON.stringify(model));
    model.set('id', 1);
};

var book = new Backbone.Model({
    title: 'The Rough Riders',
    author: 'Theodore Roosevelt'
});

book.save();

book.save({author: 'Teddy'});


// validate
var Chapter = backbone.Model.extend({

    validate: function(attrs, opts) {
        if (attrs.end < attrs.start) {
            return 'can\'t end before it starts';
        }
    }

});

var one = new Chapter({
    title: 'Chapter One: The Beginning'
});

one.on('invalid', function(model, error) {
    alert(model.get('title') + ' ' + error);
});

one.save({
    start: 15,
    end: 10
});

// validation error
if (!one.isValid()) {
    alert(one.get('title') + ' ' + one.validationError);
}


// urlRoot
var System = Backbone.Model.extend({urlRoot : '/system'}),
    solaris = new System({id: 'solaris'}),
    linux   = new System({id: 'linux'}),
    darwin  = new System({id: 'darwin'}),
    freebsd = new System({id: 'freebsd'});

window.alert([solaris.url(),linux.url(),darwin.url(),freebsd.url()].join('\n'));










