const http = require('http');
function getFromWeb(url, callMeBack) {
    http.get(url, function(response) {
        let buffer = '';
        response.setEncoding('utf8');
        response.on('data', function(piece) {
            buffer += piece;
        });
        response.on('end', function() {
            callMeBack(buffer);
        });
    })
}

// Example: getFromApi("POST", "userAPI.php", "{ \"id\": 3 }", myCallback);
// NOTE: For POSTs, make sure the third parameter is a string!
function getFromApi(method, url, requestString, callMeBack) {
    if (method === "GET") {
        getFromWeb(url, function(inString) {
            let jsonObj = JSON.parse(inString);
            callMeBack(jsonObj);
        });
    }
    else {
        let options = {
            hostname: 'localhost',
            port: 80,
            path: url,
            method: 'POST',
            headers: { 'Content-Type': 'application/json', }
        };
        let request = http.request(options, function(response) {
            let buffer = '';
            response.setEncoding('utf8');
            response.on('data', function(piece) {
                buffer += piece;
            });
            response.on('end', function() {
                callMeBack(buffer);
            });
        });
        request.write(requestString);
        request.end();
    }
}

module.exports = {
    getFromWeb
    , getFromApi
}