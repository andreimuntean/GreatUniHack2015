var mysql = require('mysql');

// Instantiates the services and helpers.
var responseHelper = require('../helpers/response-helper');

// Connects to the database.
var connection = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
});

var getUsers = function(res) {
    var query = 'select * from Users';

    connection.query(query, function(error, result) {
        if (error) {
            responseHelper.sendResponse(res, null, 500);

            return;
        }

        var users = [];

        for (user in result) {
            users.add(user);
        }

        responseHelper.sendResponse(res, users);
    });
};

var getUser = function(res, username) {
    var query = 'select * from Users where Username ="' + username + '"';

    connection.query(query, function(error, result) {
        if (error) {
            responseHelper.sendResponse(res, null, 500);

            return;
        }

        // Determines whether a user with the specified username exists.
        if (result.length == 0) {
            responseHelper.sendResponse(res, null, 404);

            return;
        }

        var user = result[0];

        responseHelper.sendResponse(res, user);
    });
};

var createUser = function(responseHandler, errorHandler, user) {
    // Determines whether the user already exists.
    if (getUser(user.username)) {
        throw new Error('409');
    }

    try {
        // ...
    } catch (error) {
        throw new Error('400');
    }
};

var login = function(res, username, password) {
    var query = 'select * from Users where Username ="' + username + '" and Password = "' + password + '"';

    connection.query(query, function(error, result) {
        if (error) {
            sendResponse(res, null, 500);

            return;
        }

        // Determines whether a user with the specified username and password exists.
        if (result.length == 0) {
            sendResponse(res, null, 401);

            return;
        }

        var user = result[0];

        sendResponse(res, { 'token': '' });
    });
};

var logout = function(res, token) {
    // @TO-DO: Implement the method.
    responseHelper.sendResponse(res, null, 500);
};

var getDares = function() {
    return [];
};

var getDare = function(id) {
    return {};
};

var getReceivedDares = function(username) {
    return [];
};

var getSentDares = function(username) {
    return [];
};

var dareUser = function(userDare) {
    try {
        // ...
    } catch (error) {
        throw new Error('400');
    }
}

module.exports = {
    getUsers: getUsers,
    getUser: getUser,
    createUser: createUser,
    login: login,
    logout: logout,
    getDares: getDares,
    getDare: getDare,
    getReceivedDares: getReceivedDares,
    getSentDares: getSentDares,
    dareUser: dareUser
};