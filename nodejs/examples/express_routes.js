// Routes template
var routes = require('./routes');
var guide = require('./routes/guide');
var contact = require('./routes/contact');
var client = require('./routes/client');
var events = require('./routes/events');
 
app.get('/', routes.index);
app.get('/guide', guide.index);
app.get('/contact', contact.index);
app.get(/\/client\/(\d*)\/?(edit)?/, client.index);
app.get(/\/events\/(\d*)\/?(edit)?/, events.index);
