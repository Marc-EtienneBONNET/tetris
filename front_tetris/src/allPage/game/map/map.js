
import { useSelector, useDispatch} from 'react-redux'
import { connectGame, disconnectGame, changeMap } from './../../../reducer/reducerGame'
import { connectUser, disconnectUser } from './../../../reducer/reducerUser'
import { useState } from 'react';
const { io } = require("socket.io-client");
const socket = io("http://localhost:3001");



export function ModuleGameMap(){
    let myUser = useSelector((state) => state.user.value)
    let myGame = useSelector((state) => state.game.value)
    let [OnShot, setOnShot] = useState(false);
    let dispatch = useDispatch();
    
    
    function boucleRefresh(){
        if (OnShot === false){ // permer de s'assurer que les fonction executer ne seront executer qu une fois 
            socket.emit('newPiece', myUser);
            setOnShot(true);
            socket.emit('boucle', {myUser:myUser, crono:true}); // l'appel 'boucle' permer de creer une boucle de refresh avec le jeux sans changer la data afin d eviter de refaire charger le module
                                                                // myUser permer de de recupe les info de game si besoin
                                                                // crono permet de specifier si l'appel de l'appel doit etr contabiliser dans le crono afin de gerer la dessante reguliere de l'obj 
            socket.on('boucle', () => {
                setTimeout(() => {socket.emit('boucle', {myUser:myUser, crono:true})}, 100) 
            })
            socket.on('tictac', (data) => {         //tictac est creer afin de gerer la dessante de l'objet, il est appeler par l'evenement boucle 1 fois sur 10 quand crono et a true
                dispatch(connectGame(data.game));
                dispatch(connectUser(data.user));
                setTimeout(() => {socket.emit('boucle', {myUser:myUser, crono:true})}, 100);
            })
            socket.on('refresh', (data) => {        //refresh est appeler afin de metre a jour les info du jeux a chaque commande passer
                dispatch(connectGame(data.game));
                dispatch(connectUser(data.user));
                setTimeout(() => {socket.emit('boucle', {myUser:myUser, crono:false})}, 100);
            })
        }
    }

    function insertObjInMap(){

        let map = myUser.map.map((e) => {let tmp = e.map((e2) => {return (e2)}); return tmp});
        if (myUser.piece.piece){
            map[myUser.piece.piece[0].x][myUser.piece.piece[0].y] = 1;
            map[myUser.piece.piece[1].x][myUser.piece.piece[1].y] = 1;
            map[myUser.piece.piece[2].x][myUser.piece.piece[2].y] = 1;
            map[myUser.piece.piece[3].x][myUser.piece.piece[3].y] = 1;
        }
        return (map);
    }

    
    boucleRefresh();
    function initMap(myMap){
        return (
            <div className='mapGame'>
                {myMap.map((element, index) => {
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
    console.log('recharge map', myUser);
    return (
        initMap(insertObjInMap())
    );
}

socket.on("connect", () => {
    console.log('socket :', socket.id); 
  });
  