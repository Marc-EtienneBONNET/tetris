import { useSelector, useDispatch} from 'react-redux'
import axios from 'axios';
import { connectGame, disconnectGame } from '../../reducer/reducerGame'
import { logger, accueil, salonReglage, salonAttente, game } from '../../reducer/reducerPages'

export function ModuleGame(){
    let myGame = useSelector((state) => state.game.value)
    let user = useSelector((state) => state.user.value)
    let dispatch = useDispatch();

    function handleQuitterGame(){
        axios.post('http://localhost:3001/apiGames/supPlayeurInGame', {gameId:myGame.id, userId:user.id});
        dispatch(disconnectGame());
        dispatch(accueil());
    }
    return (
        <div>
            game
            <input type="button" value="quitter" onClick={() => {handleQuitterGame()}}/>
        </div>
    );
}