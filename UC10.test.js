describe('Testing UC10, displaying a puzzle for the user', () => {

    test('Does the API send the puzzle?', (done) => {
        getFromApi('http://localhost/', function(jsonObj) {
            expect(jsonObj.name).not.toBe("");
            expect(jsonObj.level).not.toBe("");
            expect(jsonObj.description).not.toBe("");
            expect(jsonObj.date_from).not.toBe("");
            expect(jsonObj.date_to).not.toBe("");
            done();
        });
    });

    test('Does the button for receiving dataset exist?', () => {
        var datasetButtonElem = document.querySelector("#datasetbutton");
        expect(datasetButtonElem).toBeDefined();
    });

    test('Does clicking the button change the inner HTML to receive the data again?', () => {
        var datasetButtonElem = document.querySelector("#datasetbutton");
        datasetButtonElem.click();
        expect(datasetButtonElem.innerHTML).toBe("Get dataset again");
    });

    test('Does the API send dataset?', (done) => {
        getFromApi('http://localhost/', function(jsonObj) {
            expect(jsonObj.dataset).not.toBe("");
            done();
        });
    });

    test('Does the submit answer button exist?', () => {
        var answerButtonElem = document.querySelector("#answerbutton");
        expect(answerButtonElem).toBeDefined();
    });

    test('Does the feedback button exist?', () => {
        var feedbackButtonElem = document.querySelector("#feedbackbutton");
        expect(feedbackButtonElem).toBeDefined();
    });

    test('Does the API send confirmation after submitting answer?', (done) => {
        var answerButtonElem = document.querySelector("#answerbutton");
        answerButtonElem.click();
        getFromApi('http://localhost/', function(jsonObj) {
            expect(jsonObj.answer).not.toBe("");
            done();
        });
    });


});


jest.dontMock('http');
const http = require('http');
function getFromApi(url, callMeBack) {
    http.get(url, function(response) {
        let buffer = '';
        response.on('data', function(piece) {
            buffer += piece;
        });
        response.on('end', function() {
            const jsonObj = JSON.parse(buffer);
            callMeBack(jsonObj);
        });
    })
}