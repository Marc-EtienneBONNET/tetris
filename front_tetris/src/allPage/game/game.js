import { useSelector, useDispatch} from 'react-redux'
import axios from 'axios';
import { connectGame, disconnectGame, changeMap } from '../../reducer/reducerGame'
import { logger, accueil, salonReglage, game } from '../../reducer/reducerPages'
import { ModuleGameMap } from './map/map'
import { connectUser, disconnectUser } from './../../reducer/reducerUser'

const { io } = require("socket.io-client");
const socket = io("http://localhost:3001");



export function ModuleGame(){
    let user = useSelector((state) => state.user.value)
    let dispatch = useDispatch();
   


    function handleQuitterGame(){
        axios.post('http://localhost:3001/apiGames/supPlayeurInGame', {gameId:user.gameId, userId:user.id});
        dispatch(disconnectGame());
        dispatch(connectUser({...user,gameId:-1, map:[]}));
        dispatch(accueil());
    }

    return (
        <div>
            <input type="button" value="quitter" onClick={() => {handleQuitterGame()}}/>
           <ModuleGameMap />
        </div>
    );
}


