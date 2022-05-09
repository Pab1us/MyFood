
function btnCreateJson() {
    let name = document.querySelector("#nameField");
    let username = document.querySelector("#usernameField");
    let lastName = document.querySelector("#lastNameField");
    let email = document.querySelector("#emailField");
    let password = document.querySelector("#passwordField");
    let btnCreate = document.querySelector(".btnCreate");
    let keyNewUser = true;

    let request = httpGet('/users');
    let id;

    function httpGet(theUrl)
    {
        let xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", theUrl, false);
        xmlHttp.send( null );
        return xmlHttp.responseText;
    }
// Здесь наши данные
    let data = JSON.parse(request);
    id = data.length + 1;
    for (let i = 0; i< data.length; i++) {
        if(data[i].email === email.value || data[i].username === username.value) {
            keyNewUser = false;
        }
    }

    if(name.value && username.value && lastName.value && email.value && password.value && keyNewUser){
        let json = {
            id: id,
            name: name.value,
            username: username.value,
            lastName: lastName.value,
            email: email.value,
            password: password.value,
            id_user: id
        };
        // Запрос данных
        let request = '/users';
        const data = JSON.stringify(json);
        const xhr = new XMLHttpRequest();

        xhr.open("POST", request);
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.send(data);
        btnCreate.textContent = 'Готово';
        btnCreate.style.backgroundColor = "green";
        btnCreate.style.pointerEvents = "none";
        btnCreate.style.opacity = "0.7";
        document.querySelector(".createForm").style.pointerEvents = "none";
        document.querySelector(".createForm").style.filter = "brightness(0.5)";
        document.querySelector(".modalWindow").style.display = "block";
    }
    else {
        console.log("Заполнены не все поля или такой пользователь уже существует");
    }
}

function btnGoLogIn() {
    document.location.href = "loginForm.html";
}


checkLogin();

function checkLogin () {
    if (localStorage.getItem('username')) {
        document.querySelector(".authorization_block").style.display = "none";
        document.querySelector(".logIn_block").style.display = "flex";
        document.querySelector(".navLogin").style.display = "block";
        document.querySelector(".navNoLogin").style.display = "none";
        document.querySelector(".loginUser").textContent = localStorage.getItem('username');
    }
}

function logOut () {
    localStorage.removeItem('username');
    localStorage.setItem('statusLogin', 'false');
}


checkTypeScreen();


window.addEventListener('resize', checkTypeScreen);

function checkTypeScreen() {
    let screenW = window.screen.width;
    let screenH = window.screen.height;
    if(screenW < screenH) {
        let inputCount = document.querySelectorAll(".inputField");
        for (let i = 0; i< inputCount.length; i++) {
            document.querySelectorAll(".inputField")[i].style.display = "block";
            document.querySelectorAll(".inputDataField")[i].style.marginLeft = "0";
        }
        document.querySelector(".modalWindow").style.left = "0";
    } else {
        let inputCount = document.querySelectorAll(".inputField");
        for (let i = 0; i< inputCount.length; i++) {
            document.querySelectorAll(".inputField")[i].style.display = "flex";
            document.querySelectorAll(".inputDataField")[i].style.marginLeft = "70px";
        }


        document.querySelector(".modalWindow").style.left = "33%";
    }
}
