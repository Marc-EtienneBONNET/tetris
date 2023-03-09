import { useSelector, useDispatch} from 'react-redux'
import axios from 'axios';
import { connectGame, disconnectGame, changeMap } from '../../reducer/reducerGame'
import { logger, accueil, salonReglage, game } from '../../reducer/reducerPages'
import { ModuleGameMap } from './map/map'
const { io } = require("socket.io-client");
const socket = io("http://localhost:3001");



export function ModuleGame(){
    let user = useSelector((state) => state.user.value)
    let game = useSelector((state) => state.game.value)
    let dispatch = useDispatch();
   
    async function startGame(){
        let myGame = (await axios.post('http://localhost:3001/apiGames/supPlayeurInGame', {gameId:user.gameId})).data;
        console.log('coucou');
        dispatch(connectGame(myGame));
    }
    function handleQuitterGame(){
        axios.post('http://localhost:3001/apiGames/supPlayeurInGame', {gameId:user.gameId, userId:user.id});
        dispatch(disconnectGame());
        dispatch(accueil());
    }

    console.log(game)
    if (game.nbPlayeur <= game.listePlayeur.length){
        startGame();
    }
    return (
        <div>
            <input onClick={() => {dispatch(changeMap([{x:1,y:1,value:1}]))}} type="button" value='test'/>
            game
            <input type="button" value="quitter" onClick={() => {handleQuitterGame()}}/>
           <ModuleGameMap />
        </div>
    );
}


