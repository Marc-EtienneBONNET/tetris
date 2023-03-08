const express = require('express');
const { createServer } = require("http");
const { Server } = require("socket.io");
let Games = require('./data/games')


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

    socket.on('refresh', (data) => {
      let game;
      for (let i = 0; Games[i]; i++){
        if (Games[i].id === data.id){
          game = Games[i];
          break;
        }
      }
      socket.emit('refresh', game)
    })




  });
  
