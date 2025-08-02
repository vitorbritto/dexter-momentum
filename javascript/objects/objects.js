'use strict';

// ------------------------------------------------------
// TABLE OF CONTENTS
// ------------------------------------------------------
// 1 - GENERAL NOTES
// 2 - STEP BY STEP
// 3 - GENERAL GUIDE
// 4 - COMMON PROBLEMS
// ------------------------------------------------------


// ------------------------------------------------------
// GENERAL NOTES
// ------------------------------------------------------

// Everything in JavaScript it's an object, except
// by 'null' and 'undefined'. Don't forget that!

// Objects are a sweet way to encapsulate and ensure the reuse
// of your code along a web application.

// JavaScript is not based on classes and instances, is based
// on prototypal inheritance. That means you can create new
// instances of existing objects, rather then instances of classes.

// This extensibility happens by enhancing an existing objet with
// new properties and methods.

// ------------------------------------------------------
// STEP BY STEP
// ------------------------------------------------------

// OBJECT
// ------------------------------------------------------

// First, let's create an object.

// CREATING OBJECTS
// ------------------------------------------------------

// Using the literal way
var obj = {};

// Or the constructor way
function Obj() {}
var obj = new Obj();
console.log(obj);

// The new object inherits from Object.prototype and doesn't have
// own properties defined.

// We create a new empty object
var emptyObject = {};

// Also, we create a new object with 'bar' property and value 'baz'
var foo = {
    bar: 'baz'
};

// ACCESSING PROPERTIES
// ------------------------------------------------------

// So, how can we ACCESS their properties?
// We can access in two ways, with dot notation or square bracket notation

foo.bar; // 'baz'
foo['bar']; // 'baz'

// The notations work almost identically, with the only difference being
// that the square bracket notation allows for dynamic setting of properties
// and the use of property names that would otherwise lead to a syntax error.

// DELETING PROPERTIES
// ------------------------------------------------------

// The right way to remove a property from an object is using the "delete" operator.
// If you set a property to "undefined" or "null", it'll only be removed the value
// associated to this property, but not the key.

var obj = {
    bar: 1,
    foo: 2,
    baz: 3
};

obj.bar = undefined;
obj.foo = null;
delete obj.baz;

for(var i in obj) {
    if (obj.hasOwnProperty(i)) {
        console.log(i, '' + obj[i]);
    }
}

// Return:
// "bar" "undefined"
// "foo" "null"
// baz was successfully removed

// PROTOTYPE
// ------------------------------------------------------

// JavaScript does not have the classical inheritance model,
// it uses a prototypal model.

function Foo() {}
Foo.prototype.bar = 'Hello World';
Foo.prototype.baz = function() {
    return this.bar + '!!';
};
var test = new Foo();

console.log(test);
console.log(test.baz());


// ------------------------------------------------------
// GENERAL GUIDE
// ------------------------------------------------------

// Built-In Objects
// ------------------------------------------------------

console.log(Object);
console.log(Function);
console.log(Array);
console.log(String);
console.log(Boolean);
console.log(Number);
console.log(Math);
console.log(Date);
console.log(RegExp);
console.log(Error);
console.log(JSON);


// Literal Objects
// ------------------------------------------------------

var showDate = function(num) {
    return new Date(num, 0, 1);
};

// Object literal
var javascript = {
    influences: ['Self', 'Scheme', 'Java'],
    developer: 'Brendan Eich',
    created: showDate(1995)
};

var c = {
    influences: ['B', 'ALGOL'],
    developer: 'Dennis Ritchie',
    created: showDate(1972)
};

console.log(javascript);
console.log(c);


// ES5 - Objects
// ------------------------------------------------------

// Objects
var animal = {
    breathe: function() {
        return console.log('breathing!');
    },
    walk: function() {
        return console.log('walking!');
    },
    run: function() {
        return console.log('running!');
    },
    sleep: function() {
        return console.log('slepping!');
    },
    wakeup: function() {
        return console.log('waking!');
    }
};

var dog = Object.create(animal, {
    bark: {
        value: function() {
            return console.log('au au!!!');
        }
    }
});

