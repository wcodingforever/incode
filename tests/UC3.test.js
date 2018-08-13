beforeAll((done) => {
    getFromWeb('http://localhost/puzzles.html', function(inString) {
        document.body.innerHTML = inString;
        done();
    });
});

describe('Testing UC3 UI, editing puzzles!', () => {

    test('Can we get the html file?', () => {
        expect(document.body.innerHTML).not.toBeNull();
        expect(document.body.innerHTML).not.toBe('');
    });

    test('Does the submit button exist?', () => {
        var submitButtonElem = document.querySelector("#submitbutton");
        expect(submitButtonElem).toBeDefined();
        expect(submitButtonElem).not.toBeNull();

    });

    test('does the web send an obj with changed values?', () => {
        var submitButtonElem = document.querySelector("#submitbutton");
        requre('../editpuzzle');
        submitButtonElem.click();
        getFromApi('http://localhost/puzzlesAPI.php', (jsonObj) => {
            expect(jsonObj).toEqual({
                "route": "update_puzzle",
                "params": {
                "puzzle_id": "1", 
                "name": "puzzle1", 
                "level": "beginner", 
                "description": "my first puzzle", 
                "datefrom": "2018-06-17", 
                "dateto": "2018-09-29"
                }
            })
        done();
        });
    });

      test('testing api for getting only one selected puzzle by id', (done) => {
        getFromApi('http://localhost/puzzlesAPI.php', (jsonObj) => {
            expect(jsonObj.puzzle_id).toBe('1')
            done();
        });
      });
});


describe('Testing UC3 API, editing puzzles', () => {

    test('Do the inputs receive info from the api when displaying the edit puzzle page? (prefilling the values)', (done) => {
        var requestObj = {
            "route": "update_puzzle",
            "params": {
                "puzzle_id": "1", 
                "name": "puzzle1", 
                "level": "beginner", 
                "description": "my first puzzle", 
                "datefrom": "2018-06-17", 
                "dateto": "2018-09-29"}
        }

        getFromApi('http://localhost/puzzlesAPI.php', requestObj, (jsonObj) => {
            expect(jsonObj.params.puzzle_id).toBe('1');
            done();
        });
    });

        test('testing api for full list of all puzzles', (done) => {
            var requestObj = {
                "route": "update_puzzle",
                "params": "puzzle_id"
            }

        getFromApi('http://localhost/puzzlesAPI.php', requestObj, (jsonObj) => {
            expect(jsonObj.params.puzzle_id).toEqual(["1", "2", "3"]);
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
}