beforeAll((done) => {
    getFromWeb('http://localhost/allpuzzles.html', function(inString) {
        document.body.innerHTML = inString;
        done();
    });
});

describe('Testing UC13 UI, displaying all the puzzles on the main page', () => {

    test('Can we get the html file?', () => {
        expect(document.body.innerHTML).not.toBeNull();
        expect(document.body.innerHTML).not.toBe('');
    });

    test('Does the completed puzzles have the added class?', () => {
        require('../allpuzzles');
        var puzzle = document.querySelectorAll(".puzzle");
        expect(puzzle.classList).toContain('completed');
    });
});


describe('Testing UC13 API, displaying all the puzzles on the main page', () => {

    test('Does the local API return an array of all puzzles?', (done) => {
        var requestObj = {
            "route": "get_puzzlelist"
        };

        getFromApi('http://localhost/puzzlesAPI.php', requestObj, function(jsonObj) {
            console.log(jsonObj);
            expect(jsonObj.puzzles.id).toEqual(["1", "2", "3"]);
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