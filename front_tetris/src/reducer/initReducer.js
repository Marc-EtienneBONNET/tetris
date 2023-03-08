import { configureStore } from '@reduxjs/toolkit'
import pagesSlice from './reducerPages'
import userSlice from './reducerUser'
import gamesSlice from './reducerGames'
import gameSlice from './reducerGame'

export default configureStore({
    reducer:{
        pages: pagesSlice,
        user: userSlice,
        games: gamesSlice,
        game: gameSlice,
    }
})