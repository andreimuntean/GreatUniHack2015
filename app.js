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
    try {
        var users = databaseService.getUsers();
        
        res.json(users);

    } catch (error) {
        res.status(error.message);
    }
});

app.get('/users/:username', function(req, res) {
    // Gets the specified user.
    var username = req.params.username;

    try {
        var user = databaseService.getUser(username);

        res.json(user);
    } catch (error) {
        res.status(error.message);
    }
});

// @TO-DO: Change to POST and fix security issues.
app.get('/users/:username/:password/:email', function(req, res) {
    // Creates a new user.
    var user = {
        "username": req.params.username,
        "password": req.params.password,
        "email": req.params.email
    };

    try {
        databaseService.createUser(user);
    } catch (error) {
        res.status(error.message);
    }
});

// @TO-DO: Change to POST and fix security issues.
app.get('/login/:username/:password', function(req, res) {
    // Signs a user in.
    var username = req.params.username;
    var password = req.params.password;

    try {
        databaseService.login(username, password);
    } catch (error) {
        res.status(error.message);
    }
});

app.post('/logout', function(req, res) {
    // Signs a user out.
    var token = req.body.token;

    try {
        databaseService.logout(token);
        res.end('OK');
    } catch (error) {
        res.status(error.message);
        res.end('Error');
    }
});

app.get('/dares', function(req, res) {
    // Gets the list of dares.
    try {
        var dares = databaseService.getDares();

        res.json(dares);
    } catch (error) {
        res.status(error.message);
    }
});

app.get('/dares/:id', function(req, res) {
    // Gets the specified dare.
    var id = req.params.id;

    try {
        var dare = databaseService.getDare(id);

        res.json(dare);
    } catch (error) {
        res.status(error.message);
    }
});

app.get('/users/:username/received-dares', function(req, res) {
    // Gets the dares received by a specified user.
    var username = req.params.username;

    try {
        var receivedDares = databaseService.getReceivedDares(username);

        res.json(receivedDares);
    } catch (error) {
        res.status(error.message);
    }
});

app.get('/users/:username/sent-dares', function(req, res) {
    // Gets the dares sent by a specified user.
    var username = req.params.username;

    try {
        var sentDares = databaseService.getSentDares(username);

        res.json(sentDares);
    } catch (error) {
        res.status(error.message);
    }
});

app.get('/users/:receiverUsername/:dareId/:senderUsername/:causeId/:amount', function(req, res) {
    // Dares a user.
    var userDare = {
        "dareId": req.params.dareId,
        "senderUsername": req.params.senderUsername,
        "receiverUsername": req.params.receiverUsername,
        "causeId": req.params.causeId,
        "amount": req.params.amount
    };

    try {
        databaseService.dareUser(userDare);
    } catch (error) {
        res.status(error.message);
    }
});

// Starts the server.
app.listen(process.env.PORT || 1234);