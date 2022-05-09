function btnCreateJson() {
    let inputTitle = document.querySelector(".inputTitle");
    let selectTag = document.querySelectorAll(".selectTag")[0];
    let inputTime = document.querySelector(".inputTime");
    let inputText = document.querySelector(".inputText");
    let inputIngredients = document.querySelectorAll(".inputIngredients");
    let btnCreate = document.querySelector(".btnCreate");
    let inputQuantity = document.querySelectorAll(".inputQuantity");
    let imgUrl;


    let requestGET = httpGet('/recipes');

    function httpGet(theUrl) {
        let xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", theUrl, false);
        xmlHttp.send(null);
        return xmlHttp.responseText;
    }

   let dataRecipe = JSON.parse(requestGET);
    let id = dataRecipe.length + 1;

    if(inputTitle.value && inputTime.value && inputText.value && inputIngredients[0].value){
        let json = {
            id: id,
            title: inputTitle.value,
            tag: selectTag.value,
            time: inputTime.value,
            text: inputText.value,
            //ingredients: inputIngredientsCollection(),
            imageUrl: imgUrl,
            user: localStorage.getItem('username'),
            id_ingredients: id
        };
        function inputIngredientsCollection() {
            let array = [];

            for (let i = 0; i< inputIngredients.length; i++) {
                let arrayItem = {
                    "name": inputIngredients[i].value,
                    "quantity": inputQuantity[i].value
                }
                array.push(arrayItem);
            }
            console.log(array);
            return array;
        }
        // Запрос данных
        let request = '/recipes';
        const data = JSON.stringify(json);
        const xhr = new XMLHttpRequest();

        xhr.open("POST", request);
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.send(data);
        btnCreate.textContent = 'Готово';
        btnCreate.style.backgroundColor = "green";
        btnCreate.style.pointerEvents = "none";
        btnCreate.style.opacity = "0.7";
    }
    else {
        console.log("error");
    }


}

function addIngredient ()  {
    let container_ingredients = document.querySelector(".container_ingredients");
    let ingredients = document.querySelector("#ingredients");
    let div = document.createElement("div");
    div.setAttribute("class", "newIngredients")
    div.innerHTML = ingredients.outerHTML;
    container_ingredients.append(div);
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
    let inputCount = document.querySelectorAll(".inputField");
    if(screenW < screenH) {
        for (let i = 0; i< inputCount.length; i++) {
            document.querySelectorAll(".inputField")[i].style.marginLeft = "0";
            document.querySelectorAll(".inputField")[i].style.marginRight = "0";
        }
    } else {
        for (let i = 0; i< inputCount.length; i++) {
            document.querySelectorAll(".inputField")[i].style.marginLeft = "70px";
            document.querySelectorAll(".inputField")[i].style.marginRight = "70px";
        }
    }
}