var cat = Object.create(animal, {
    meow: {
        value: function() {
            return console.log('meow!!!');
        }
    }
});

// Properties
Object.defineProperty(dog, 'bite', {
    value: function() {
        return console.log('biting!!!');
    },
    writable: false,
    enumerable: false,
    configurable: false

});

Object.defineProperty(cat, 'scratch', {
    value: function() {
        return console.log('scrathing!!!');
    }
});

Object.defineProperty(Object.getPrototypeOf(dog), 'eat', {
    value: function() {
        return console.log('eating!!!');
    }
});

dog.breathe();
dog.bark();
dog.bite();

cat.wakeup();
cat.meow();
cat.scratch();


// Others
var car = car || {};

car.model = 'Ethios';
car.fabric = 'Toyota';
car.hasOwnProperty('model');

console.log(car);


// ------------------------------------------------------
// COMMON PROBLEMS
// ------------------------------------------------------


// CREATE AN OBJECT AND EXTENDS IT
// ------------------------------------------------------

// First, we create the object using a constructor function
function Playlist(artistName, titleName) {
    var title  = titleName,
        artist = artistName;
    this.show = function() {
        return console.log('Now playing: ' + artist + ' - ' + title);
    };
}

// We extend the object with prototype property for the band/artist genre
// Note: We are creating a new method for the "Playlist" object
Playlist.prototype.genre = function(genreName) {
    this.genre = genreName;
};

// We extend the object with prototype property again. Now for the track number
// Note: We are creating another method for the "Playlist" object
Playlist.prototype.track = function(trackNumber) {
    this.track = trackNumber;
};

// The NEW keyword is used to create a new "Playlist" instance
var playing = new Playlist('Hatebreed', 'This Is Now');

// Call the show() method in "Playlist" object
playing.show();

// Add the genre and track number
playing.genre('Metal Core');
playing.track('#09');

// Render with console object
console.log('Genre: ' + playing.genre);
console.log('Track: ' + playing.track);


// ADDING GETTER AND SETTER
// ------------------------------------------------------

function Playlist() {

    var artist,
        song;

    this.__defineGetter__('artist', function() {
        return artist;
    });
    this.__defineSetter__('artist', function(val) {
        artist =  'By: ' + val;
    });
    this.__defineGetter__('song', function() {
        return song;
    });
    this.__defineSetter__('song', function(val) {
        song =  'Song: ' + val;
    });

}

var playing = new Playlist();

playing.artist = 'Hatebreed';
playing.song   = 'This Is Now';

console.log(playing.artist + ' | ' + playing.song);


// OBJECT INHERITANCE
// ------------------------------------------------------

// PROTOTYPE
function Task(title, time) {

    this.title = title;
    this.time = time;

    this.render = function() {
        return console.log('Task: ' + this.title + ' | Time: ' + this.time);
    };

}

function Category(title, time, category) {

    this.category = category;

    this.show = function() {
        return console.log('Added in category: ' + this.category);
    };

    Task.apply(this,arguments);

    this.info = function() {
        return console.log(this.render() + ' ' + this.show());
    };

}

Category.prototype = new Task();

var task = new Category('Test task', '25 minutes', 'Work');
console.log(task.info());


// CLASSICAL
function Task(title, time) {
    this.title = title;
    this.time = time;
}

Task.prototype.render = function(title, time) {
    this.title = title;
    this.time = time;
    return console.log('Task: ' + this.title + ' | Time: ' + this.time);
};

function SubTask() {
    Task.call(this);
}

SubTask.prototype = Object.create(Task.prototype);
SubTask.prototype.constructor = SubTask;

var st = new SubTask();

console.log(st instanceof SubTask);
console.log(st instanceof Task);

st.render('Reply E-mails', '25 minutes');


// LITERAL
var myObject = {

    fooMethod: function() {
        console.log('Foo Returned!');
        return this;
    },
    barMethod: function() {
        console.log('Bar Returned!');
        return this;
    },
    bazMethod: function() {
        console.log('Baz Returned!');
        return this;
    }

};

// FUNCTIONAL
var myObject = function() {

    this.foo = function() {
        console.log('Foo Returned!');
        return this;
    };
    this.bar = function() {
        console.log('Bar Returned!');
        return this;
    };
    this.baz = function() {
        console.log('Baz Returned!');
        return this;
    };

};

