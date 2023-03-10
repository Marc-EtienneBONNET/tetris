let games = require('./../data/games')

function takeGame(id){
    for (let i = 0; games[i]; i++){
        if (games[i].id === id)
            return ({index:i, game:games[i]});
    }
}

module.exports = {takeGame:takeGame}
