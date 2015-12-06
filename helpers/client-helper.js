var mysql = require('mysql');
 
// Connects to the database.
var client = mysql.createConnection({
    host: 'sql4.freemysqlhosting.net',//process.env.DATABASE_HOST,
    port: 3306, // process.env.DATABASE_PORT,
    user: 'sql498855', //process.env.DATABASE_USER,
    password: 'wNf2TJavcW', //process.env.DATABASE_PASSWORD,
    database: 'sql498855' //process.env.DATABASE_NAME
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