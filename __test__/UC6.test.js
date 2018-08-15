jest.dontMock('./webConn');
const webConn = require('./webConn');

beforeAll((done) => {
    webConn.getFromWeb('http://localhost/puzzles.html', function(inString) {
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

        webConn.getFromApi('http://localhost/usersAPI.php', function(jsonObj) {
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

        webConn.getFromApi('http://localhost/usersAPI.php', requestObj, function(jsonObj) {
            console.log(jsonObj.puzzles.id);
            expect(jsonObj.params.user_id).not.toBe("");
            done();
        });
    });
});
