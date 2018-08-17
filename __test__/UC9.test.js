jest.dontMock('./webConn');
const webConn = require('./webConn');

beforeAll((done) => {
    webConn.getFromWeb('http://localhost/puzzles.html', function(inString) {
        document.body.innerHTML = inString;
        done();
    });
});

describe('Testing UC9 UI, Editing profile', () => {

    test('Can we get the html file?', () => {
        expect(document.body.innerHTML).not.toBeNull();
        expect(document.body.innerHTML).not.toBe('');
    });

    test('Does the confirm button exist?', () => {
        var confirmButtonElem = document.querySelector("confirmbutton");
        expect(confirmButtonElem).toBeDefined();
        expect(confirmButtonElem).not.toBeNull();
    });

    test('Does the change password button exist?', () => {
        var changePassButton = document.querySelector("changepass");
        expect(changePassButton).toBeDefined();
        expect(changePassButton).not.toBeNull();
    });

    test('Does the web send the id of profile to edit and new object with new values?', (done) => {
        var confirmButtonElem = document.querySelector("confirmbutton");
        require('../editprofile');
        confirmButtonElem.click();

        webConn.getFromApi('http://localhost/usersAPI.php', function(jsonObj) {
            expect(jsonObj).toEqual({
                "username": "danni",
                "email": "danni@danni.com",
                "birth": "1994-09-29",
                "gender": "female",
                "country": "sweden"
            });
            done();
        });
    });

});

describe('Testing UC9 API, Editing profile', () => {

    test('Does the local API return the users profile info?', (done) => {
        var requestObj = {
            "route": "edit_profile",
            "params": {
                "username": "danni",
                "email": "danni@danni.com",
                "birth": "1994-09-29",
                "gender": "female",
                "country": "sweden"
            }
        };

        webConn.getFromApi('http://localhost/usersAPI.php', requestObj, function(jsonObj) {
            console.log(jsonObj);
            expect(jsonObj).toEqual({
                "username": "danni",
                "email": "danni@danni.com",
                "birth": "1994-09-29",
                "gender": "female",
                "country": "sweden"
            });
            done();
        });
    });
});
