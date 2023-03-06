import { createStore, combineReducers} from 'redux'
import { pageReducer } from './pagesReducer'
import { userReducer } from './userReducer'
import { gamesReducer } from './gamesReducer'
import { gameReducer } from './gameReducer'


const store = createStore( combineReducers({
    page: pageReducer,
    user: userReducer,
    games: gamesReducer,
    game: gameReducer,
    }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store;