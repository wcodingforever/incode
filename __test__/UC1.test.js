// jest.dontMock('fs');

// const fs = require('fs');
// const html = fs.readFileSync('./users.html', 'utf8');

beforeAll((done) => {
    getFromWeb('http://localhost/incode.wcoding.com/users.html', function(inString) {
        document.body.innerHTML = inString;
        done();
    });
});


describe("Test all elements which are needed to remove a user.", () => {

    const users = document.querySelectorAll(".users");
    const removeButton = document.querySelector("#removeButton");

    test( "The web page is loaded successfully?", () => {
        expect(document.body.innerHTML).not.toBeNull();
        expect(document.body.innerHTML).not.toBe("");
    });

    test("All users were displayed in the user list?", () => {
        expect(users).toBeDefined();
        for(let i = 0; i < users.length ; i++){
            let username = users[i].querySelector(".username").innerHTML;
            expect(username).not.toBe("");
        }
    });

    test("The button for user removal exists or not?", () => {
        expect(removeButton).toBeDefined();
    });


});

describe("Test for a API to remove a user", () => {
    
    test("The API can get id data in a sent json? If not, it'll define Error and provide a message about it?" , (done) => {    
        let proper_jsonObj = {
            route: "remove_users",
            params: {
                id: "8"
            }
        };

        let wrong_jsonObj = {
            route: "remove_users",
            params: {
                username: "juliet"
            }
        };

        let proper_json = JSON.stringify(proper_jsonObj);
        let wrong_json = JSON.stringify(wrong_jsonObj);

        getFromApi('http://localhost/back/manageUsers.php/' + proper_json , function(jsonObj) {
            expect(jsonObj.status).toBe('OK');
            done();
        });

        getFromApi('http://localhost/back/manageUsers.php/' + wrong_json , function(jsonObj) {
            expect(jsonObj.status).toBe('ERROR');
            expect(jsonObj.message).not.toBeDefined();

            done();
        });
    });

});


jest.dontMock('http');
const http = require('http');

function getFromWeb(url, callMeBack) {
    http.get(url, function(response) {
        let buffer = '';
        response.on('data', function(piece) {
            buffer += piece;
        });
        response.on('end', function() {
            callMeBack(buffer);
        });
    });
}

function getFromApi(url, callMeBack) {
    getFromWeb(url, function(inString) {
        var jsonObj = JSON.parse(inString);
        callMeBack(jsonObj);
    });
}












