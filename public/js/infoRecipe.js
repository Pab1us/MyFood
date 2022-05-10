// Запрос данных
let request = httpGet('/recipes');
let requestIngredients = httpGet('/ingredients');

function httpGet(theUrl)
{
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false);
    xmlHttp.send( null );
    return xmlHttp.responseText;
}
// Здесь наши данные
let data = JSON.parse(request);
let dataIngredients = JSON.parse(requestIngredients);

console.log(dataIngredients);

let ingredientsBlock = document.querySelector(".ingredientsBlock");
let titleRecipe = document.querySelector(".titleRecipe");
let tag_type = document.querySelector(".tag_type");
let timeRecipe = document.querySelector(".timeRecipe");
let name_author = document.querySelector(".name_author");
let imgRecipe = document.querySelector(".imgRecipe");
let textBlock = document.querySelector(".textBlock");

// Номер ячейки на которой отрабатывается удаление пользователя
let index;
let arrayIngredients;
console.log(data[0].title);
//Построение первоначальной таблицы с изначальными данными
for (let i = 0; i < data.length; i++) {
    if(data[i].title === localStorage.getItem('titleRecipe')) {
        titleRecipe.textContent = data[i].title;
        tag_type.textContent = data[i].tag;
        timeRecipe.textContent = data[i].time;
        name_author.textContent = data[i].user;
        imgRecipe.src = data[i].imageUrl;
        textBlock.textContent = data[i].text;
        for (let j = 0; j < dataIngredients.length; j++) {
            if(dataIngredients[j].id_recipe === data[i].id) {
                create(dataIngredients[j].name);
            }
        }
        break;
    }
}

// Создание и заполнение ячеек
function create(ingredient) {
    let div = document.createElement("div");
    div.setAttribute("class", "block_recipe")
    div.textContent = ingredient + " ";
    ingredientsBlock.append(div);
}

checkTypeScreen();


window.addEventListener('resize', checkTypeScreen);

function checkTypeScreen() {
    let screenW = window.screen.width;
    let screenH = window.screen.height;
    if(screenW < screenH) {
        document.querySelector(".block_recipe_info").style.display = "block";

    } else {
        document.querySelector(".block_recipe_info").style.display = "flex";
    }
}

function btnShare() {
    let copyIngredients = document.querySelector('.ingredientsBlock');
    navigator.clipboard.writeText("Ингредиенты: " + copyIngredients.textContent)
        .then(() => {
            // Получилось!
        })
        .catch(err => {
            console.log('хз но что-то не так', err);
        });

}
