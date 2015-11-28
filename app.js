var app = require('express')();
var bodyParser = require('body-parser');

// For parsing JSON data.
app.use(bodyParser.json());

// Sets the directory of this file as the root.
app.locals.basedir = __dirname;

// Makes json objects prettier.
app.set('json spaces', 4);

// Instantiates the services.
var databaseService = require('./services/database-service');

app.get('/', function(req, res) {
    res.send('Hello World!');
});

app.get('/:testValue', function(req, res) {
    var testValue = req.params.testValue;

    res.json({ 'Message': testValue });
});

app.post('/:testValue', function(req, res) {
    var testValue = req.params.testValue;
    var body = req.body;

    res.end("OK");
});

// Starts the server.
app.listen(process.env.PORT || 1234);