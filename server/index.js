const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "urna",
})

app.use(cors());
app.use(express.json())

app.post("/register", (req, res) => {
    const { eleitor } = req.body;
    const { senador } = req.body;
    const { presidente } = req.body;

    let SQL = 'INSERT INTO votos (eleitor, senador, presidente) VALUES (?, ?, ?)';

    db.query(SQL, [eleitor, senador, presidente], (err, result) => {
        if(err) console.log(err);
        else res.send(result);
    }) 
});

app.get("/getCards", (req, res) => {
    let SQL = 'SELECT * FROM votos';

    db.query(SQL, (err, result) => {
        if (err) console.log(err);
        else res.send(result);
    });
});

app.put("/edit", (req, res) => {
//    console.log('debug02##')
    const { idvoto } = req.body;
    const { eleitor } = req.body;
    const { senador } = req.body;
    const { presidente } = req.body;

    let SQL = "UPDATE votos SET eleitor = ?, senador = ?, presidente = ? WHERE idvoto = ?";

    db.query(SQL, [eleitor, senador, presidente, idvoto], (err, result) => {
        if(err) console.log(err);
        else res.send(result);
    })
})

app.delete("/delete/:idvoto", (req, res) => {
    const { idvoto } = req.params;

    let SQL = "DELETE FROM votos WHERE idvoto = ?"

    db.query(SQL, [idvoto], (err, result) => {
        if(err) console.log(err);
        else res.send(result);
    })
})

app.listen(3001, ()=>{
    console.log('rodando servidor');
});
