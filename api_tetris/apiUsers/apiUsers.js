const express = require('express')
const apiUsers = express.Router();
let users = require('./../data/users')

apiUsers.get('/getUsers', (req, res) => {
    res.send(users);
})

apiUsers.post('/addUsers', (req, res) => {
    let newId = users[users.length - 1].id + 1;
    users.push({...req.body, id:newId});
    for (let i = 0; users[i]; i++){
        if (newId === users[i].id){
            res.send(users[i]);
        }
    }
})

apiUsers.post('/addIdGameInUser', (req, res) => {
    let user;
    for (let i = 0; users[i]; i++){
        if (req.body.userId === users[i].id){
            users[i].gameId = req.body.gameId;
            users[i].map = [[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1]]
            user = users[i];
            break;
        }
    }
    res.send(user);
})

apiUsers.post('/suppUsers', (req, res) => {
    users = users.filter((element) => {
        if (element.id != req.body.id)
            return element;
    })
})

apiUsers.post('/actif', (req, res) => {
    for (let i = 0; users[i]; i++){
        if (req.body.id === users[i].id)
        {
            users[i].actif = !users[i].actif;
            break ; 
        }
    }
})

apiUsers.post('/connection', (req, res) => {
    let user;
    for (let i = 0; users[i]; i++){
        if (req.body.name === users[i].name)
        {
            user = users[i];
            break ;
        }
    }
    if (!user)
        res.send({res:'User does not exist'});
    else if (user.actif === true)
        res.send({res:'User is already connected'});
    else{
        user.actif = true;
        res.send({res:'User is available', user:user});
    }
})



module.exports =  apiUsers 