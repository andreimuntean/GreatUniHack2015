// Instantiates the services and helpers.
var client = require('../helpers/client-helper').getClient();

var getUsers = function(callback) {
    var query = 'select * from Users';

    client.query(query, function(error, result) {
        if (!error) {
            var users = [];

            for (key in result) {
                users.push(result[key]);
            }
        }

        callback(error, users);
    });
};

var getUser = function(callback, username) {
    var query = 'select * from Users where Username ="' + username + '" or Email = "' + username + '"';

    client.query(query, function(error, result) {
        if (!error) {
            var user = result[0];
        }

        callback(error, user);
    });
};

var createUser = function(callback, user) {
    var query = 'insert into Users (Username, Email, Password) VALUES('
        + '"' + user.username + '", "' + user.email + '", "' + user.password + '")';

    client.query(query, function(error, result) {
        callback(error);
    });
};

var login = function(callback, username, password) {
    var query = 'select * from Users where Username ="' + username + '" and Password = "' + password + '"';

    client.query(query, function(error, result) {
        if (!error) {
            var user = result[0];
        }

        callback(error, user);
    });
};

var logout = function(callback, token) {
    callback(null);
};

var getDares = function(callback) {
    var query = 'select * from Dares';

    client.query(query, function(error, result) {
        if (!error) {
            var dares = [];

            for (key in result) {
                dares.push(result[key]);
            }
        }

        callback(error, dares);
    });
};

var getDare = function(callback, id) {
    var query = 'select * from Dares where Id =' + id;

    client.query(query, function(error, result) {
        if (!error) {
            var dare = result[0];
        }

        callback(error, dare);
    });
};

var getReceivedDares = function(callback, username) {
    var query = 'select * from UserDares where ReceiverUsername = "' + username + '"';

    client.query(query, function(error, result) {
        if (!error) {
            var dares = [];

            for (key in result) {
                dares.push(result[key]);
            }
        }

        callback(error, dares);
    });
};

var getSentDares = function(callback, username) {
    var query = 'select * from UserDares where SenderUsername = "' + username + '"';

    client.query(query, function(error, result) {
        if (!error) {
            var dares = [];

            for (key in result) {
                dares.push(result[key]);
            }
        }

        callback(error, dares);
    });
};

var getActiveDares = function(callback, username) {
    var query = 'select * from UserDares where (SenderUsername = "' + username + '" or ReceiverUsername = "' + username + '")'
        + ' and Status = 0';

    client.query(query, function(error, result) {
        if (!error) {
            var dares = [];

            for (key in result) {
                dares.push(result[key]);
            }
        }

        callback(error, dares);
    });
};

var getPendingDares = function(callback, username) {
    var query = 'select * from UserDares where (SenderUsername = "' + username + '" or ReceiverUsername = "' + username + '")'
        + ' and Status = 1';

    client.query(query, function(error, result) {
        if (!error) {
            var dares = [];

            for (key in result) {
                dares.push(result[key]);
            }
        }

        callback(error, dares);
    });
};

var getCompletedDares = function(callback, username) {
    var query = 'select * from UserDares where (SenderUsername = "' + username + '" or ReceiverUsername = "' + username + '")'
        + ' and Status = 2';

    client.query(query, function(error, result) {
        if (!error) {
            var dares = [];

            for (key in result) {
                dares.push(result[key]);
            }
        }

        callback(error, dares);
    });
};

var dareUser = function(callback, userDare) {
    var query = 'insert into UserDare (DareId, SenderUsername, ReceiverEmail, CauseId, Amount) VALUES('
        + userDare.dareId + ', "' + userDare.senderUsername + '", "' + userDare.receiverEmail
        + userDare.causeId + ', ' + userDare.amount + ')';

    client.query(query, function(error, result) {
        callback(error);
    });
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