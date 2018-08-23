var signup_form = document.body.querySelector("#signUp_form");

//In UC7 doc, 
//Alternate flow..
//  4a. Username/email already taken.
//      1.	Focus on username or email address and highlight, with small notification.

//=> When a user entered an invalid input, the input'll be highlighted. And the error message'll appear below.


var username_input = signup_form.querySelector("input[name=username]");
var pw_input = signup_form.querySelector("input[name=pw]");
var pw_confirm_input = signup_form.querySelector("input[name=pw_confirm]"); 
var email_input = signup_form.querySelector("input[name=email]");


username_input.addEventListener( "change", chk_validation);
pw_input.addEventListener( "change", chk_validation);
pw_confirm_input.addEventListener( "change", chk_validation);
email_input.addEventListener( "change", chk_validation);



function chk_validation(e) {

    var elem = e.target;
    var elem_name = e.target.name;
    var inputValue = e.target.value;

    //Validation check

    //1. username
    // The username of the account of a user.
    // *3 ~ 15 characters.

    //2. Password
    // The password of the account of a user.
    // *At least 8 characters and contain at least a number.

    //3. Password confirm

    if (elem_name === "username") {  // Check if username is between 3 and 15 characters.
        var report_invalidUsername = signup_form.querySelector("#report_invalidUsername");
        if (inputValue.length < 3 || inputValue.length > 15) {
            elem.classList.add("notValid"); 
            report_invalidUsername.innerHTML = "Invalid: Username should be 3-15 characters.";
        }
        else {
            elem.classList.remove("notValid");
            elem.classList.add("valid");
            report_invalidUsername.innerHTML = "";
        }
    }
    else if (elem_name === "pw") {  // Check that the password is >8 chars, and contains at least a number.
        // Find a number in the password.
        var chars = pw_input.value.split("");
        var includeNum = false;
        for( var i = 0; i < chars.length; i++) {
            var char = chars[i];
            if(char !== NaN){
                includeNum = true;
                break;
            } 
        };

        var report_invalidPW = signup_form.querySelector("#report_invalidPW");
        if(inputValue.length < 8 || includeNum === false) {
            elem.classList.add("notValid"); 
            report_invalidPW.innerHTML = "Invalid: Password should be at least 8 characters and include at least one digit.";
        }
        else {
            elem.classList.remove("notValid");
            elem.classList.add("valid");
            report_invalidPW.innerHTML = "";
        }
    }
    else if(elem_name === "pw_confirm") {
        var report_failurePWConfirm = signup_form.querySelector("#report_failurePWConfirm");
        if(inputValue !== pw_input.value) {
            elem.classList.add("invalid");
            report_failurePWConfirm.innerHTML = "Passwords do not match.";
        }
        else {
            elem.classList.remove("invalid");
            elem.classList.add("valid");
            report_failurePWConfirm.innerHTML = "";
        }
    }
    else if(elem_name === "email") {
        var report_invalidEmail = signup_form.querySelector("#report_invalidEmail");
        if(inputValue.indexOf("@") === -1) {
            elem.classList.add("invalid");
            report_invalidEmail.innerHTML = "Invalid email address.";
        }
        else {
            elem.classList.remove("invalid");
            elem.classList.add("valid");
            report_invalidEmail.innerHTML = "";
        }
    }
}

var signup_button = document.body.querySelector("#signup_button");
signup_button.addEventListener("click", sendUserDataForSignup);

function sendUserDataForSignup() {
    var birthVal = signup_form.querySelector("input[name=birth]").value;
    var genderVal = signup_form.querySelector("#gender_select").value;
    var countryVal = signup_form.querySelector("#country_select").value;


    if (username_input.value !== ""
        && pw_input.value !== ""
        && email_input.value !== ""
        && birthVal !== "")
    {
        if (genderVal === "") { genderVal = null; }
        if (countryVal === ""){ countryVal = null; }

        var obj = {
            route: "sign_up",
            params:{
                username: username_input.value,
                password: pw_input.value,
                email: email_input.value,
                birth: birthVal,
                gender: genderVal,
                country: countryVal
            }
        }

        var jsonStr = JSON.stringify(obj);

        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if(this.readyState === 4 && this.status === 200) {
                if (xhr.responseText !== "") {
                    var jsonObj = JSON.parse(xhr.responseText);
                    if (jsonObj.status !== "OK") {
                        alert (jsonObj.message);
                    }
                    else {
                        // Redirect to next page.
                        window.location = "localhost/../login.html";
                    }
                }
                else {
                    alert("Problem with communcating with server.");
                }
            }
        }
        xhr.open("POST", "backend/createAccount.php", true);
        xhr.send(jsonStr);
    }
    else {
        alert("Please enter all nessecary fileds.");
    }
}