var Client = require('justgiving-apiclient').ApiClient;

// Initializes the client and gets the cached causes.
var client = new Client('https://api.sandbox.justgiving.com', '7ff4a2aa');
var causes = require('../json/causes.json');

var getCauses = function(callback, error) {
    callback(causes);
};

var getCause = function(callback, error, id) {
    client.getCharity(id)
        .then(callback)
        .catch(error);
};

module.exports = {
    getCauses: getCauses,
    getCause: getCause
};