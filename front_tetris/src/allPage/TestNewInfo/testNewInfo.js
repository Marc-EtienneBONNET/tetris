import _ from 'underscore';

function ifNewInfoInGames(actualGames, futurGames){
    if (actualGames.length !== futurGames.length)
        return (false);
    for (let i = 0; actualGames[i]; i++){
        if (_.isEqual(actualGames[i], futurGames[i]) === false)
            return (false);
        // else if (actualGames[i].listePlayeur.length != futurGames[i].listePlayeur.length)
        //     return (false);
    } 
    return (true);
}

function ifNewInfoInGame(actualGame, futurGame){

    if (_.isEqual(actualGame, futurGame) === false)
        return (false);
    return (true);
}

export {ifNewInfoInGame, ifNewInfoInGames}