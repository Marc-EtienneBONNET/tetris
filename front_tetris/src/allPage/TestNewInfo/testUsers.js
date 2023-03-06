import _ from 'underscore';


function ifNewInfoInUsers(actualUsers, futurUsers){
    if (actualUsers.length !== futurUsers.length)
        return (false);
    for (let i = 0; actualUsers[i]; i++){
        if (_.isEqual(actualUsers[i], futurUsers[i]) === false)
            return (false);
    } 
    return (true);
}

function ifNewInfoInGames(actualGames, futurGames){
    if (actualGames.length !== futurGames.length)
        return (false);
    for (let i = 0; actualGames[i]; i++){
        if (_.isEqual(actualGames[i], futurGames[i]) === false)
            return (false);
    } 
    return (true);
}

export {ifNewInfoInUsers, ifNewInfoInGames}