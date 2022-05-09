
let usernameGlobal;

function btnLogin() {
    let username = document.querySelector(".usernameField");
    let password = document.querySelector(".passwordField");
    let btnCreate = document.querySelector(".btnCreate");
    let success = false;

    let request = httpGet('/users');

    function httpGet(theUrl)
    {
        let xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", theUrl, false);
        xmlHttp.send( null );
        return xmlHttp.responseText;
    }
// Здесь наши данные
    let data = JSON.parse(request);

    for (let i = 0; i< data.length; i++) {
        if(data[i].password === password.value && data[i].username === username.value) {
            btnCreate.textContent = 'Готово';
            btnCreate.style.backgroundColor = "green";
            btnCreate.style.pointerEvents = "none";
            btnCreate.style.opacity = "0.7";
            document.querySelector(".createForm").style.pointerEvents = "none";
            document.querySelector(".createForm").style.filter = "brightness(0.5)";
            document.querySelector(".modalWindow").style.display = "block";
            document.querySelector(".alertText").textContent = "Здраствуйте " + data[i].name + "!" + " Вход выполнен!";
            usernameGlobal = data[i].username;
            success = true;

        }
    }
    if(!success){
        alert("Неверно указаны данные для входа");
    }

}

function btnGoLogIn() {
    localStorage.setItem('statusLogin', 'true');
    localStorage.setItem('username', usernameGlobal);
    document.location.href = "../index.html";
}


checkTypeScreen();


window.addEventListener('resize', checkTypeScreen);

function checkTypeScreen() {
    let screenW = window.screen.width;
    let screenH = window.screen.height;
    if(screenW < screenH) {
        document.querySelector(".username").style.display = "block";
        document.querySelector(".usernameField").style.marginLeft = "0";
        document.querySelector(".password").style.display = "block";
        document.querySelector(".passwordField").style.marginLeft = "0";
        document.querySelector(".modalWindow").style.left = "0";
    } else {
        document.querySelector(".username").style.display = "flex";
        document.querySelector(".usernameField").style.marginLeft = "60px";
        document.querySelector(".password").style.display = "flex";
        document.querySelector(".passwordField").style.marginLeft = "60px";
        document.querySelector(".modalWindow").style.left = "33%";
    }
}
