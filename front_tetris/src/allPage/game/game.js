import { connect } from 'react-redux'

function GamePure() {
    return (
    <div>
        Game
    </div>
    )
}

const Game = connect(
    (state) => {
        return {
            store: state,
        }
    }
)(GamePure)

export default Game;