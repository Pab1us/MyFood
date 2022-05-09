// import express from 'express';
// import mysql from "mysql4";
// import multer from 'multer';

const express = require('express');
const mysql = require('mysql4');
const multer = require('multer');

const connection = mysql.createConnection({
    host: "sql4.freesqldatabase.com",
    user: "sql4490204",
    database: "sql4490204",
    password: "v37677qN7I"
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
    console.log(req.body.id);
    console.log(req.body.title);
    const id = req.body.id;
    const title = req.body.title;
    const tag = req.body.tag;
    const time = req.body.time;
    const user = req.body.user;
    const imageUrl = req.body.imageUrl;
    const text = req.body.text;
    const id_ingredients = req.body.id_ingredients;

    connection.query('INSERT INTO `Recipes`(`id`, `title`, `tag`, `time`, `user`, `imageUrl`, `text`, `id_ingredients`) VALUES ('+ connection.escape(id) +','+ connection.escape(title)+', '+ connection.escape(tag)+', '+ connection.escape(time)+', '+ connection.escape(user)+', '+ connection.escape(filedata.path)+', '+ connection.escape(text)+', '+  connection.escape(id_ingredients) +')', (error, result) => {
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
    connection.query('SELECT * FROM Recipes', (error, result) => {
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


//app.use(express.static('/public'));
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

