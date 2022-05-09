// Запрос данных
// const mysql = require("mysql2");
//
// const connection = mysql.createConnection({
//     host: "sql4.freesqldatabase.com",
//     user: "sql4490204",
//     database: "sql4490204",
//     password: "v37677qN7I"
// });
//
// connection.connect(function(err){
//     if (err) {
//         return console.error("Ошибка: " + err.message);
//     }
//     else{
//         console.log("Подключение к серверу MySQL успешно установлено");
//     }
// });

let data;
let dataUser;

function createRequest() {
    let request = httpGet('https://62489c3d20197bb4626b408f.mockapi.io/api/v1/Recipes');
    let requestUser = httpGet('https://62489c3d20197bb4626b408f.mockapi.io/api/v1/usersData');

    function httpGet(theUrl) {
        let xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", theUrl, false);
        xmlHttp.send(null);
        return xmlHttp.responseText;
    }

// Здесь наши данные
    data = JSON.parse(request);
    dataUser = JSON.parse(requestUser);
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
let arrJson;

for (let i = 0; i< dataUser.length; i++) {
    if(dataUser[i].username === localStorage.getItem('username')) {
        if(dataUser[i].favorites) {
            for (let j = 0; j< dataUser[i].favorites.length; j++) {
                let favorites = dataUser[i].favorites[j];
                let arrayItem = {
                    "id": favorites.id,
                    "title": favorites.title
                }
                array.push(arrayItem);
            }
        }
    }
}
console.log(array);


for (let i = 0; i< data.length; i++) {
    for (let j = 0; j< array.length; j++) {
        if(array[j].id === data[i].id.toString() && array[j].title === data[i].title) {
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
    //createRequest();
    let targetRecipe = this.event.target.parentNode.parentNode.parentNode.querySelectorAll('.titleRecipe')[0].textContent;
    for (let i = 0; i< dataUser.length; i++) {
        if(dataUser[i].username === localStorage.getItem('username')) {
            if(dataUser[i].favorites) {
                for (let j = 0; j< dataUser[i].favorites.length; j++) {
                    let favorites = dataUser[i].favorites[j];
                    if(favorites.title === targetRecipe) {
                        dataUser[i].favorites.splice(j, 1);
                        array.splice(j, 1);

                    }
                   console.log(dataUser[i]);
                }
            }
        }
    }
    arrJson = JSON.stringify(array);
    for (let i = dataUser.length; i > 0; i--) {
        let requestUserDataClear = 'https://62489c3d20197bb4626b408f.mockapi.io/api/v1/usersData/' + (dataUser[i-1].id);
        const xhrD = new XMLHttpRequest();

        xhrD.open("DELETE", requestUserDataClear);
        xhrD.setRequestHeader("Content-Type", "application/json");

        xhrD.send();
        //xhrD.abort();
    }


    for (let i = 0; i< dataUser.length; i++) {
        let json;
        if(dataUser[i].favorites.length !== 0) {
             json = {
                name: dataUser[i].name,
                username: dataUser[i].username,
                lastName: dataUser[i].lastName,
                email: dataUser[i].email,
                password: dataUser[i].password,
                id: dataUser[i].id,
                favorites: JSON.parse(arrJson),
            };
        } else {
             json = {
                name: dataUser[i].name,
                username: dataUser[i].username,
                lastName: dataUser[i].lastName,
                email: dataUser[i].email,
                password: dataUser[i].password,
                id: dataUser[i].id,
                favorites: [],
            };
        }

        const data = JSON.stringify(json);
        let requestUserData = 'https://62489c3d20197bb4626b408f.mockapi.io/api/v1/usersData';


        const xhrP = new XMLHttpRequest();
        xhrP.open("POST", requestUserData);
        xhrP.setRequestHeader("Content-Type", "application/json");

        xhrP.send(data);
        //xhrP.abort();
    }

    document.querySelector(".modalWindow").style.display = "block";

}

function btnReload() {
    window.location.href = "myRecipe.html";
}
