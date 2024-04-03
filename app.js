const mysql = require("mysql2");
const express = require("express");
const cors = require('cors');
const expresshbs = require("express-handlebars").engine;
const bodyParser = require('body-parser');

 
const app = express();

app.use(cors({ origin: 'http://localhost:5173' }))

const connection  = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "gleb",
    password: "180578lord"
});
 
app.engine("handlebars",expresshbs({ 
    defaultLayout: 'main'}));
app.set("view engine", "handlebars");
app.use(bodyParser.json());

app.get("/family",  function(req, res){
    connection.query("SELECT * FROM family", function(err, data) {
      if(err) return console.log(err);
      res.send(data);
    });
});
app.get("/family/:id", function(req, res){
    const id = req.params.id;
    connection.query("SELECT * FROM family WHERE id=?", [id], function(err, data) {
      if(err) return console.log(err);
      res.send(data);
    });
  });
  app.post("/family", function (req, res) {
         
    if(!req.body) return res.sendStatus(400);

    const name = req.body.name;
    const surname = req.body.surname;
    const patronymic = req.body.patronymic;
    const birthday = req.body.birthday;
    connection.query("INSERT INTO family (name, surname, patronymic, birthday) VALUES (?,?,?,?)", [name, surname, patronymic, birthday], function(err, data) {
      if(err) return console.log(err);
      res.redirect("/family");
    });
});
app.delete("/family/:id", function(req, res){
          
    const id = req.params.id;
    connection.query("DELETE FROM family WHERE id=?", [id], function(err, data) {
      if(err) return console.log(err);
      res.redirect("/family");
    });
  });
  app.put("/family/:id", function (req, res) {
         
    if(!req.body) return res.sendStatus(400);
    const name = req.body.name;
    const surname = req.body.surname;
    const patronymic = req.body.patronymic;
    const birthday = req.body.birthday;
    const id = req.params.id;
     
    connection.query("UPDATE family SET name=?, surname=?, patronymic=?, birthday=? WHERE id=?", [name, surname, patronymic, birthday, id], function(err, data) {
      if(err) return console.log(err);
      res.redirect("/family");
    });
  });
  app.patch("/family/:id", function (req, res) {
         
    if(!req.body) return res.sendStatus(400);
    const name = req.body.name;
    const surname = req.body.surname;
    const id = req.params.id;
     
    connection.query("UPDATE family SET name=?, surname=? WHERE id=?", [name, surname, id], function(err, data) {
      if(err) return console.log(err);
      res.redirect("/family");
    });
  });
  app.listen(3000, function(){
    console.log("Сервер ожидает подключения...");
  });