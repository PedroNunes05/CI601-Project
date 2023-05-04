const label = document.querySelector("#usernameLabel"),
    username = document.querySelector("#username"),
    conlabel = document.querySelector("#confirmLabel"),
    conpass = document.querySelector("#conpass"),
    title = document.getElementById("title"),
    submitButton = document.getElementById("submit"),
    singinButton = document.getElementById("singIN"),
    regButton = document.getElementById("register"),
    response = document.getElementById("response");

function change(value) {
    let form = value;

    if (form == "singIN") {
        title.innerText = "Log In"
        label.style.display = "none";
        username.style.display = "none";
        username.removeAttribute("required");
        username.innerText = null;
        conlabel.style.display = "none";
        conpass.style.display = "none";
        conpass.removeAttribute("required");
        conpass.innerText = null;
        submitButton.innerText = "Sing In";
        singinButton.style.display = "none";
        regButton.style.display = "inline-block";

    } else if (form == "register") {
        title.innerText = "Register"
        label.style.display = "inline-block";
        username.style.display = "inline-block";
        username.setAttribute("required", "required");
        conlabel.style.display = "inline-block";
        conpass.style.display = "inline-block";
        conpass.setAttribute("required", "required");
        submitButton.innerText = "Register";
        singinButton.style.display = "inline-block";
        regButton.style.display = "none";
    }
}

function submitIt() {
    let type = title.innerText;
    if (type == "Register") {
        let pass1 = document.querySelector("#pass").value,
            pass2 = conpass.value;
        if (pass1 != pass2 ) {
            response.innerText = "Passwords Do Not Match" 
        } else if(pass1.length <= 6){
              response.innerText = "Passwords must be longer than 6 characters"   
        }else {
            sendIn();
        }
    } else { 
            sendIn();
    }
} 

function sendIn() {
    let email = document.getElementById("email").value,
        pass1 = document.querySelector("#pass").value,
        userValue = document.getElementById("username").value;
    let formData = new FormData();
    formData.append("email", email);
    formData.append("pass", pass1)
    if (userValue.length > 0) {
        formData.append("username", userValue);
    }
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", "https://pn163.brighton.domains/CI601/php/signIn.php", true);
    xmlHttp.send(formData);
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == XMLHttpRequest.DONE) {
            response.innerText = xmlHttp.responseText;
        }
    }
}