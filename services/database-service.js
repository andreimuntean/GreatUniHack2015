module.exports = {
    getUsers: function() {
        return [];
    },
    getUser: function(username) {
        return {};
    },
    createUser: function(user) {
        // Determines whether the user already exists:
        if (getUser(username)) {
            throw 409;
        }

        try {
            // ...
            return 'token';
        } catch(error) {
            throw 400;
        }
    },
    login: function(username, password) {
        // Determines whether the login details are wrong:
        throw 401;

        // If login failed:
        throw 400;

        return 'token';
    },
    logout: function(token) {
        try {
            // ...
        } catch(error) {
            throw 400;
        }
    },
    getDares: function() {
        return [];
    },
    getDare: function(id) {
        return {};
    },
    getReceivedDares: function(username) {
        return [];
    },
    getSentDares: function(username) {
        return [];
    }
};