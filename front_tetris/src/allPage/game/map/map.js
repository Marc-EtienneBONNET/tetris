// import { useSelector, useDispatch} from 'react-redux'
// import { connectGame, disconnectGame, changeMap } from './../../../reducer/reducerGame'
// import { connectUser, disconnectUser } from './../../../reducer/reducerUser'
// import { useState } from 'react';
// const { io } = require("socket.io-client");
// const socket = io("http://localhost:3001");



// export function ModuleGameMap(){
//     let myUser = useSelector((state) => state.user.value)
//     let myGame = useSelector((state) => state.game.value)
//     let [checkerSocketOn, setCheckerSocketOn] = useState(false);
//     let dispatch = useDispatch();
//     let date = new Date();

//     function boucleRefresh(){
//         if (checkerSocketOn === false){
//             setCheckerSocketOn(true);
//             socket.emit('newPiece', myUser);
//             socket.on('tictac', (data) => {
//                 dispatch(connectGame(data.game));
//                 dispatch(connectUser(data.user));
//             })
//             socket.on('refresh', (data) => {
               
//             })
//         }
//         else if ((date.getTime()/1000)%60 === 0){
//             setTimeout(() => {socket.emit('tictac', myUser)}, 1000/ (myGame ? myGame.vitesse : 1))
//         }
//         else
//             socket.emit('refresh', myUser);

//     }

//     function insertObjInMap(){
//         let map = myUser.map.map((e) => {let tmp = e.map((e2) => {return (e2)}); return tmp});
//         if (myUser.piece.piece){
//             map[myUser.piece.piece[0].x][myUser.piece.piece[0].y] = 1;
//             map[myUser.piece.piece[1].x][myUser.piece.piece[1].y] = 1;
//             map[myUser.piece.piece[2].x][myUser.piece.piece[2].y] = 1;
//             map[myUser.piece.piece[3].x][myUser.piece.piece[3].y] = 1;
//             console.log('cocuoiu');
//             socket.emit('changeUser', {...myUser, map:map});
//         }
//     }
//     insertObjInMap();
//     boucleRefresh();
//     function initMap(){
//         return (
//             <div className='mapGame'>
//                 {myUser.map.map((element, index) => {
//                     return (
//                         <div key={'c' + index} className='coloneGame'>
//                             {element.map((element2, index) => {
//                                 return (
//                                     <div key={'l' + index} className={'ligneGame color' + element2}>
//                                     </div>
//                                 )
//                             })}
//                         </div>
//                     )
//                 })}
//             </div>
//             )
//     }
//     console.log('recharge map', myUser);
//     return (
//         initMap()
//     );
// }

// socket.on("connect", () => {
//     console.log('socket :', socket.id); // x8WIv7-mJelg7on_ALbx
//   });
  

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
        if (OnShot === false){
            setOnShot(true);
            socket.emit('boucle', myUser);
            socket.on('boucle', () => {
                    setTimeout(() => {socket.emit('boucle', myUser)}, 100)
                }
            )
            socket.on('tictac', (data) => {
                dispatch(connectGame(data.game));
                dispatch(connectUser(data.user));
                setTimeout(() => {socket.emit('boucle', myUser)}, 100);
            })
        }
    }

    boucleRefresh();
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
    //console.log('recharge map', myUser);
    return (
        initMap()
    );
}

socket.on("connect", () => {
    console.log('socket :', socket.id); 
  });
  