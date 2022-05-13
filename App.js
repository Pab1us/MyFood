
const express = require('express');
const mysql = require('mysql4');
const multer = require('multer');

const connection = mysql.createConnection({
    host: "sql4.freemysqlhosting.net",
    user: "sql4491903",
    database: "sql4491903",
    password: "SjsMH4f6YF"
});


let app = express();
let filedata;
app.use(express.json())
app.use(express.static('public'));

app.post('/favorites', function(req, res) {
    console.log(req.body.id);
    console.log(req.body.title);
    const id = req.body.id;
    const title = req.body.title;
    const id_user = req.body.id_user;
    connection.query('INSERT INTO `favorites`(`id`, `title`, `id_user`) VALUES ('+ connection.escape(id) +','+ connection.escape(title)+', '+  connection.escape(id_user) +')', (error, result) => {
        if (error) {
            console.log(error);
            res.sendStatus(500);
            return;
        }
        else {
            console.log(result);
            res.send(result);
        }
    });
});

app.post('/users', function(req, res) {
    console.log(req.body.id);
    console.log(req.body.title);
    const id = req.body.id;
    const name = req.body.name;
    const username = req.body.username;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;
    const id_user = req.body.id_user;

    connection.query('INSERT INTO `users`(`id`, `name`, `username`, `lastName`, `email`, `password`, `id_user`) VALUES ('+ connection.escape(id) +','+ connection.escape(name)+', '+ connection.escape(username)+', '+ connection.escape(lastName)+', '+ connection.escape(email)+', '+ connection.escape(password)+', '+  connection.escape(id_user) +')', (error, result) => {
        if (error) {
            console.log(error);
            res.sendStatus(500);
            return;
        }
        else {
            console.log(result);
            res.send(result);
        }
    });
});

app.post('/recipes', function(req, res) {
    const id = req.body.id;
    const title = req.body.title;
    const tag = req.body.tag;
    const time = req.body.time;
    const user = req.body.user;
    const imageUrl = filedata.path;
    const text = req.body.text;
    const ingredients = req.body.ingredients;

    connection.query('INSERT INTO `recipes`(`id`, `title`, `tag`, `time`, `user`, `imageUrl`, `text`, `ingredients`) VALUES ('+ connection.escape(id) +','+ connection.escape(title)+', '+ connection.escape(tag)+', '+ connection.escape(time)+', '+ connection.escape(user)+', '+ connection.escape(imageUrl)+', '+ connection.escape(text)+', '+  connection.escape(ingredients) +')', (error, result) => {
        if (error) {
            console.log(error);
            res.sendStatus(500);
            return;
        }
        else {
            console.log(result);
            res.send(result);
        }
    });
});

app.post('/ingredients', function(req, res) {
        const id = req.body.id;
        const name = req.body.name;
        const quantity = req.body.quantity;
        const type = req.body.type;
        const id_recipe = req.body.id_recipe;

        connection.query('INSERT INTO `ingredients`(`id`, `name`, `quantity`, `type`, `id_recipe`) VALUES ('+ connection.escape(id) +','+ connection.escape(name)+', '+ connection.escape(quantity)+', '+ connection.escape(type)+', '+ connection.escape(id_recipe)+')', (error, result) => {
            if (error) {
                console.log(error);
                res.sendStatus(500);
                return;
            }
            else {
                console.log(result);
                res.send(result);
            }
        });
});

app.post('/favoritesDelete', function(req, res) {
    const title = req.body.title;
    const sql = "DELETE FROM `favorites` WHERE title=?";
    const data = [title];
    connection.query(sql, data, function(error, results) {
        if (error) {
            console.log(error);
            res.sendStatus(500);
            return;
        }
        else {
            console.log(data);
            res.send(results);
        }
    });
});

app.get('/users', (request, response) => {
    connection.query('SELECT * FROM users', (error, result) => {
        if (error) throw error;

        response.send(result);
    });
});

app.get('/favorites', (request, response) => {
    connection.query('SELECT * FROM favorites', (error, result) => {
        if (error) throw error;

        response.send(result);
    });
});

app.get('/recipes', (request, response) => {
    connection.query('SELECT * FROM recipes', (error, result) => {
        if (error) throw error;

        response.send(result);
    });
});

app.get('/ingredients', (request, response) => {
    connection.query('SELECT * FROM ingredients', (error, result) => {
        if (error) throw error;

        response.send(result);
    });
});



app.use(express.static(__dirname));
let storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './upload');
    },
    filename: function (req, file, cb) {
        cb(null , file.originalname);
    }
});
app.use(multer({storage:storage}).single("filedata"));


app.post("/upload", function (req, res, next) {

     filedata = req.file;
    console.log(filedata);
    if(!filedata)
        res.send("Ошибка при загрузке файла");
    else
        res.send("Файл загружен");
});

// запускаем сервер на порту 3000
app.listen(3000);
// отправляем сообщение
console.log('Сервер стартовал!');
