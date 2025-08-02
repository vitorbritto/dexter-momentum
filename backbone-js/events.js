// ------------------------------------------------------
// EVENTS
// ------------------------------------------------------

'use strict';

var object = object || {};

_.extend(object, Backbone.Events);

object.on('alert', function(msg) {
    alert('Triggered ' + msg);
});

object.trigger('alert', 'an event');

book.on({
    'change:title'  : titleView.update,
    'change:author' : authorPane.update,
    'destroy'       : bookView.remove
});

// Removes just the `onChange` callback.
object.off('change', onChange);

// Removes all 'change' callbacks.
object.off('change');

// Removes the `onChange` callback for all events.
object.off(null, onChange);

// Removes all callbacks for `context` for all events.
object.off(null, null, context);

// Removes all callbacks on `object`.
object.off();

