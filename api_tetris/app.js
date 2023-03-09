const express = require('express');
const { createServer } = require("http");
const { Server } = require("socket.io");
let games = require('./data/games')
let users = require('./data/users')
const { takeUser, changeUser} = require('./functionSocket/user')
const { takeGame } = require('./functionSocket/map')
const {T, EclaireGauche, EclaireDroite, Carrer, AngleDroite, AngleGauche, Bar} = require('./data/piece')


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
      crono += 1;
      if (crono%10 === 0){
        console.log('ici :', crono);
        let myDataGame = {
          game : (takeGame(data.gameId)).game,
          user : (takeUser(data.id)).user
        };
        socket.emit('tictac', myDataGame);
      }
      else
        socket.emit('boucle');
    })
    socket.on('tictac', (data) => {
      let myDataGame = {
        game : (takeGame(data.gameId)).game,
        user : (takeUser(data.id)).user
      };
      socket.emit('tictac', myDataGame);
    })

    socket.on('changeUser', (data) => {
      changeUser(data.id, data);
     // socket.emit('refresh', myDataGame);
    })

    socket.on('newPiece', (data) => {
        let objGame = takeGame(data.gameId);
        let objUser = takeUser(data.id); 
        let tmpPiece;
        if (!data.piece.index){
          if (games[objGame.index].seriePiece[0]){
            tmpPiece = games[objGame.index].seriePiece[0];
          }
          else{
            tmpPiece = new Bar(0, 0, 0, 1)
            games[objGame.index].seriePiece.push(tmpPiece);
          }
        }
        else {
          if (games[objGame.index].seriePiece[data.piece.index + 1]){
              tmpPiece = games[objGame.index].seriePiece[data.piece.index + 1];
          }
          else{
            tmpPiece = new Bar(0, 0, games[objGame.index].seriePiece.length, 1)
            games[objGame.index].seriePiece.push(tmpPiece);
          }
        }
        users[objUser.index].piece = tmpPiece;
    })
  });
  
