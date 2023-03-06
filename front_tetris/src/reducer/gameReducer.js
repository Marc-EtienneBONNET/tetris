import { game } from '../data/games'

export const CONNECT_GAME = 'game/connect';
export const DISCONNECT_GAME = 'game/disconnect';
export const START_GAME = 'game/start';

function connectGame(payload){
    return payload;
}

function startGame(state){
    return {...state, start:!state.start};
}

function disconnectGame(){
    return {};
}

export function gameReducer(state = game, action){
    switch(action.type){
        case CONNECT_GAME:
            return connectGame(action.payload);
        case DISCONNECT_GAME:
            return disconnectGame();
        case START_GAME:
            return startGame(state);
        default :
            return state;
    }
}