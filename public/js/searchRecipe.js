// Запрос данных
let request = httpGet('https://62489c3d20197bb4626b408f.mockapi.io/api/v1/Recipes');

function httpGet(theUrl)
{
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false);
    xmlHttp.send( null );
    return xmlHttp.responseText;
}
// Здесь наши данные
let data = JSON.parse(request);
console.log(data);


let ingredientsBlock = document.querySelector(".ingredientsBlock");
let tab = document.querySelector(".block_recipe_test");
let name_ingredient = document.querySelector(".name_ingredient");
let check_ingredients = document.querySelector(".check_ingredients");
let filter_ingredients = document.querySelector(".filter_ingredients");
let name_author = document.querySelector(".name_author");
let imgRecipe = document.querySelector(".imgRecipe");
let textBlock = document.querySelector(".textBlock");

// Номер ячейки на которой отрабатывается удаление пользователя
let index;
let arrayIngredients = [];
console.log(data[0].title);
//Построение первоначальной таблицы с изначальными данными
for (let i = 0; i < data.length; i++) {
        let ingredientsData = data[i].ingredients;
        for (let j = 0; j < ingredientsData.length; j++) {
            arrayIngredients.push(ingredientsData[j].name);
        }
}
let arrayIngredientsFilter = arrayIngredients.filter((item, index) => {
    return arrayIngredients.indexOf(item) === index
});

console.log(arrayIngredientsFilter);

for (let i = 0; i < arrayIngredientsFilter.length; i++) {
    create(arrayIngredientsFilter[i]);
}

// Создание и заполнение ячеек
function create(ingredient) {
    let div = document.createElement("option");
    div.setAttribute("class", "check_ingredients_new")
    div.setAttribute("multiple", "multiple")
    div.textContent = ingredient;
    filter_ingredients.append(div);
}


function selectIngredient() {
    let value = filter_ingredients.value;
    document.querySelector(".inputIngredients").value += value + ";";
    console.log(value);
}

function btnSearch() {
    let valueTextField =  document.querySelector(".inputIngredients").value;
    //valueTextField = valueTextField.replace(/\s+/g, '');
    let mas = valueTextField.split(';')
    let filterData = [];
    filterData.length = 0;
    let arrayIngredientsFilter = mas.filter((item, index) => {
        return mas.indexOf(item) === index
    });
    console.log(arrayIngredientsFilter);

    if(document.querySelectorAll(".block_recipe")){
        for (let i = document.querySelectorAll(".block_recipe").length -1; i >= 0;  i--) {
            document.querySelectorAll(".block_recipe")[i].remove()
        }
    }

    for (let i = 0; i < data.length; i++) {
        let ingredientsData = data[i].ingredients;
        let key = 0;
        for (let j = 0; j < ingredientsData.length; j++) {
            for (let k = 0; k < arrayIngredientsFilter.length - 1; k++) {
                if(arrayIngredientsFilter[k] === ingredientsData[j].name) {
                    key++;
                    if(key === arrayIngredientsFilter.length - 1) {
                        key = 0;
                        console.log(data[i]);
                        filterData.push(data[i]);
                    }

                }
            }
        }
    }

    let tbl = document.querySelector(".recipes_blocks");
    let tab = document.querySelector(".block_recipe_test");
    let titleRecipe = document.querySelector(".titleRecipe");
    let tag_type = document.querySelector(".tag_type");
    let timeRecipe = document.querySelector(".timeRecipe");
    let name_author = document.querySelector(".name_author");
    let imgRecipe = document.querySelector(".imgRecipe");



    //tbl.outerHTML = "";

    for (let i = 0; i< filterData.length; i++) {
        titleRecipe.textContent = filterData[i].title;
        tag_type.textContent = filterData[i].tag;
        timeRecipe.textContent = filterData[i].time;
        name_author.textContent = filterData[i].user;
        imgRecipe.src = filterData[i].imageUrl;
        createTable();
    }

    // Создание и заполнение ячеек
    function createTable() {
        let div = document.createElement("div");
        div.setAttribute("class", "block_recipe")
        div.innerHTML = tab.outerHTML;
        tbl.append(div);
    }

}


function goLinkRecipe() {
    let targetUser = this.event.target.parentNode.getElementsByClassName('titleRecipe')[0];
    localStorage.setItem('titleRecipe', targetUser.textContent);
}
