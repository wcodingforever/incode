jest.dontMock('./webConn');
const webConn = require('./webConn');

beforeAll((done) => {
    webConn.getFromWeb('http://localhost/puzzles.html', function(inString) {
        document.body.innerHTML = inString;
        done();
    });
});

describe('Testing UC4 UI, Deleting puzzles', () => {

    test('Can we get the html file?', () => {
        expect(document.body.innerHTML).not.toBeNull();
        expect(document.body.innerHTML).not.toBe('');
    });

    test('Does the delete button exist?', () => {
        var deleteButtonElem = document.querySelector("deletebutton");
        expect(deleteButtonElem).toBeDefined();
        expect(deleteButtonElem).not.toBeNull();

    });

    test('Does the modal exist?', () => {
        var modalElem = document.querySelector("modal");
        expect(modalElem).toBeDefined();
        expect(modalElem).not.toBeNull();

    });

    test('Does the confisrmbutton exist?', () => {
        var confirmButtonElem = document.querySelector("confirmbutton");
        expect(confirmButtonElem).toBeDefined();
        expect(confirmButtonElem).not.toBeNull();

    });

    test('Does the close button exist?', () => {
        var closeButtonElem = document.querySelector("closebutton");
        expect(closeButtonElem).toBeDefined();
        expect(closeButtonElem).not.toBeNull();

    });

    test('Does this toggle the style attribute of the confirmation modal to display block?', () => {
        var deleteButtonElem = document.querySelector("deletebutton");
        var modalElem = document.querySelector("modal");
        require('../allpuzzles');
        deleteButtonElem.click();
        expect(modalElem.style.display).toBe("block");
    });

    test('Does this toggle the style attribute of the confirmation modal to display none?', () => {
        var modalElem = document.querySelector("modal");
        var closeButtonElem = document.querySelector("closebutton");
        require('../allpuzzles');
        closeButtonElem.click();
        expect(modalElem.style.display).toBe("none");
    });

    test('Does this toggle the style attribute of the confirmation modal to display block?', () => {
        var deleteButtonElem = document.querySelector("deletebutton");
        var modalElem = document.querySelector("modal");
        require('../allpuzzles');
        deleteButtonElem.click();
        expect(modalElem.style.display).toBe("block");
    });

    test('Does this toggle the style attribute of the confirmation modal to display none?', () => {
        var modalElem = document.querySelector("modal");
        var confirmButtonElem = document.querySelector("confirmbutton");
        require('../allpuzzles');
        confirmButtonElem.click();
        expect(modalElem.style.display).toBe("none");
    });

    test('Does the web send the id to delete?', (done) => {
        var confirmButtonElem = document.querySelector("confirmbutton");
        require('../allpuzzles');
        var requestObj = {
            "route": "get_puzzle", 
            "params": "puzzle_id"
        }
        confirmButtonElem.click();

        webConn.getFromApi('http://localhost/puzzlesAPI.php', function(jsonObj) {
            expect(jsonObj.puzzle_id).toBe("1");
            done();
        });
    });

});


describe('testing UC4 API', () => {

    test('Does the local API return an array of all puzzles?', (done) => {
        var requestObj = {
            "route": "get_puzzlelist"
        };

        webConn.getFromApi('http://localhost/puzzlesAPI.php', requestObj, function(jsonObj) {
            console.log(jsonObj.puzzles.id);
            expect(jsonObj.puzzles.id).toEqual(["1", "2", "3"]);
            done();
        });
    });
});
