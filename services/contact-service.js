var sendGrid = require('sendgrid')(process.env.SENDGRID_USERNAME, process.env.SENDGRID_PASSWORD);

function sendEmail(email, subject, text) {
    var payload = {
        to: email,
        from: 'noreply@hidare.com',
        subject: subject,
        text: text
    };

    sendGrid.send(payload, function(error, response) {
        if (error) {
            console.error(error);
        }
    });
}

module.exports = {
    sendEmail: sendEmail
};