import { useSelector, useDispatch} from 'react-redux'
import axios from 'axios';
import { initGames } from '../../reducer/reducerGames'
import { connectGame, disconnectGame } from '../../reducer/reducerGame'
import { logger, accueil, salonReglage, salonAttente, game } from '../../reducer/reducerPages'
import { ifNewInfoInGames } from '../TestNewInfo/testNewInfo'


export function ModuleGamesDispo(){
    let games = useSelector((state) => state.games.value)
    let user = useSelector((state) => state.user.value)
    let dispatch = useDispatch();

    async function takeGamesDispo(){
        let newGames = (await axios.get('http://localhost:3001/apiGames/getGames')).data;
        if (ifNewInfoInGames(games, newGames) === false)
            dispatch(initGames(newGames))
        else
            setTimeout(takeGamesDispo, 1000);
    }

    async function handleJoinNewGame(element){
        let game = (await axios.post('http://localhost:3001/apiGames/addPlayeurInGame', {gameId:element.id, user:user})).data;
        dispatch(connectGame(game));
        dispatch(salonAttente());
    }

    function takeListeGamesDispo(){
        let listGames = [];
        games.forEach((element) => {
            if (element.start === false){
                listGames.push(
                    <div key={element.id}>
                        <h3>ID : {element.id} | dificulte : {element.vitesse} | nb playeur : {element.listePlayeur.length}/{element.nbPlayeur}</h3>
                        <input onClick={() => {handleJoinNewGame(element)}} type='Button' defaultValue='Rejoindre'/>
                    </div>
                )
            }
        })
        return (
            <div>
                <h1>All game disponnible</h1>
                {listGames}
            </div>);
    }

    takeGamesDispo();
    return (takeListeGamesDispo());
}