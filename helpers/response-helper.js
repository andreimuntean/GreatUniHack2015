var sendResponse = function(res, data, statusCode) {
    if (!statusCode) {
        statusCode = 200;
    } else {
        res.status(statusCode);
    }

    res.json({
        'status': statusCode == 200 ? 'success' : 'error',
        'data': data
    });
};

module.exports = {
    sendResponse: sendResponse
};