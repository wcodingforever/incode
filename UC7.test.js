beforeAll((done) => {
    getFromWeb('http://localhost/signup.html', function(inString) {
        document.body.innerHTML = inString;
        done();
    });
});

describe('Testing UC7 UI, signing up', () => {

    test('Can we get the html file?', () => {
        expect(document.body.innerHTML).not.toBeNull();
        expect(document.body.innerHTML).not.toBe('');
    });

    test('Does the submit button exist?', () => {
        var submitButtonElem = document.querySelector("submitbutton");
        expect(submitButtonElem).toBeDefined();
        expect(submitButtonElem).not.toBeNull();
    });

    test('Does the web send the id to delete?', (done) => {
        var submitButtonElem = document.querySelector("submitbutton");
        require('../signup');
        var requestObj = {
            "route": "sign_up"
        }
        confirmButtonElem.click();

        getFromApi('http://localhost/usersAPI.php', requestObj, function(jsonObj) {
            expect(jsonObj).toEqual({
                "name": "danni",
                "password": "danni",
                "email": "danni@danni.com",
                "birth" : "1994-09-29",
                "gender": "female",
                "counrty": "sweden"
            });
            done();
        });
    });

});



// describe('Testing UC7 API, signing up', () => {

    
// });



jest.dontMock('http');
const http = require('http');
function getFromWeb(url, requestObj, callMeBack) {
    http.post(url, function(response) {
        let buffer = '';
        response.on('data', function(piece) {
            buffer += piece;
        });
        response.on('end', function() {
            const jsonObj = JSON.parse(buffer);
            callMeBack(jsonObj);
        });
    })
};

function getFromApi(method, url, requestString, callMeBack) {
    if (method === "GET") {
        getFromWeb(url, function(inString) {
            var jsonObj = JSON.parse(inString);
            callMeBack(jsonObj);
        });
    }
    else {
        var options = {
            hostname: 'localhost',
            port: 80,
            path: url,
            method: 'POST',
            headers: { 'Content-Type': 'application/json', }
        };
        var request = http.request(url, function(response) {
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