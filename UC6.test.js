beforeAll((done) => {
    getFromWeb('http://localhost/puzzles.html', function(inString) {
        document.body.innerHTML = inString;
        done();
    });
});


describe('Testing UC6 UI, log out', () => {


    test('Can we get the html file?', () => {
        expect(document.body.innerHTML).not.toBeNull();
        expect(document.body.innerHTML).not.toBe('');
    });

    test('Does the logout button exist?', () => {
        var logoutButtonElem = document.querySelector("logoutbutton");
        expect(logoutButtonElem).toBeDefined();
        expect(logoutButtonElem).not.toBeNull();

    });

    test('Does this toggle the style attribute of the logout modal to display block?', () => {
        var logoutButtonElem = document.querySelector("logoutbutton");
        var modalElem = document.querySelector("modal");
        require('../logout');
        logoutButtonElem.click();
        expect(modalElem.style.display).toBe("block");
    });

    test('Does the closebutton exist?', () => {
        var closeButtonElem = document.querySelector("closebutton");
        expect(closeButtonElem).toBeDefined();
        expect(closeButtonElem).not.toBeNull();

    });

    test('Does this toggle the style attribute of the logout modal to display none?', () => {
        var closeButtonElem = document.querySelector("closebutton");
        var modalElem = document.querySelector("modal");
        require('../logout');
        closeButtonElem.click();
        expect(modalElem.style.display).toBe("none");
    });

    test('Does the confirmbutton exist?', () => {
        var confirmButtonElem = document.querySelector("confirmbutton");
        expect(confirmButtonElem).toBeDefined();
        expect(confirmButtonElem).not.toBeNull();
    });

    test('Does the web send an empty string as user id when log out is clicked? (meaning no one is logged in anymore)', (done) => {
        var confirmButtonElem = document.querySelector("confirmbutton");
        require('../logout');
        var requestObj = {
            "route": "log_out", 
            "params": "user_id"
        }
        confirmButtonElem.click();

        getFromApi('http://localhost/usersAPI.php', function(jsonObj) {
            expect(jsonObj.params.user_id).toBe("");
            done();
        });
    });
});


describe('Testing UC6 API, log out', () => {

    test('Does API send a user? (is the user logged in)', (done) => {
        var requestObj = {
            "route": "log_in",
            "params": "user_id"
        };

        getFromApi('http://localhost/usersAPI.php', requestObj, function(jsonObj) {
            console.log(jsonObj.puzzles.id);
            expect(jsonObj.params.user_id).not.toBe("");
            done();
        });
    });
});

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
};