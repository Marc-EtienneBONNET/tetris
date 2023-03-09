import { useSelector, useDispatch} from 'react-redux'
import { connectGame, disconnectGame, changeMap } from './../../../reducer/reducerGame'
import axios from 'axios';
import { useState } from 'react';
const { io } = require("socket.io-client");
const socket = io("http://localhost:3001");

export function ModuleGameMap(){
    let myGame = useSelector((state) => state.game.value)
    let myUser = useSelector((state) => state.user.value)
    let [checkerSocketOn, setCheckerSocketOn] = useState(false);
    let dispatch = useDispatch();

    async function startGame(){
        let myGame = (await axios.post('http://localhost:3001/apiGames/startGame', {gameId:myUser.gameId})).data;
        dispatch(connectGame(myGame));
    }

    async function refreshGame(){
        let tmpGame = (await axios.post('http://localhost:3001/apiGames/getOneGames', {id:myUser.gameId, userId:myUser.id})).data;
        dispatch(connectGame(tmpGame));
    }

    if (checkerSocketOn === false){
        console.log('fonction decoute');
        socket.on('refresh', (game) => {
            console.log('verif');
            dispatch(connectGame(game));
        })
        setCheckerSocketOn(true);
    }
    else
        setTimeout(() => {socket.emit('refresh', myGame)}, 1000); 

    function initMap(){
        return (
            <div className='mapGame'>
                {myUser.map.map((element, index) => {
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
    console.log('recharge map');
    return (
        initMap()
    );
}

socket.on("connect", () => {
    console.log('socket :', socket.id); // x8WIv7-mJelg7on_ALbx
  });
  