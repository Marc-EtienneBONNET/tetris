import { useState } from 'react'
import { connect } from 'react-redux'
import { CONNECT_MY_USER, DISCONNECT_MY_USER } from './../../reducer/userReducer'
import { ACCUEIL, GAME, LOGGER, SALON_ATTENTE, SALON_REGLAGE } from './../../reducer/pagesReducer'
import axios  from 'axios'


function LoggerPure(state) {
    const [nameUser, setNameUser] = useState("");

    async function add_user(){
        let user = (await axios.post('http://localhost:3001/apiUsers/addUsers', {name:nameUser, hist:[], actif:true})).data;
        state.dispatch({type:CONNECT_MY_USER, payload:{...user}});
        state.dispatch({type:ACCUEIL});
    }

    async function handleValidateNameUser(nameUser){
        let tmp = (await axios.post('http://localhost:3001/apiUsers/connection', {name:nameUser})).data;
        switch (tmp.res){
            case 'User does not exist' :
                add_user();
                return;
            case 'User is already connected' :
                alert('The user ' + nameUser + ' already connected')
                return ;
            case 'User is available':
                state.dispatch({type:CONNECT_MY_USER, payload:{...tmp.user}});
                state.dispatch({type:ACCUEIL});
                return ;
            default :
        }
    }
    return (
    <div>
        <form>
            <input onChange={(e) => {setNameUser(e.target.value)}} type='text' value={nameUser}/>
            <input onClick={() => {handleValidateNameUser(nameUser)}} type='button' value='Connecter/creer'/>
        </form>
    </div>
    )
}

const Logger = connect(
    (state) => {
        return {
            store: state,
        }
    }
)(LoggerPure)

export default Logger;