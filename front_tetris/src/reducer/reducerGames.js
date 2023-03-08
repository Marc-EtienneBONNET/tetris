import { createSlice } from "@reduxjs/toolkit";

export const gamesSlice = createSlice({
    name:'games',
    initialState:{
        value: [],
    },
    reducers:{
        initGames: (state, action) => {
            state.value = action.payload;
        },
    }
})

export const { initGames } = gamesSlice.actions

export default gamesSlice.reducer;