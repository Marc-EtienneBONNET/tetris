import { createSlice } from "@reduxjs/toolkit";

export const pagesSlice = createSlice({
    name:'pages',
    initialState:{
        value: 'Logger',
    },
    reducers:{
        logger: (state) => {
            state.value = 'Logger';
        },
        accueil: (state) => {
            state.value = 'Accueil';
        },
        salonReglage: (state) => {
            state.value = 'SalonReglage';
        },
        salonAttente: (state) => {
            state.value = 'SalonAttente';
        },
        game: (state) => {
            state.value = 'Game';
        },
    }
})

export const { logger, accueil, salonReglage, salonAttente, game } = pagesSlice.actions

export default pagesSlice.reducer;