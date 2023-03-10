let users = require('./../data/users')
let games = require('./../data/games')
let {takeGame} = require('./game')
const { Bar } = require('./../data/pieces/bar')


function takeUser(id){
    for (let i = 0; users[i]; i++){
        if (users[i].id === id)
            return ({index:i, user:users[i]});
    }
}

function changeUser(id, newUser){
    for (let i = 0; users[i]; i++){
        if (users[i].id === id){
            users[i] = newUser
            return (users[i]);
        }
    }
}

function newMap(user){
    let map = user.map.map((e) => {return e.map((e) => {return (e)});})
    map[user.piece.piece[0].x][user.piece.piece[0].y] = 1;
    map[user.piece.piece[1].x][user.piece.piece[1].y] = 1;
    map[user.piece.piece[2].x][user.piece.piece[2].y] = 1;
    map[user.piece.piece[3].x][user.piece.piece[3].y] = 1;
    return (map);
  }


  function newPiece(data){
    let objGame = takeGame(data.gameId);
    let objUser = takeUser(data.id);

    if (!data.piece.fin){
      if (games[objGame.index].seriePiece[0]){
        users[objUser.index].piece = games[objGame.index].seriePiece[0];
      }
      else{
        users[objUser.index].piece = new Bar(0, 15, 0, 1, objUser.user.map)
        games[objGame.index].seriePiece.push(new Bar(0, 15, 0, 1, objUser.user.map))
      }
    }
    else {
      if (games[objGame.index].seriePiece[data.piece.index + 1]){
        users[objUser.index].piece = games[objGame.index].seriePiece[data.piece.index + 1];
      }
      else{
        users[objUser.index].piece = new Bar(1, 0, games[objGame.index].seriePiece.length, 1, objUser.user.map)
        games[objGame.index].seriePiece.push(new Bar(1, 0, games[objGame.index].seriePiece.length, 1, objUser.user.map))
        }
    }
  }


module.exports = {takeUser, changeUser, newPiece, newMap}