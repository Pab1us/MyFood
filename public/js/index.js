
// Запрос данных
let data;
let dataUser;

function createRequest() {
    let request = httpGet('/recipes');
    let requestUser = httpGet('/users');

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
    let titleRecipe = this.event.target.parentNode.parentNode.parentNode.querySelectorAll('.titleRecipe')[0].textContent;
    let newId;

    for (let i = 0; i < dataUser.length; i++) {
        if (dataUser[i].username === localStorage.getItem('username')) {
            if (dataUser[i].favorites) {
                newId = dataUser[i].favorites.length + 1;
            }
        }
    }

    // let newFavorite = {
    //     "id": idRecipe,
    //     "title": titleRecipe
    // }
    let newFavorite = {
        "id": 0,
        "title": "Масло",
        "id_user": 2
    }

    for (let i = 0; i < dataUser.length; i++) {
        if (dataUser[i].username === localStorage.getItem('username')) {
            if (dataUser[i].favorites) {
                dataUser[i].favorites.push(newFavorite);
            }
            console.log(dataUser[i].favorites);
        }
    }

    const data = JSON.stringify(newFavorite);
        let requestUserData = '/favorites';


        const xhrP = new XMLHttpRequest();
        xhrP.open("POST", requestUserData);
        xhrP.setRequestHeader("Content-Type", "application/json");

        xhrP.send(data);

    // for (let i = dataUser.length; i > 0; i--) {
    //     let requestUserDataClear = 'https://62489c3d20197bb4626b408f.mockapi.io/api/v1/usersData/' + (dataUser[i-1].id);
    //     const xhrD = new XMLHttpRequest();
    //
    //     xhrD.open("DELETE", requestUserDataClear);
    //     xhrD.setRequestHeader("Content-Type", "application/json");
    //
    //     xhrD.send(dataUser[i]);
    //     //xhrD.abort();
    // }
    //
    //
    // for (let i = 0; i < dataUser.length; i++) {
    //     let json;
    //     if (dataUser[i].favorites.length !== 0) {
    //         json = {
    //             name: dataUser[i].name,
    //             username: dataUser[i].username,
    //             lastName: dataUser[i].lastName,
    //             email: dataUser[i].email,
    //             password: dataUser[i].password,
    //             id: dataUser[i].id,
    //             favorites: dataUser[i].favorites,
    //         };
    //     } else {
    //         json = {
    //             name: dataUser[i].name,
    //             username: dataUser[i].username,
    //             lastName: dataUser[i].lastName,
    //             email: dataUser[i].email,
    //             password: dataUser[i].password,
    //             id: dataUser[i].id,
    //             favorites: dataUser[i].favorites,
    //         };
    //     }
    //
    //     const data = JSON.stringify(json);
    //     let requestUserData = 'https://62489c3d20197bb4626b408f.mockapi.io/api/v1/usersData';
    //
    //
    //     const xhrP = new XMLHttpRequest();
    //     xhrP.open("POST", requestUserData);
    //     xhrP.setRequestHeader("Content-Type", "application/json");
    //
    //     xhrP.send(data);
    //}
}
