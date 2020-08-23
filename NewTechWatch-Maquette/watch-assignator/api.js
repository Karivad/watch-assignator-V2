const MongoClient = require('mongodb').MongoClient;                                                                     //Appel à la bibliothèque de node pour récupérer le module mongodb
const url = 'mongodb://localhost:27017/dbgenerator';                                                                    //spécification de l'url pour ce connecter à MongoDb compass
const port = process.env.PORT || 8000;                                                                                  //spécification du port de connexion  
const express = require("express");                                                                                     //connexion à la bibliothèque express
const bodyParser = require("body-parser");                                                                              //connexion à la bibliothèque "body-parser" pour lire le contenu du body
const app = express();                                                                                                  //initialisation d'une variable pour appeler la fonction express                                          
let studentTab = [];                                                                                                    //initialisation d'une variable pour pousser les données                                                         
const dbName = 'watchAssignator'; 

MongoClient.connect(url, { useUnifiedTopology: true }, function (err, client) {  
    if (err) throw err;                                                                                                 //connexion à la base de donnée de la collection watch assignator
    db = client.db(dbName);                                                                                             //Inialisation d'une variable db qui prend la valeur de la collection de la base de données watch assignator
    var dbtest = client.db("watchAssignator"); 

        //Students                                                                                                      //creation de l'url student pour trouver un nom d'étudiant
        app.get('/students', async function (req, res) {
            let test = await dbtest.collection("students").find().toArray()                                             //Récupération d'une seule données depuis la collection students
            res.json(test);                                     
        });

        app.use(bodyParser.json());                                                                                     //Route permettant de lire le contenu de ce qu'il y a dans le body
        app.use(express.urlencoded({ extended: true }));

        app.post('/students', function (req, res) {                                                                     //Route pour intégrer un nom d'étudiant dans la collection student
        let student = req.body;                                                                                         // req, res = req.bodyname = name (..input)
        studentTab.push(student);                                                                                       //intégration des noms d'étudiants dans un array
                                                                                            //contrôle
        dbtest.collection("students").insertOne(student, function (err, result) {
            if (err) throw err;
            console.log("1 document inserted");                                                                         //contrôle
            res.json({
                msg : "Ok"
            });
        });
    });

    app.delete('/students/:name', function (req, res) {                                                                 //Route effacer un étudiant de la collection Student
        dbtest.collection("students").deleteOne({ name: req.params.name }, function (err, result) {
            if (err) throw err;
            console.log("1 document deleted");
            res.send("OK");
        });
    });


        //Project
    app.get('/subject', async function (req, res) {                                                                 //Route pour transmettre les données de la collection subject
        console.log("GET /subject")
        let test = await dbtest.collection("subject").find().toArray();
        console.log(test);
        res.json(test);
    });

    app.get('/subject/:name', async function (req, res) {                                                                   //Route pour transmettre le nom d'un projet dans la collection subject
        let test = await dbtest.collection("subject").insertOne({ name: req.params.name }, function (err, result) {
            if (err) throw err;
            res.json(test);
        });
    });

    app.post('/subject', async function (req, res) {                                                                        //Route pour récupérer les données de la collection subject
        let Subject = req.body;
        console.log(Subject);
        dbtest.collection("subject").insertOne(Subject, function (err, result) {
            if (err) throw err;
            console.log("1 subject inserted");
            res.json({
                msg : "Ok"
            });
        })
    })

    

    app.delete('/subject/:name', function (req, res) {                                                                        //Route pour effacer le nom d'un projet
        dbtest.collection("subject").deleteOne({ name: req.params.name }, function (err, result) {
            if (err) throw err;
            console.log("1 document deleted");
            res.send("OK");
        })
    });

     app.get('/deadline', async function (req, res) {                                                                           //Route pour transmettre les données de la collection subject
        console.log("GET /deadline")
        let test = await dbtest.collection("deadline").find().toArray();
        console.log(test);
        res.json(test);
    });
});

   














    app.listen(port, () => {
        console.log('Server app listening on port' + port)
    });