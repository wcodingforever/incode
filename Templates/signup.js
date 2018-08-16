const signup_form = document.body.querySelector("#signUp_form");
const signup_button = document.body.querySelector("#signup_button");

signup_button.addEventListener("click", sendUserDataForSignup);

//In UC7 doc, 
//Alternate flow..
//  4a. Username/email already taken.
//      1.	Focus on username or email address and highlight, with small notification.

//=> When a user entered an invalid input, the input'll be highlighted. And the error message'll appear below.

const username_input = signup_form.querySelector("input[name=username]");
username_input.addEventListener("blure", chk_validation("username"));
const pw_input = signup_form.querySelector("input[name=password]");
pw_input.addEventListener("blure", chk_validation("pw"));
const pw_confirm_input = signup_form.querySelector("input[name=password_confirm]"); 
pw_confirm_input.addEventListener("blure", chk_validation("pw_confirm"));
const email_input = signup_form.quersySelector("input[name=email]");
email_input.addEventListener("blure", chk_validation("email"));

var pw;
function chk_validation( elem_name, elem){

    let inputValue = elem.value;

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
        let chars = pw.split("");
        let includeNum = false;
        chars.forEach((char) => {
            if(char ==! NaN){
                includeNum = true;
                break;
            } 
        });
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
 


function sendUserDataForSignup(){

    //Password passed through validation chk'll be stored in 'pw' var outside the function. 
    const gender_select = signup_form.querySelector("#gender_select");
    const country_select = signup_form.querySelector("#country_select");

    let gender = gender_select.options[gender_select.selectedIndex];  
    if(gender === "no value"){
        gender = null;
    } 
    let country = country_select.options[country_select.selectedIndex];
    if(country === "no value"){
        country = null;
    }

    let obj = {
        route: "sign_up",
        params:{
            username: username_input.value,
            password: pw,
            email: email_input.value,
            birth: signup_form.querySelector("input[name=birth]").value,
            gender: gender,
            country: country
        }
    }
    let json = JSON.stringify(obj);

    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {

        if(this.readyState === 4 && this.status === 200){

            if(xhr.responseText !== "OK") {
                console.log(xhr.reponseText);
            }
        }
    }
    xhr.open("POST", "../Backend/createAccount.php", true);
    xhr.send(json); 
     
}
