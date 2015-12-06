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

var getUser = function(callback, email) {
    var query = 'select * from Users where Email ="' + email + '"';

    client.query(query, function(error, result) {
        if (!error) {
            var user = result[0];
        }

        callback(error, user);
    });
};

var createUser = function(callback, user) {
    var query = 'insert into Users (Email, Password) VALUES('
        + '"' + user.email + '", "' + user.password + '")';

    client.query(query, function(error, result) {
        callback(error);
    });
};

var login = function(callback, email, password) {
    var query = 'select * from Users where Email ="' + email + '" and Password = "' + password + '"';

    client.query(query, function(error, result) {
        if (!error) {
            var user = result[0];
        }

        callback(error, user);
    });
};

var logout = function(callback, token) {
    var query = 'update Users set Token = "" where Token ="' + token + '"';

    client.query(query, function(error, result) {
        callback(error);
    });
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

var getReceivedDares = function(callback, email) {
    var query = 'select * from UserDares join Dares on UserDares.DareId = Dares.Id where ReceiverEmail = "' + email + '"';

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

var getSentDares = function(callback, email) {
    var query = 'select * from UserDares join Dares on UserDares.DareId = Dares.Id where SenderEmail = "' + email + '"';

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

var getActiveDares = function(callback, email) {
    var query = 'select * from UserDares join Dares on UserDares.DareId = Dares.Id where (SenderEmail = "' + email + '" or ReceiverEmail = "' + email + '")'
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

var getPendingDares = function(callback, email) {
    var query = 'select * from UserDares join Dares on UserDares.DareId = Dares.Id where (SenderEmail = "' + email + '" or ReceiverEmail = "' + email + '")'
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

var getCompletedDares = function(callback, email) {
    var query = 'select * from UserDares join Dares on UserDares.DareId = Dares.Id where (SenderEmail = "' + email + '" or ReceiverEmail = "' + email + '")'
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
    var query = 'insert into UserDares (DareId, SenderEmail, ReceiverEmail, CauseId, Amount) VALUES('
        + userDare.dareId + ', "' + userDare.senderEmail + '", "' + userDare.receiverEmail + '", '
        + userDare.causeId + ', ' + userDare.amount + ')';

    client.query(query, function(error, result) {
        callback(error, result.insertId);
    });
};

var updateEvidence = function(callback, id, value) {
    var query = 'update UserDares set Evidence = "' + value + '" where UserDareId = ' + id;

    client.query(query, function(error, result) {
        callback(error);
    });
};

var updateStatus = function(callback, id, value) {
    var query = 'update UserDares set Status = ' + value + ' where UserDareId = ' + id;

    client.query(query, function(error, result) {
        callback(error);
    });
};

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
    getActiveDares: getActiveDares,
    getPendingDares: getPendingDares,
    getCompletedDares: getCompletedDares,
    dareUser: dareUser,
    updateEvidence: updateEvidence,
    updateStatus: updateStatus
};