import { connect } from 'react-redux'
import axios from 'axios';

export function ComposantListeGamePure(state){

    async function HandleGoInTheGame(gameId){
        let game = (await axios.get('http://localhost:3001/apiGames/addPlayeurInGame', {id:gameId, playeur:state.store.user})).data;


    }

    function createListeGamesDontStart(state){
        let listeGame = [];
        state.store.games.forEach((element) => {
            if (element.start === false){
                listeGame.push(
                    <div key={element.id}>
                        <h3>ID : {element.id} | dificulte : {element.vitesse} | nb playeur : {element.listePlayeur.length}</h3>
                        <input onClick={() => {HandleGoInTheGame(element.id)}} type='Button' value='Rejoindre(a faire)'/>
                    </div>
                )
            }
        })
        return (
            <div>
                <h1>All game disponnible</h1>
                {listeGame}
            </div>);
    }

    return <div>
        {createListeGamesDontStart(state)}
    </div>
}

const ComposantListeGame = connect(
    (state) => {
        return {
            store: state,
        }
    }
)(ComposantListeGamePure)

export default ComposantListeGame;