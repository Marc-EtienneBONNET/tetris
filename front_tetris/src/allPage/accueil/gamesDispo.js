import { useSelector, useDispatch} from 'react-redux'
import axios from 'axios';
import { initGames } from '../../reducer/reducerGames'
import { connectGame, disconnectGame } from '../../reducer/reducerGame'
import { logger, accueil, salonReglage, game } from '../../reducer/reducerPages'
import { ifNewInfoInGames } from '../TestNewInfo/testNewInfo'
import { connectUser } from '../../reducer/reducerUser'


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
        let myGame = (await axios.post('http://localhost:3001/apiGames/addPlayeurInGame', {gameId:element.id, user:user})).data;
        let myUser = (await axios.post('http://localhost:3001/apiUsers/addIdGameInUser', {gameId:myGame.id, userId:user.id})).data;
        dispatch(connectUser(myUser));
        dispatch(connectGame(myGame));
        dispatch(game());
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