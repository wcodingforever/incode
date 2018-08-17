jest.dontMock('./webConn');
const webConn = require('./webConn');

beforeAll((done) => {
    webConn.getFromWeb('http://localhost/signup.html', function(inString) {
        document.body.innerHTML = inString;
        done();
    });
});

describe('Testing UC7 UI, signing up', () => {

    test('Can we get the html file?', () => {
        expect(document.body.innerHTML).not.toBeNull();
        expect(document.body.innerHTML).not.toBe('');
    });

    test('Does the submit button exist?', () => {
        var submitButtonElem = document.querySelector("submitbutton");
        expect(submitButtonElem).toBeDefined();
        expect(submitButtonElem).not.toBeNull();
    });

    test('Does the web send the id to delete?', (done) => {
        var submitButtonElem = document.querySelector("submitbutton");
        require('../signup');
        var requestObj = {
            "route": "sign_up"
        }
        confirmButtonElem.click();

        webConn.getFromApi('http://localhost/usersAPI.php', requestObj, function(jsonObj) {
            expect(jsonObj).toEqual({
                "name": "danni",
                "password": "danni",
                "email": "danni@danni.com",
                "birth" : "1994-09-29",
                "gender": "female",
                "counrty": "sweden"
            });
            done();
        });
    });

});



// describe('Testing UC7 API, signing up', () => {

    
// });
