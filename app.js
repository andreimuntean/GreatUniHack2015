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
    databaseService.getUsers(function(error, users) {
        if (error) {
            responseHelper.sendResponse(res, null, 500);

            return;
        }

        responseHelper.sendResponse(res, users);
    });
});

app.get('/users/:username', function(req, res) {
    // Gets the specified user.
    var username = req.params.username;

    databaseService.getUser(function(error, user) {
        if (error) {
            responseHelper.sendResponse(res, null, 500);

            return;
        }

        // Determines whether a user with the specified username exists.
        if (!user) {
            responseHelper.sendResponse(res, null, 404);

            return;
        }

        responseHelper.sendResponse(res, user);
    }, username);
});

// @TO-DO: Change to POST and fix security issues.
app.get('/users/:username/:password/:email', function(req, res) {
    // Creates a new user.
    var user = {
        'username': req.params.username,
        'password': req.params.password,
        'email': req.params.email
    };

    databaseService.createUser(function(error) {
        if (error) {
            // A user with this username already exists.
            responseHelper.sendResponse(res, null, 409);

            return;
        }

        responseHelper.sendResponse(res);
    }, user);
});

// @TO-DO: Change to POST and fix security issues.
app.get('/login/:username/:password', function(req, res) {
    // Signs a user in.
    var username = req.params.username;
    var password = req.params.password;

    databaseService.login(function(error, user) {
        if (error) {
            responseHelper.sendResponse(res, null, 500);

            return;
        }

        // Determines whether a user with the specified username and password exists.
        if (!user) {
            responseHelper.sendResponse(res, null, 401);

            return;
        }

        responseHelper.sendResponse(res, { 'token': '' });
    }, username, password);
});

app.post('/logout', function(req, res) {
    // Signs a user out.
    var token = req.body.token;

    databaseService.logout(function(error) {
        responseHelper.sendResponse(res, null, 500);
    }, token);
});

app.get('/dares', function(req, res) {
    // Gets the list of dares.
    databaseService.getDares(function(error, dares) {
        if (error) {
            responseHelper.sendResponse(res, null, 500);

            return;
        }

        responseHelper.sendResponse(res, dares);
    });
});

app.get('/dares/:id', function(req, res) {
    // Gets the specified dare.
    var id = req.params.id;

    databaseService.getDare(function(error, dare) {
        if (error) {
            responseHelper.sendResponse(res, null, 500);

            return;
        }

        responseHelper.sendResponse(res, dare);
    }, id);
});

app.get('/users/:username/received-dares', function(req, res) {
    // Gets the dares received by a specified user.
    var username = req.params.username;

    databaseService.getReceivedDares(function(error, dares) {
        if (error) {
            responseHelper.sendResponse(res, null, 500);

            return;
        }

        responseHelper.sendResponse(res, dares);
    }, username);
});

app.get('/users/:username/sent-dares', function(req, res) {
    // Gets the dares sent by a specified user.
    var username = req.params.username;

    databaseService.getSentDares(function(error, dares) {
        if (error) {
            responseHelper.sendResponse(res, null, 500);

            return;
        }

        responseHelper.sendResponse(res, dares);
    }, username);
});

app.get('/users/:username/active-dares', function(req, res) {
    // Gets the dares related to this user that are active.
    var username = req.params.username;

    databaseService.getActiveDares(function(error, dares) {
        if (error) {
            responseHelper.sendResponse(res, null, 500);

            return;
        }

        responseHelper.sendResponse(res, dares);
    }, username);
});

app.get('/users/:username/pending-dares', function(req, res) {
    // Gets the dares related to this user that are pending.
    var username = req.params.username;

    databaseService.getPendingDares(function(error, dares) {
        if (error) {
            responseHelper.sendResponse(res, null, 500);

            return;
        }

        responseHelper.sendResponse(res, dares);
    }, username);
});

app.get('/users/:username/completed-dares', function(req, res) {
    // Gets the dares related to this user that are completed.
    var username = req.params.username;

    databaseService.getCompletedDares(function(error, dares) {
        if (error) {
            responseHelper.sendResponse(res, null, 500);

            return;
        }

        responseHelper.sendResponse(res, dares);
    }, username);
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

    databaseService.dareUser(function(error) {
        if (error) {
            responseHelper.sendResponse(res, null, 500);

            return;
        }

        responseHelper.sendResponse(res);
    }, userDare);
    
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