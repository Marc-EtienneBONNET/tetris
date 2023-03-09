let users = require('./../data/users')

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

module.exports = {takeUser:takeUser, changeUser:changeUser}