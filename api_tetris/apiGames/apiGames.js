let games = require('./../data/games')
const express = require('express');
const apiGames = express();


apiGames.get('/getGames', (req, res) => {
    let tmp = games.filter((element) => {
        if (element.start === false)
            return (element);
    })
    res.send(tmp);
})

apiGames.post('/addGames', (req, res) => {
    let newId = games[games.length - 1].id + 1;
    games.push({...req.body, id:newId});
    console.log(games);
    res.send({...req.body, id:newId});
})

apiGames.get('/addPlayeurInGame', (req, res) => {
    let game;

    for (let i = 0; games[i]; i++){
        if (games[i].id === req.body.id){
            games[i].playeur.push(req.body.playeur)
            game = games[i];
        }
    }
    res.send(game);
})

module.exports = apiGames;

