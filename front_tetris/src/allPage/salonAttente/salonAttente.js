import { useSelector, useDispatch} from 'react-redux'
import { logger, accueil, salonReglage, salonAttente, game } from '../../reducer/reducerPages'
import { connectGame, disconnectGame } from '../../reducer/reducerGame'
import axios from 'axios';
import { ifNewInfoInGame } from '../TestNewInfo/testNewInfo'



export function ModuleSalonAttente(){
    
    let myGame = useSelector((state) => state.game.value)
    let user = useSelector((state) => state.user.value)
    let dispatch = useDispatch();

    async function takeActualGame(){
        let newGame;
        if (myGame.id){
            newGame = (await axios.post('http://localhost:3001/apiGames/getOneGames', {id:myGame.id, userId:user.id})).data;
            if (ifNewInfoInGame(myGame, newGame) === false)
                dispatch(connectGame(newGame))
            else
               setTimeout(takeActualGame, 1000);
        }

    }

    function handleQuitterGame(){
        axios.post('http://localhost:3001/apiGames/supPlayeurInGame', {gameId:myGame.id, userId:user.id});
        dispatch(disconnectGame());
        dispatch(accueil());
    }

    function startGame(){
        dispatch(game());
    }

    takeActualGame();
    if (myGame.nbPlayeur <= myGame.listePlayeur.length)
        startGame()
    return (
        <div>
            sallon attente
            <input type="button" value="quitter" onClick={() => {handleQuitterGame()}}/>
        </div>
    );
}