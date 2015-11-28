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

app.get('/users', function(req, res) {
    // Gets the list of users.
    var users = [];

    res.json(users);
});

app.get('/users/:username', function(req, res) {
    // Gets the specified user.
    var username = req.params.username;
    var user = { 'Username': username };

    res.json(user);
});

app.post('/users', function(req, res) {
    // Creates a new user.
    var user = req.body;

    res.end("OK");
});

app.post('/login', function(req, res) {
    // Signs a user in.
    var loginCredentials = req.body;

    res.end("OK");
});

app.get('/dares', function(req, res) {
    // Gets the list of dares.
    var dares = [];

    res.json(dares);
});

app.get('/dares/:id', function(req, res) {
    // Gets the specified dare.
    var id = req.params.id;
    var dare = {};

    res.json(dare);
});

app.get('/users/:username/received-dares', function(req, res) {
    // Gets the dares received by a specified user.
    var username = req.params.username;
    var receivedDares = [];

    res.json(receivedDares);
});

app.get('/users/:username/sent-dares', function(req, res) {
    // Gets the dares sent by a specified user.
    var username = req.params.username;
    var sentDares = [];

    res.json(sentDares);
});

// Starts the server.
app.listen(process.env.PORT || 1234);