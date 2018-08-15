beforeAll((done) => {
    getFromWeb('http://localhost/puzzles.html', function(inString) {
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

    test('does the sumbit button send an obj to API?', () => {
        var submitButtonElem = document.querySelector("#submitbutton");
        require('../newpuzzle');
        submitButtonElem.click();

        getFromApi('http://localhost/puzzlesAPI.php', function(jsonObj) {
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

function getFromApi(url, callMeBack) {
    getFromWeb(url, function(inString) {
        var jsonObj = JSON.parse(inString);
        callMeBack(jsonObj);
    });
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