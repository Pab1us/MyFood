
checkLogin();

function checkLogin() {
    if (localStorage.getItem('username')) {
        document.querySelector(".authorization_block").style.display = "none";
        document.querySelector(".logIn_block").style.display = "flex";
        document.querySelector(".navLogin_mobile").style.display = "block";
        document.querySelector(".navNoLogin_mobile").style.display = "none";
        document.querySelector(".navLogin").style.display = "block";
        document.querySelector(".navNoLogin").style.display = "none";
        document.querySelector(".loginUser").textContent = localStorage.getItem('username');
    } else {
        document.querySelector(".navLogin_mobile").style.display = "none";
        document.querySelector(".navNoLogin_mobile").style.display = "block";
        document.querySelector(".navLogin").style.display = "none";
        document.querySelector(".navNoLogin").style.display = "block";
    }
}

function logOut() {
    localStorage.removeItem('username');
    localStorage.setItem('statusLogin', 'false');
}
