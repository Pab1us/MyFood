checkTypeScreen();

function onClickMenu_mobile() {
    let value = document.querySelector(".contentMenu_mobile").style.display;
    if(value === "block"){
        document.querySelector(".contentMenu_mobile").style.display = "none";
    } else {
        document.querySelector(".contentMenu_mobile").style.display = "block";
    }
}

window.addEventListener('resize', checkTypeScreen);

function checkTypeScreen() {
    let screenW = window.screen.width;
    let screenH = window.screen.height;
    if(screenW < screenH) {
        document.querySelector(".containerTop").style.display = "none";
        document.querySelector(".containerTop_mobile").style.display = "block";
        document.querySelector(".authorization").style.display = "none";
    } else {
        document.querySelector(".containerTop").style.display = "block";
        document.querySelector(".containerTop_mobile").style.display = "none";
        document.querySelector(".authorization").style.display = "block";
    }
}
