import { useSelector, useDispatch} from 'react-redux'
import axios from 'axios';
import { connectUser, disconnectUser } from '../../reducer/reducerUser'
import { logger, accueil, salonReglage, game } from '../../reducer/reducerPages'
import { ModuleHistUser } from './histGame'
import { ModuleGamesDispo } from './gamesDispo'
import { connectGame, disconnectGame, changeMap } from '../../reducer/reducerGame'


export function ModuleAccueil(){
    let user = useSelector((state) => state.user.value)
    let game = useSelector((state) => state.game.value)
    let dispatch = useDispatch();

    function handleSupProfile(state){
        axios.post('http://localhost:3001/apiUsers/suppUsers', {id:user.id});
        dispatch(disconnectUser());
        dispatch(logger());
    }

    function handleDisconnectedProfile(state){
        axios.post('http://localhost:3001/apiUsers/actif', {id:user.id});
        dispatch(disconnectUser());
        dispatch(logger());
    }

    if (user.gameId === -1 && game.id )
        dispatch(disconnectGame());
    return (
        <div>
            <input onClick={() => {handleDisconnectedProfile()}} type="button" value="Disconnected"/>
            <input onClick={() => {handleSupProfile()}} type="button" value="Sup profile"/>
            <input onClick={() => {dispatch(salonReglage())}} type="button" value="new Game"/>
            <ModuleHistUser/>
            <ModuleGamesDispo/>
        </div>
    );
}