import { createSlice } from "@reduxjs/toolkit";

export const gameSlice = createSlice({
    name:'game',
    initialState:{
        value: {},
    },
    reducers:{
        connectGame: (state, action) => {
            state.value = action.payload;
        },
        disconnectGame: (state) => {
            console.log('on est bien passer ici');
            state.value = {};
        },
        changeMap: (state, action) => {
            for (let i = 0; action.payload[i]; i++){
                state.value.map[action.payload[i].y][action.payload[i].x] = action.payload[i].value;
            }
        }
    }
})

export const { connectGame, disconnectGame, changeMap} = gameSlice.actions

export default gameSlice.reducer;