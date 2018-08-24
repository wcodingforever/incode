var loginButton=document.getElementById("loginButton");
loginButton.addEventListener("click", sendUserInfo);

function sendUserInfo() {

    let username = document.querySelector("input[name=username]").value;
    let password = document.querySelector("input[name=password]").value;

    let userInfo_obj= {
        route: "log_in",
        params: {
            username: username,
            password: password
        }
    };

    let xhr = new XMLHttpRequest;
    xhr.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200) {

            let response_json = xhr.responseText; 
            
            if(response_json !== ""){
                let response_obj = JSON.parse(response_json);

                if(response_obj.status ==="OK"){
                    window.location.href = "./mainpage.html";                 
                }
                else{
                    alert("ERROR:" + response_obj.message);
                }

            }else{
                alert("Problem with communcating with server.");
            }
        }
    }
    xhr.open("POST","./Backend/login.php");     
    let userInfo_json = JSON.stringify(userInfo_obj);              
    xhr.send(userInfo_json);
};
