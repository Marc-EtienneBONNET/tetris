import { myUser } from './../data/users'

export const CONNECT_MY_USER = 'user/connect';
export const DISCONNECT_MY_USER = 'user/disconnect';

function connectUser(user){
    return {...user}
}

function disconnectUser(){
    return {}
}


export function userReducer(state = myUser, action){
    switch (action.type){
        case CONNECT_MY_USER:
            return connectUser(action.payload);
        case DISCONNECT_MY_USER:
            return disconnectUser();
        default :
            return state;
    }
}