import { useState } from 'react'
import { connect } from 'react-redux'
import {ADD_GAMES, SUP_GAMES} from './../../reducer/gamesReducer'
import {CONNECT_GAME, DISCONNECT_GAME} from './../../reducer/gameReducer'
import { ACCUEIL, GAME, LOGGER, SALON_ATTENTE, SALON_REGLAGE } from './../../reducer/pagesReducer'
import axios  from 'axios'

function SalonReglagePure(state) {

    let [tmpGame, setTmpGame] = useState({
        listePlayeur:[state.store.user],
        nbPlayeur:1,
        actuelPiece:{},
        vitesse:1,
        start:false,
    })

    async function handlePlayGame(){
        let tmp = (await axios.post('http://localhost:3001/apiGames/addGames', {...tmpGame})).data;
        console.log(tmp);
        state.dispatch({type:CONNECT_GAME, payload:{...tmp}});
        // state.dispatch({type:ADD_GAMES, payload:{...tmpGame}});
        state.dispatch({type:SALON_ATTENTE});
    }

    function handleDifficulte(e){
        if (e.target.value < 5 && e.target.value >= 1)
            setTmpGame({...tmpGame, vitesse:e.target.value})
    }

    function handleNbPlayeur(e){
        if (e.target.value >= 1)
            setTmpGame({...tmpGame, nbPlayeur:e.target.value})
    }

    return (
    <div>
        SalonReglage
        <input onChange={(e) => {handleDifficulte(e)}} type='number' value={tmpGame.vitesse}/>
        <input onChange={(e) => {handleNbPlayeur(e)}} type='number' value={tmpGame.nbPlayeur}/>
        <input onClick={() => {handlePlayGame()}} type='button' value='Play'/>
    </div>
    )
}

const SalonReglage = connect(
    (state) => {
        return {
            store: state,
        }
    }
)(SalonReglagePure)

export default SalonReglage;