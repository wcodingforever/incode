jest.dontMock('./webConn');
const webConn = require('./webConn');

beforeAll((done) => {
    webConn.getFromWeb('http://localhost/puzzles.html', function(inString) {
        document.body.innerHTML = inString;
        done();
    });
});


describe('testing for UC2 UI, Adding new puzzles', () => {

    test('Can we get the html file?', () => {
        expect(document.body.innerHTML).not.toBeNull();
        expect(document.body.innerHTML).not.toBe('');
    });

    test('Checking that the dates are prefilled', () => {
        var puzzleDates = document.querySelectorAll(".dateinput");
        expect(puzzleDates.value).not.toBe("");
    });

    test('Checking that the level is selected', () => {
        var puzzleLevel = document.querySelector("#level");
        expect(puzzleLevel.value).not.toBe("Difficulty");
    });

    test('Does the submit button exist?', () => {
        var submitButtonElem = document.querySelector("#submitbutton");
        expect(submitButtonElem).toBeDefined();
        expect(submitButtonElem).not.toBeNull();

    });

    test('Does the add new puzzlebutton exist?', () => {
        var addNewPuzzle = document.querySelector("#addnewbutton");
        expect(addNewPuzzle).toBeDefined();
        expect(addNewPuzzle).not.toBeNull();
    });

    test('does the sumbit button send an obj to API?', (done) => {
        var submitButtonElem = document.querySelector("#submitbutton");
        require('../newpuzzle');
        submitButtonElem.click();

        webConn.getFromApi('http://localhost/puzzlesAPI.php', function(jsonObj) {
            expect(jsonObj.params).toEqual({
                "name": "puzzle1",
                "level": "beginner",
                "description": "my first puzzle",
                "datefrom": "2018-07-09",
                "dateto": "2018-08-13",
                "datasets": [
                    {"dataset": "123456789", "answer": "1"}, 
                    {"dataset": "123456789", "answer": "2"}, 
                    {"dataset": "123456789", "answer": "3"},
                    {"dataset": "123456789", "answer": "4"},
                    {"dataset": "123456789", "answer": "5"}
                ]
            });
            done();
        });
    });
});