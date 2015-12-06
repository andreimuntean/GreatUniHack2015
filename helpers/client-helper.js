var mysql = require('mysql');
 
// Connects to the database.
var client = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
});
 
// The client is automatically replaced if it is disconnected.
function replaceClientOnDisconnect(client) {
    client.on('error', function(error) {
        if (!error.fatal) {
            return;
        }
 
        if (error.code != "PROTOCOL_CONNECTION_LOST") {
            throw error;
        }

        client = mysql.createConnection(client.config);
        replaceClientOnDisconnect(client);
        client.connect(function(error) {
            if (error) {
                process.exit(1);
            }
        });
    });
}

replaceClientOnDisconnect(client);

exports.getClient = function() {
    return client;
};