var obj = new myObject();



// CHANING METHOD/CONSTRUCTOR
// ------------------------------------------------------

function Book(title, author) {

    var title   = title,
        author  = author;

    this.getTitle = function() {
        return 'Title: ' + title;
    };

    this.getAuthor = function() {
        return 'Author: ' + author;
    };

}

function TechBook(title, author, category) {

    var category = category;

    this.getCategory = function() {
        return 'Category: ' + category;
    };

    Book.apply(this, arguments);

    this.getBook = function() {
        var arr = [this.getTitle(), this.getAuthor(), this.getCategory()].join('\n');
        return arr;
    };

}

TechBook.prototype = new Book();

var book = new TechBook('JavaScript Functional', 'John Doe', 'JavaScript');

console.log(book.getBook());

var renderTitle    = book.getTitle(),
    renderAuthor   = book.getAuthor(),
    renderCategory = book.getCategory();

console.log(renderTitle, renderAuthor, renderCategory);


// ENUMERATE OBJECT'S PROPERTIES
// ------------------------------------------------------

function Tools(title, author) {
    var title = title,
        author = author;

    this.getTitle = function() {
        return 'Title: ' + title;
    };

    this.getAuthor = function() {
        return 'Author: ' + author;
    };
}

function DevTools(title, author, category) {
    var category = category;

    this.getCategory = function() {
        return 'Category: ' + category;
    };

    Tools.apply(this, arguments);

    this.getTool = function() {
        return this.getTitle() + ' ' + this.getAuthor() + ' ' + this.getCategory();
    };
}

DevTools.prototype = Object.create(Tools);

var newTool = new DevTools('Grunt', 'Bem Alman', 'Automation'),
    str     = '';

for (var prop in newTool) {
    if (newTool.hasOwnProperty(prop)) {
        str = (Object.keys(newTool).join('\n'));
    }
}

console.log(str);
console.log(newTool.getTool());



// PREVENT OBJECT EXTENSIBILITY
// ------------------------------------------------------

'use strict';

var Test = {
    val1: 'one',
    val2: function() {
        return this.val1;
    }
};

try {
    Object.preventExtensions(Test);
} catch(e) {
    console.log(e);
}


// SEAL THE OBJECT
// ------------------------------------------------------

'use strict';

var JavaScript = {
    prop1: 'I Love',
    prop2: function() {
        return this. prop1;
    }
};

try {

    // Seal the "JavaScript" object
    Object.seal(JavaScript);

    // property changed - will succeed
    JavaScript.prop2 = 'javascript';

    // new property - will fail
    JavaScript.prop3 = '!!';

    // instance
    var str = [
        JavaScript.prop1,
        JavaScript.prop2,
        JavaScript.prop3
    ].join(' ');

    // output
    console.log(str);

} catch (e) {
    console.log(e);
}


// NAMESPACE
// ------------------------------------------------------

var APP = APP || {};

APP.Modal = function() {
    return console.log('Modal component was successfully initialized!');
};

APP.Accordion = function() {
    return console.log('Accordion component was successfully initialized!');
};

APP.Navigation = function() {
    return console.log('Navigation component was successfully initialized!');
};

APP.Modal();
APP.Accordion();
APP.Navigation();


// METHOD CHAINING
// ------------------------------------------------------

function Book() {
    var title  = title,
        author = author;
    this.getTitle = function(title) {
        console.log('Title: ' + title);
        return this;
    };
    this.getAuthor = function(author) {
        console.log('Author: ' + author);
        return this;
    };
    this.replaceTitle = function(newTitle) {
        var oldTitle = title,
            title = newTitle;
        console.log('Title: ' + title);
        return this;
    };
    this.replaceAuthor = function(newAuthor) {
        var oldAuthor = author,
            author = newAuthor;
        console.log('Author: ' + author);
        return this;
    };
}

var book = new Book();
console.log(book);

book
    .getTitle('JavaScript 1')
    .getAuthor('John Doe 1');

book
    .replaceTitle('JavaScript 2')
    .replaceAuthor('John Doe 2');
