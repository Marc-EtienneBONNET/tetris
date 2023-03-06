import { connect } from 'react-redux'
import {  DISCONNECT_MY_USER, CONNECT_MY_USER} from './../../reducer/userReducer'
import { ACCUEIL, GAME, LOGGER, SALON_ATTENTE, SALON_REGLAGE } from './../../reducer/pagesReducer'
import { INIT_GAMES } from './../../reducer/gamesReducer'
import ComposantListeGame from './composantListeGames'
import ComposantListeHist from './composantListeHist'
import { useState } from 'react'
import axios  from 'axios'
import {ifNewInfoInGames} from './../TestNewInfo/testUsers'


function AccueilPure(state) {
    async function initGames(){
        let games = (await axios.get('http://localhost:3001/apiGames/getGames')).data;
        state.dispatch({type:INIT_GAMES, payload:games})
        state.dispatch({type:ACCUEIL})
    }

    function handleSupProfile(state){
        axios.post('http://localhost:3001/apiUsers/suppUsers', {id:state.store.user.id});
        state.dispatch({type:DISCONNECT_MY_USER, payload:{...state.store.user}})
    } 
    function handleDisconnectedProfile(state){
        axios.post('http://localhost:3001/apiUsers/actif', {id:state.store.user.id});
        state.dispatch({type:DISCONNECT_MY_USER, payload:{...state.store.user}})
    }
    if (state.store.games.length <= 0)
        initGames();
    return (
    <div>
        Accueil
        <input onClick={() => {handleDisconnectedProfile(state)}} type="button" value="Disconnected"/>
        <input onClick={() => {handleSupProfile(state)}} type="button" value="Sup profile"/>
        <input onClick={() => {state.dispatch({type:SALON_REGLAGE});}} type="button" value="New Games"/>
        <ComposantListeGame/>
        <ComposantListeHist/>
    </div>
    )
}

const Accueil = connect(
    (state) => {
        return {
            store: state,
        }
    }
)(AccueilPure)

export default Accueil;