jest.dontMock('fs');

const fs = require('fs');

describe('Testing UC3, editing puzzles!', () => {
    var submitButtonElem = document.querySelector("#submitbutton");
    var allInputs = document.querySelectorAll("input");

    test('Does the submit button exist?', () => {
        expect(submitButtonElem).toBeDefined();
    });


    test('Do the inputs receive info from the api when displaying the edit puzzle page? (prefilling the values)', () => {
        expect(allInputs.value).not.toBe("");
    });

      test('testing api for full list of all puzzles', (done) => {
        getFromApi('httpblablah adding this later', (jsonObj) => {
            expect(jsonObj).toEqual('get_puzzlelist')
            done();
        });
      });


      test('testing api for getting only one selected puzzle by id', (done) => {
        getFromApi('httpblablah adding this later', (jsonObj) => {
            expect(jsonObj).toBe('puzzle_id')
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