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
        }
    }
})

export const { connectGame, disconnectGame } = gameSlice.actions

export default gameSlice.reducer;