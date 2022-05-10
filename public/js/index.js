
// Запрос данных
let data,
    dataUser,
    dataFavorites;

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


let tbl = document.querySelector(".recipes_blocks");
let tab = document.querySelector(".block_recipe_test");
let titleRecipe = document.querySelector(".titleRecipe");
let tag_type = document.querySelector(".tag_type");
let timeRecipe = document.querySelector(".timeRecipe");
let name_author = document.querySelector(".name_author");
let imgRecipe = document.querySelector(".imgRecipe");
let id_recipe = document.querySelector(".id_recipe");

//Построение первоначальной таблицы с изначальными данными
for (let i = 0; i< data.length; i++) {
    titleRecipe.textContent = data[i].title;
    tag_type.textContent = data[i].tag;
    timeRecipe.textContent = data[i].time;
    name_author.textContent = data[i].user;
    imgRecipe.src = data[i].imageUrl;
    id_recipe.textContent = data[i].id;
    createTable();
}
console.log(data);
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

function addFavorite() {
    let idRecipe = this.event.target.parentNode.parentNode.querySelectorAll('.id_recipe')[0].textContent;
    let titleRecipe = this.event.target.parentNode.parentNode.querySelectorAll('.titleRecipe')[0].textContent;
    let id_user;

    for (let i = 0; i < dataUser.length; i++) {
        if (dataUser[i].username === localStorage.getItem('username')) {
            id_user = dataUser[i].id_user;
            break;
        }
    }

    let newFavorite = {
        "id": Number(idRecipe),
        "title": titleRecipe,
        "id_user": id_user
    }

    let findObj = dataFavorites.find(o => o.id === newFavorite.id && o.id_user === newFavorite.id_user);

    if(!findObj)
     {
        const data = JSON.stringify(newFavorite);
        let requestUserData = '/favorites';

        const xhrP = new XMLHttpRequest();
        xhrP.open("POST", requestUserData);
        xhrP.setRequestHeader("Content-Type", "application/json");

        xhrP.send(data);
    }


}
