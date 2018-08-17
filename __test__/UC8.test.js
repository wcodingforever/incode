jest.dontMock('./webConn');
const webConn = require('./webConn');

beforeAll((done) => {
    webConn.getFromWeb('http://localhost/puzzles.html', function(inString) {
        document.body.innerHTML = inString;
        done();
    });
});
 

describe('Testing UC8 UI, change password', () => {

    test('Can we get the html file?', () => {
        expect(document.body.innerHTML).not.toBeNull();
        expect(document.body.innerHTML).not.toBe('');
    });

    test('Does the change password button exist?', () => {
        var changePassButtonElem = document.querySelector("changepassbutton");
        expect(changePassButtonElem).toBeDefined();
        expect(changePassButtonElem).not.toBeNull();

    });

    test('Does the modal show on click?', () => {
        var changePassButtonElem = document.querySelector("changepassbutton");
        var modal = document.querySelector("#modal");
        require('../editprofile');
        changePassButtonElem.click();
        expect(modal.style.display).toBe("block");
    });

    test('Does the three inputs exist?', () => {
        var oldPass = document.querySelector("oldpass");
        var newPass = document.querySelector("newpass");
        var confirmPass = document.querySelector("confirmpass");

        expect(oldPass).toBeDefined();
        expect(oldPass).not.toBeNull();
        expect(newPass).toBeDefined();
        expect(newPass).not.toBeNull();
        expect(confirmPass).toBeDefined();
        expect(confirmPass).not.toBeNull();
    });

    test('Does the three inputs exist?', () => {
        var newPass = document.querySelector("newpass");
        var confirmPass = document.querySelector("confirmpass");

        expect(confirmPass.value).toBe(newPass.value);
    });

    test('Does the close button exist?', () => {
        var closeButtonElem = document.querySelector("closebutton");
        expect(closeButtonElem).toBeDefined();
        expect(closeButtonElem).not.toBeNull();
    });

    test('Does the confirm button exist?', () => {
        var confirmButtonElem = document.querySelector("confirmbutton");
        expect(confirmButtonElem).toBeDefined();
        expect(confirmButtonElem).not.toBeNull();

    });

    test('does the confirm button send new pass to API?', (done) => {
        require('../editprofile');
        var requestObj = {
            "route": "change_pw", 
            "params": "new_pw"
        }
        confirmButtonElem.click();

        webConn.getFromApi('http://localhost/puzzlesAPI.php', requestObj, function(jsonObj) {
            expect(jsonObj.params.new_pw).not.toBe("");
            done();
        });
    });

    test('Does the modal dissapear on click?', () => {
        var closeButtonElem = document.querySelector("closebutton");
        var modal = document.querySelector("#modal");
        require('../editprofile');
        closeButtonElem.click();
        expect(modal.style.display).toBe("none");
    });

});


// describe('Testing UC8 API, change password', () => {
//check pw against old password
// });
