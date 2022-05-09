import mysql from "mysql4";
import express, {query} from "express";


let final;
let app = express();

const connection = mysql.createConnection({
    host: "sql4.freesqldatabase.com",
    user: "sql4490204",
    database: "sql4490204",
    password: "v37677qN7I"
});

const pool = mysql.createPool(connection);


app.get('/users', (request, response) => {
    pool.query('SELECT * FROM users', (error, result) => {
        if (error) throw error;

        response.send(result);
    });
});



const sql = "SELECT * FROM users";

connection.query(sql,
    function(err, results) {
        console.log(results); // собственно данные
        final = results.name;
        //sessionStorage.setItem("name", results.name.toString());
    },[final]);


    connection.end();



