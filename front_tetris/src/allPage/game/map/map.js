import { useSelector, useDispatch} from 'react-redux'
import { connectGame, disconnectGame, changeMap } from './../../../reducer/reducerGame'
import axios from 'axios';
const { io } = require("socket.io-client");
const socket = io("http://localhost:3001");

export function ModuleGameMap(){
    let myGame = useSelector((state) => state.game.value)
    let dispatch = useDispatch();

    if (myGame.nbPlayeur <= myGame.listePlayeur.length){

        setTimeout(() => {socket.emit('refresh', myGame)}, 1000);
        socket.on('refresh', (game) => {
            console.log('refresh myGame');
            dispatch(connectGame(game));
        })
    }   
    function initMap(){
        return (
            <div className='mapGame'>
                {myGame.map.map((element, index) => {
                    return (
                        <div key={'c' + index} className='coloneGame'>
                            {element.map((element2, index) => {
                                return (
                                    <div key={'l' + index} className={'ligneGame color' + element2}>
                                    </div>
                                )
                            })}
                        </div>
                    )
                })}
            </div>
            )
    }

    return (
        initMap()
    );
}

socket.on("connect", () => {
    console.log('socket :', socket.id); // x8WIv7-mJelg7on_ALbx
  });
  