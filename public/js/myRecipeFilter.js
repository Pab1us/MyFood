// Запрос данных
let data, dataUser, dataFavorites;

function createRequest() {
    let request = httpGet('/recipes');
    let requestUser = httpGet('/users');
    let requestFavorites = httpGet('/favorites');

    function httpGet(theUrl) {
        let xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", theUrl, false);
        xmlHttp.send(null);
        return xmlHttp.responseText;
    }

// Здесь наши данные
    data = JSON.parse(request);
    dataUser = JSON.parse(requestUser);
    dataFavorites = JSON.parse(requestFavorites);
}
createRequest();
console.log(data);

let tbl = document.querySelector(".recipes_blocks");
let tab = document.querySelector(".block_recipe_test");
let titleRecipe = document.querySelector(".titleRecipe");
let tag_type = document.querySelector(".tag_type");
let timeRecipe = document.querySelector(".timeRecipe");
let name_author = document.querySelector(".name_author");
let imgRecipe = document.querySelector(".imgRecipe");
let array = [];
let id_user;
let arrJson;

for (let i = 0; i< dataUser.length; i++) {
    if(dataUser[i].username === localStorage.getItem('username')) {
        id_user = dataUser[i].id_user;
        break;
    }
}

if(dataFavorites) {
    for (let j = 0; j< dataFavorites.length; j++) {
        if(dataFavorites[j].id_user === id_user) {
            let arrayItem = {
                "id": dataFavorites[j].id,
                "title": dataFavorites[j].title,
                "id_user": dataFavorites[j].id_user
            }
            array.push(arrayItem);
        }
    }
}


for (let i = 0; i< data.length; i++) {
    for (let j = 0; j< array.length; j++) {
        if(array[j].id === data[i].id && array[j].title === data[i].title) {
            titleRecipe.textContent = data[i].title;
            tag_type.textContent = data[i].tag;
            timeRecipe.textContent = data[i].time;
            name_author.textContent = data[i].user;
            imgRecipe.src = data[i].imageUrl;
            createTable();
        }
    }
}

// Создание и заполнение ячеек
function createTable() {
    let div = document.createElement("div");
    div.setAttribute("class", "block_recipe")
    div.innerHTML = tab.outerHTML;
    tbl.append(div);
}

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

function goLinkRecipe() {
    let targetUser = this.event.target.parentNode.getElementsByClassName('titleRecipe')[0];
    localStorage.setItem('titleRecipe', targetUser.textContent);
}

function btnDelete() {
    let targetRecipe = this.event.target.parentNode.parentNode.parentNode.querySelectorAll('.titleRecipe')[0].textContent;
    for (let j = 0; j< dataFavorites.length; j++) {
        if(dataFavorites[j].title === targetRecipe) {
            arrJson = JSON.stringify(dataFavorites[j]);
            let requestUserDataClear = '/favoritesDelete';
            const xhrD = new XMLHttpRequest();

            xhrD.open("POST", requestUserDataClear);
            xhrD.setRequestHeader("Content-Type", "application/json");

            xhrD.send(arrJson);
            break;
        }
    }
    document.querySelector(".modalWindow").style.display = "block";

}

function btnReload() {
    window.location.href = "myRecipe.html";
}
