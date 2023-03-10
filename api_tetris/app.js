const express = require('express');
const { createServer } = require("http");
const { Server } = require("socket.io");
let games = require('./data/games')
let users = require('./data/users')
const { takeUser, changeUser, newPiece, newMap} = require('./functionSocket/user')
const { takeGame } = require('./functionSocket/game')
const {T, EclaireGauche, EclaireDroite, Carrer, AngleDroite, AngleGauche, Bar} = require('./data/pieces/bar')


const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:3000"
    }
  });


const path = require('path');
const apiGames = require('./apiGames/apiGames');
const apiUsers = require('./apiUsers/apiUsers');





app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(express.static(path.join(__dirname, '/public')));



app.use('/',(req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
})

app.use('/apiUsers', apiUsers);
app.use('/apiGames', apiGames);


app.get('/', (req, res) => {
    res.send({test:'tester'})
})
httpServer.listen(3001);

io.on("connection", (socket) => {

  let crono = 0;

    socket.on('boucle', (data) =>{
      if (data.crono === true)
        crono += 1;
      if (crono%10 === 0){
        let objUserTmp = takeUser(data.myUser.id);
        let myDataGame = {
          game : (takeGame(data.myUser.gameId)).game,
          user : objUserTmp.user
        };
        if (users[objUserTmp.index].piece.index != -1){
          users[objUserTmp.index].piece.mouvPiece(1,users[objUserTmp.index].piece.x, users[objUserTmp.index].piece.y + 1, users[objUserTmp.index].map);
          if (users[objUserTmp.index].piece.fin === true){
            users[objUserTmp.index].map = newMap(users[objUserTmp.index]);
            newPiece(users[objUserTmp.index]);
          }
        }
        socket.emit('tictac', myDataGame);
      }
      else
        socket.emit('boucle');
    })

    socket.on('changeUser', (data) => {
      changeUser(data.id, data);
    })


    socket.on('newPiece', (data) => { newPiece(data) })
  });
  

