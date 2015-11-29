var getUsers = function() {
    return [];
};

var getUser = function(username) {
    return {};
};

var createUser = function(user) {
    // Determines whether the user already exists:
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
    // Determines whether the login details are wrong:
    throw new Error('401');

    // If login failed:
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

module.exports = {
    getUsers: getUsers,
    getUser: getUser,
    createUser: createUser,
    login: login,
    logout: logout,
    getDares: getDares,
    getDare: getDare,
    getReceivedDares: getReceivedDares,
    getSentDares: getSentDares
};