const signup_form = document.body.querySelector("#signUp_form");

//In UC7 doc, 
//Alternate flow..
//  4a. Username/email already taken.
//      1.	Focus on username or email address and highlight, with small notification.

//=> When a user entered an invalid input, the input'll be highlighted. And the error message'll appear below.

const username_input = signup_form.querySelector("input[name=username]");
username_input.onblur = (e) => chk_validation(e);
const pw_input = signup_form.querySelector("input[name=pw]");
pw_input.onblur = (e) => chk_validation(e);
const pw_confirm_input = signup_form.querySelector("input[name=pw_confirm]"); 
pw_confirm_input.onblur = (e) => chk_validation(e);
const email_input = signup_form.querySelector("input[name=email]");
email_input.onblur = (e) => chk_validation(e);

var pw;
function chk_validation(e){

    let inputValue = e.target.value;
    let elem = e.target;
    let elem_name = e.target.name;

    console.log("Here");
    //Validation check

    //1. username
    // The username of the account of a user.
    // *3 ~ 15 characters.

    //2. Password
    // The password of the account of a user.
    // *At least 8 characters and contain at least a number.

    //3. Password confirm

    if(elem_name === "username"){

        if( inputValue.length < 3 || inputValue.length > 15){

            let report_unvalidUsername = signup_form.querySelector("#report_unvalidUsername");        
            elem.classList.add("notValid"); 
            report_unvalidUsername.innerHTML = "Unvalid: Username should be 3~15 characters.";

        }else{

            elem.classList.remove("notValid");
            elem.classList.add("valid");
            report_unvalidUsername.innerHTML = "";            
        }

    }else if(elem_name === "pw"){
        let chars = pw_input.value.split("");
        let includeNum = false;
        for( let i = 0; i < chars.length; i++){
            let char = chars[i];
            if(char !== NaN){
                includeNum = true;
                break;
            } 
        };
        if(inputValue.length < 8 || includeNum === false){
            let report_unvalidPW = signup_form.querySelector("#report_unvalidPW");            
            elem.classList.add("notValid"); 
            report_unvalidPW.innerHTML = "Unvalid: Password should be at least 8 characters including at least one digit.";

        }else{
            pw = inputValue;
            elem.classList.remove("notValid");
            elem.classList.add("valid");
            report_unvalidPW.innerHTML = "";
        }
    }else if(elem_name === "pw_confirm"){

        if(inputValue !== pw){

            let report_failurePWConfirm = signup_form.querySelector("#report_failurePWConfirm");
            elem.classList.add("unvalid");
            report_failurePWConfirm.innerHTML = "Password is not matched with the entered value.";

        }else{

            elem.classList.remove("unvalid");
            elem.classList.add("valid");
            report_failurePWConfirm.innerHTML = "";

        }
    }else if(elem_name === "email"){

        if(inputValue.indexOf("@") === -1){
            let report_unvalidEmail = signup_form.querySelector("#report_unvalidEmail");
            elem.classList.add("unvalid");            
            report_unvalidEmail.innerHTML = "Unvalid email address";
        }else{
            elem.classList.remove("unvalid");
            elem.classList.add("valid");
            report_unvalidEmail.innerHTML = "";
        }
    }

}

const signup_button = document.body.querySelector("#signup_button");
signup_button.addEventListener("click", sendUserDataForSignup);


function sendUserDataForSignup(){

    let username = username_input.value;
    let email = email_input.value;
    let birth = signup_form.querySelector("input[name=birth]").value;
    //Password passed through validation chk'll be stored in 'pw' var outside the function. 
    const gender_select = signup_form.querySelector("#gender_select");
    const country_select = signup_form.querySelector("#country_select");

    if(username !== "" && email !== "" && birth !== ""){
        let gender = gender_select.options[gender_select.selectedIndex].value;  
        if(gender === "no value"){
            gender = null;
        } 
        let country = country_select.options[country_select.selectedIndex].value;
        if(country === "no value"){
            country = null;
        }

        let obj = {
            route: "sign_up",
            params:{
                username: username,
                password: pw,
                email: email_input.value,
                birth: birth,
                gender: gender,
                country: country
            }
        }
        let json = JSON.stringify(obj);

        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {

            if(this.readyState === 4 && this.status === 200){

                if(xhr.responseText !== "OK") {
                    console.log(xhr.responseText);
                }else if(xhr.responseText === "OK"){
                    // window.location = "http://incode.wcoding.com/login.html";
                }
            }
        }
        xhr.open("POST", "../Backend/createAccount.php", true);
        xhr.send(json);
    }else{
        alert("Please enter all nessecary fileds.");
    } 
     
}
