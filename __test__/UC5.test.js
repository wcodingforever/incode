//UC5: Log in
import * as jsFile from "./login.js";


beforeAll((done) => {
    getFromWeb('http://localhost/incode.wcoding.com/lonIn.html', function(inString) {
        document.body.innerHTML = inString;
        done();
    });
});


//Display tests

describe( "Login page is succeessfully loaded?", () => {

    test( "The page is loaded?", () => {
        expect(documnet.body.innerHTML).not.toBeNull();
        expect(documnet.body.innerHTML).not.toBe("");        
    });

    test( "Neccessary elements exist?", () => {
        let loginForm = document.querySelector("#loginForm");
        let anchorFogotPW = document.querySelector("#fogotPW");
        let logInButton = document.querySelector("#loginButton");
        let signUpButton = document.querySelector("#signUpButton");        

        expect(loginForm).toBeDefined();
        expect(anchorFogotPW).toBeDefined();
        expect(loginButton).toBeDefined();
        expect(signUpButton).toBeDefined();
        
    });
});

describe("API test for UC1", (jsObj) => {
    test("When a correct username and pw pair was enterend, login can be done?", (done) => {
        //This is a correcct username & pw pair.
        
        let jsonObj_1 = {
            route: "log_in",
            params: {
                username: "happyCow",
                password: "happyCowPW"
            }
        };
        let json = JSON.stringify(jsonObj_1);
        getFromApi("POST", "http://localhost/incode.wcoding.com/logIn.php", json, (response) => {
            expect(response.satus).toBe("OK");
        });
        done();
    });

    test("When a wrong username and pw pair was enterend, login can be done?", (done) => {
        //This is a wrong username & pw pair.
        let jsonObj_1 = {
            route: "log_in",
            params: {
                username: "happyCoo",
                password: "happyCooPW"
            }
        };
        let json = JSON.stringify(jsonObj_1);
        getFromApi("POST", "http://localhost/incode.wcoding.com/logIn.php", json, (response) => {
            expect(response.satus).toBe("ERROR");
            expect(response.message).not.toBeDefined();            
            expect(response.message).not.toBe("");
        });
        done();
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

