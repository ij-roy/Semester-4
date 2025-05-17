const fs = require('fs');

function logReqRes(filename) {
    return function (req, res, next) {
        fs.appendFile(
            filename,
            `${Date.now()}: ${req.method} ${req.path}\n`,
            (err) => {
                if (err) {
                    console.error('Error writing log:', err);
                }
                next();
            }
        );
    }
}

module.exports = { logReqRes };