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

apiGames.post('/getOneGames', (req, res) => {
    let game = {};

    for (let i = 0; games[i]; i++){
        if (games[i].id === req.body.id){
            for (let x = 0; games[i].listePlayeur[x]; x++)
            {
                if (games[i].listePlayeur[x].id === req.body.userId){
                    game = games[i];
                    break;
                }
            }
            break ;
        }
    }
    res.send(game);
})

apiGames.post('/addGames', (req, res) => {
    let newId = games[games.length - 1].id + 1;
    games.push({...req.body, id:newId});
    res.send({...req.body, id:newId});
})

apiGames.post('/addPlayeurInGame', (req, res) => {
    let game;

    for (let i = 0; games[i]; i++){
        if (games[i].id === req.body.gameId){
            games[i].listePlayeur.push(req.body.user)
            game = games[i];
        }
    }
    res.send(game);
})

apiGames.post('/supPlayeurInGame', (req, res) => {
    let game;

    games = games.map((element) => {
        if (element.id === req.body.gameId){
            element.listePlayeur = element.listePlayeur.filter((element) => {
                if (element.id != req.body.userId)
                    return (element);
            })
        }
        return (element);
    })
})

apiGames.post('/startGame', (req, res) => {

    let game;
   for (let i = 0; games[i]; i++){
        if (games[i].id === req.body.gameId){
            games[i].start = true;
            game = games[i];
        }
   }
   res.send(game);
})

module.exports = apiGames;

