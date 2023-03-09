import { useSelector, useDispatch} from 'react-redux'
import { useState } from 'react'
import { connectGame, disconnectGame } from '../../reducer/reducerGame'
import { logger, accueil, salonReglage, game } from '../../reducer/reducerPages'
import { connectUser } from '../../reducer/reducerUser'

import axios from 'axios'

export function ModuleSalonReglage(){
    let user = useSelector((state) => state.user.value)
    let dispatch = useDispatch();
    let [tmpGame, setTmpGame] = useState({
        listePlayeur:[user],
        nbPlayeur:1,
        seriePiece:[],
        vitesse:1,
        start:false,
    })

    function handleMouvTmpGame(e){
        if (e.target.value < 5 && e.target.value >= 1)
            setTmpGame(
                    {
                        ...tmpGame, 
                        [e.target.name]:e.target.value
                    }
                )
    }
    async function handlePlayGame(){
        let myGame = (await axios.post('http://localhost:3001/apiGames/addGames', {...tmpGame})).data;
        let myUser = (await axios.post('http://localhost:3001/apiUsers/addIdGameInUser', {gameId:myGame.id, userId:user.id})).data;
        dispatch(connectGame(myGame));
        dispatch(connectUser(myUser));
        dispatch(game());
    }
    return (
        <div>
            difficulte : <input onChange={(e) => {handleMouvTmpGame(e)}} type='number' name="vitesse" value={tmpGame.vitesse}/>
            nb joureur : <input onChange={(e) => {handleMouvTmpGame(e)}} type='number' name="nbPlayeur" value={tmpGame.nbPlayeur}/>
            <input onClick={() => {handlePlayGame()}} type='button' value='Play'/>
            <input onClick={() => {dispatch(accueil())}} type='button' value='Annuler'/>
        
        </div>
    );
}