import { connect } from 'react-redux'
import { ACCUEIL, GAME, LOGGER, SALON_ATTENTE, SALON_REGLAGE } from './../../reducer/pagesReducer'
import { CONNECT_GAME, DISCONNECT_GAME, START_GAME} from './../../reducer/gameReducer'

function SalonAttentePure(state) {
    if (state.store.game.nbPlayeur <= state.store.game.listePlayeur.length){
        state.dispatch({type:START_GAME});
        state.dispatch({type:GAME});
    }
    return (
    <div>
        SalonAttente
    </div>
    )
}

const SalonAttente = connect(
    (state) => {
        return {
            store: state,
        }
    }
)(SalonAttentePure)

export default SalonAttente;