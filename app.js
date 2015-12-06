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

app.get('/users/:email', function(req, res) {
    // Gets the specified user.
    var email = req.params.email;

    databaseService.getUser(function(error, user) {
        if (error) {
            responseHelper.sendResponse(res, null, 500);

            return;
        }

        // Determines whether a user with the specified email exists.
        if (!user) {
            responseHelper.sendResponse(res, null, 404);

            return;
        }

        responseHelper.sendResponse(res, user);
    }, email);
});

// @TO-DO: Change to POST and fix security issues.
app.get('/users/:email/:password', function(req, res) {
    // Creates a new user.
    var user = {
        'email': req.params.email,
        'password': req.params.password
    };

    databaseService.createUser(function(error) {
        if (error) {
            // A user with this email already exists.
            responseHelper.sendResponse(res, null, 409);

            return;
        }

        responseHelper.sendResponse(res);
    }, user);
});

// @TO-DO: Change to POST and fix security issues.
app.get('/login/:email/:password', function(req, res) {
    // Signs a user in.
    var email = req.params.email;
    var password = req.params.password;

    databaseService.login(function(error, user) {
        if (error) {
            responseHelper.sendResponse(res, null, 500);

            return;
        }

        // Determines whether a user with the specified email and password exists.
        if (!user) {
            responseHelper.sendResponse(res, null, 401);

            return;
        }

        responseHelper.sendResponse(res, { 'token': '' });
    }, email, password);
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

app.get('/received-dares/:email', function(req, res) {
    // Gets the dares received by a specified user.
    var email = req.params.email;

    databaseService.getReceivedDares(function(error, dares) {
        if (error) {
            responseHelper.sendResponse(res, null, 500);

            return;
        }

        responseHelper.sendResponse(res, dares);
    }, email);
});

app.get('/sent-dares/:email', function(req, res) {
    // Gets the dares sent by a specified user.
    var email = req.params.email;

    databaseService.getSentDares(function(error, dares) {
        if (error) {
            responseHelper.sendResponse(res, null, 500);

            return;
        }

        responseHelper.sendResponse(res, dares);
    }, email);
});

app.get('/active-dares/:email', function(req, res) {
    // Gets the dares related to this user that are active.
    var email = req.params.email;

    databaseService.getActiveDares(function(error, dares) {
        if (error) {
            responseHelper.sendResponse(res, null, 500);

            return;
        }

        responseHelper.sendResponse(res, dares);
    }, email);
});

app.get('/pending-dares/:email', function(req, res) {
    // Gets the dares related to this user that are pending.
    var email = req.params.email;

    databaseService.getPendingDares(function(error, dares) {
        if (error) {
            responseHelper.sendResponse(res, null, 500);

            return;
        }

        responseHelper.sendResponse(res, dares);
    }, email);
});

app.get('/completed-dares/:email', function(req, res) {
    // Gets the dares related to this user that are completed.
    var email = req.params.email;

    databaseService.getCompletedDares(function(error, dares) {
        if (error) {
            responseHelper.sendResponse(res, null, 500);

            return;
        }

        responseHelper.sendResponse(res, dares);
    }, email);
});

app.get('/users/:receiverEmail/:dareId/:senderEmail/:causeId/:amount', function(req, res) {
    // Dares a user.
    var userDare = {
        'dareId': req.params.dareId,
        'senderEmail': req.params.senderEmail,
        'receiverEmail': req.params.receiverEmail,
        'causeId': req.params.causeId,
        'amount': req.params.amount
    };

    databaseService.dareUser(function(error) {
        if (error) {
            responseHelper.sendResponse(res, null, 500);

            return;
        }

        // Sends an email to the challengee.
        contactService.sendEmail(userDare.receiverEmail, 'You have been challenged!',
            'Someone has just challenged you! Log into http://hi-dare.com/ to see your challenges.');

        responseHelper.sendResponse(res);
    }, userDare);
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