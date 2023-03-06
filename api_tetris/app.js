const express = require('express');
const app = express();
const apiUsers = require('./apiUsers/apiUsers');
const apiGames = require('./apiGames/apiGames');
const path = require('path');


app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(express.static(path.join(__dirname, '/public')));
app.use('/',(req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    if (req.method === 'OPTIONS') {
        // On liste des méthodes et les entêtes valides
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept, Origin, Authorization');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
        return res.end();
    }
    next();
})

app.use('/apiUsers', apiUsers);
app.use('/apiGames', apiGames);

// app.use('/'(req, res) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     // On gère le cas où le navigateur fait un pré-contrôle avec OPTIONS ...
//     // ... pas besoin d'aller plus loin dans le traitement, on renvoie la réponse
//     if (res.method === 'OPTIONS') {
//         // On liste des méthodes et les entêtes valides
//         res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept, Origin, Authorization');
//         res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
//         return res.end();
//     }
// })

app.get('/', (req, res) => {
    res.send({test:'tester'})
})
app.listen(3001);