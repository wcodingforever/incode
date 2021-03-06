jest.dontMock('./webConn');
const webConn = require('./webConn');

beforeAll((done) => {
    webConn.getFromWeb('http://localhost/allpuzzles.html', function(inString) {
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

        webConn.getFromApi('http://localhost/puzzlesAPI.php', requestObj, function(jsonObj) {
            console.log(jsonObj);
            expect(jsonObj.puzzles.id).toEqual(["1", "2", "3"]);
            done();
        });
    });

});
