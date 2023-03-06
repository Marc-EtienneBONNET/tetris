import { games } from './../data/games'

export const INIT_GAMES = 'games/init';

function initGamesDispo(payload){
    console.log('ici : ',payload);
    return payload;
}


export function gamesReducer(state = games, action){
    console.log('on est la  : ',action.payload);
    switch(action.type){
        case INIT_GAMES:
            return initGamesDispo(action.payload);
        default :
            return state;
    }
}