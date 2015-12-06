var app = require('express')();
var bodyParser = require('body-parser');

// For parsing JSON data.
app.use(bodyParser.json());

// Sets the directory of this file as the root.
app.locals.basedir = __dirname;

// Makes json objects prettier.
app.set('json spaces', 4);

// Instantiates the services and helpers.
var contactService = require('./services/contact-service');
var databaseService = require('./services/database-service');
var justGivingService = require('./services/just-giving-service');
var responseHelper = require('./helpers/response-helper');

app.get('/users', function(req, res) {
    databaseService.getUsers(res);
});

app.get('/users/:username', function(req, res) {
    // Gets the specified user.
    var username = req.params.username;

    databaseService.getUser(res, username);
});

// @TO-DO: Change to POST and fix security issues.
app.get('/users/:username/:password/:email', function(req, res) {
    // Creates a new user.
    var user = {
        'username': req.params.username,
        'password': req.params.password,
        'email': req.params.email
    };

    databaseService.createUser(res, user);
});

// @TO-DO: Change to POST and fix security issues.
app.get('/login/:username/:password', function(req, res) {
    // Signs a user in.
    var username = req.params.username;
    var password = req.params.password;

    databaseService.login(res, username, password);
});

app.post('/logout', function(req, res) {
    // Signs a user out.
    var token = req.body.token;

    databaseService.logout(res, token);
});

app.get('/dares', function(req, res) {
    // Gets the list of dares.
    databaseService.getDares(res);
});

app.get('/dares/:id', function(req, res) {
    // Gets the specified dare.
    var id = req.params.id;

    databaseService.getDare(res, id);
});

app.get('/users/:username/received-dares', function(req, res) {
    // Gets the dares received by a specified user.
    var username = req.params.username;

    databaseService.getReceivedDares(res, username);
});

app.get('/users/:username/sent-dares', function(req, res) {
    // Gets the dares sent by a specified user.
    var username = req.params.username;

    databaseService.getSentDares(res, username);
});

app.get('/users/:receiverEmail/:dareId/:senderUsername/:causeId/:amount', function(req, res) {
    // Dares a user.
    var userDare = {
        'dareId': req.params.dareId,
        'senderUsername': req.params.senderUsername,
        'receiverEmail': req.params.receiverEmail,
        'causeId': req.params.causeId,
        'amount': req.params.amount
    };

    databaseService.dareUser(res, userDare);
    
    /* // Gets the challenger and challengee.
    var sender = databaseService.getUser(senderUsername);
    var receiver = databaseService.getUser(receiverUsername);

    // Sends an email to the challengee.
    contactService.sendEmail(receiver.email, 'You have been challenged!',
        'You have just been challenged by ' + sender.username + '!'
        + ' Log into http://hi-dare.com/ to see your challenges.');*/
});

app.get('/causes', function(req, res) {
    // Gets the causes.
    justGivingService.getCauses(res);
});

app.get('/causes/:id', function(req, res) {
    // Gets the specified cause.
    justGivingService.getCause(res, id);
});

// Starts the server.
app.listen(process.env.PORT || 1234);