var mysql = require('mysql');

// Connects to the database.
var connection = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
});

var getUsers = function(responseHandler, errorHandler) {
    connection.query('select * from Users', function(error, result) {
        if (error) {
            errorHandler(error);

            return;
        }

        var users = [];

        for (user in result) {
            users.add(user);
        }

        responseHandler(users);
    });
};

var getUser = function(username) {
    return {};
};

var createUser = function(user) {
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

var login = function(username, password) {
    // Determines whether the login details are wrong.
    throw new Error('401');

    // If login failed.
    throw new Error('400');

    return 'token';
};

var logout = function(token) {
    try {
        // ...
    } catch (error) {
        throw new Error('400');
    }
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