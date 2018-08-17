jest.dontMock('./webConn');
const webConn = require('./webConn');

beforeAll((done) => {
    webConn.getFromWeb('http://localhost/puzzles.html', function(inString) {
        document.body.innerHTML = inString;
        done();
    });
});

describe('Testing UC10 UI, displaying a puzzle for the user', () => {

    test('Can we get the html file?', () => {
        expect(document.body.innerHTML).not.toBeNull();
        expect(document.body.innerHTML).not.toBe('');
    });

    test('Does the button for receiving dataset exist?', () => {
        var datasetButtonElem = document.querySelector("#datasetbutton");
        expect(datasetButtonElem).toBeDefined();
        expect(datasetButtonElem).not.toBeNull();

    });

    test('Does clicking the button change the inner HTML to receive the data again?', () => {
        var datasetButtonElem = document.querySelector("#datasetbutton");
        require('../apuzzle');
        datasetButtonElem.click();
        expect(datasetButtonElem.innerHTML).toBe("Get dataset again");
    });

    test('Does the submit answer button exist?', () => {
        var answerButtonElem = document.querySelector("#answerbutton");
        expect(answerButtonElem).toBeDefined();
        expect(answerButtonElem).not.toBeNull();

    });

    test('Does the feedback button exist?', () => {
        var feedbackButtonElem = document.querySelector("#feedbackbutton");
        expect(feedbackButtonElem).toBeDefined();
        expect(feedbackButtonElem).not.toBeNull();
    });

    test('Does the web send the answer to API?', (done) => {
        var answerbutton = document.querySelector("#confirmbutton");
        var answerInput = document.querySelector("#answerinput");
        require('../allpuzzles');
        var requestObj = {
            "route": "get_puzzle", 
            "params": "answer" //should we add the puzzle id? 
        }
        answerButtonElem.click();

        webConn.getFromApi('http://localhost/puzzlesAPI.php', requestObj, function(jsonObj) {
            expect(answerInput).not.toBe("");
            expect(requestObj.params.answer).not.toBe(""); // idk about this one but trying it out
            done();
        });
    });

});


describe('Testing UC10 API, displaying a puzzle for the user', () => {

    test('Does the API send dataset?', (done) => {
        var datasetbutton = document.querySelector("#datasetbutton");
        require('../apuzzle');
        datasetButtonElem.click();
        var requestObj = {
            "route": "get_dataset",
            "params": "puzzle_id"
        }

        webConn.getFromApi('http://localhost/', requestObj, function(jsonObj) {
            expect(jsonObj.dataset).not.toBe("");
            done();
        });
    });

    test('Does the API send the puzzle?', (done) => {
        var requestObj = {
            "route": "get_puzzle",
            "params": "puzzle_id", 
        }
        webConn.getFromApi('http://localhost/', requestObj, function(jsonObj) {
            expect(jsonObj.puzzle_id).not.toBe("");
            done();
        });
    });

    test('Does the API send confirmation after submitting answer?', (done) => {
        var answerButtonElem = document.querySelector("#answerbutton");
        require('../apuzzle');

        var requestObj = {
            "route": "get_puzzle",
            "params": "puzzle_id"
        }
        console.log(requestObj);
        answerButtonElem.click();
        webConn.getFromApi('http://localhost/', requestObj, function(jsonObj) {
            expect(jsonObj.answer).not.toBe("");
            done();
        });
    });
});
