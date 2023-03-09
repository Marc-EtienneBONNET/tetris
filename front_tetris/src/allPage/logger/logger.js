import { useState } from 'react';
import { useSelector, useDispatch} from 'react-redux'
import axios from 'axios';
import { logger, accueil, salonReglage, game } from '../../reducer/reducerPages'
import { connectUser } from '../../reducer/reducerUser'


export function ModuleLogger(){
    let [name, setName] = useState("Luffy")
    let dispatch = useDispatch();

    async function handleValide(){
        let tmp = (await axios.post('http://localhost:3001/apiUsers/connection', {name:name})).data;
        if (tmp.res === 'User does not exist')
            tmp.user = (await axios.post('http://localhost:3001/apiUsers/addUsers', {name:name, hist:[], actif:true, gameId:-1, map:[]})).data;
        else if (tmp.res === 'User is already connected'){
            alert('The user ' + name + ' already connected');
            return ;
        }
        dispatch(connectUser(tmp.user));
        dispatch(accueil());
    }

    function handleChangeName(e){
        setName(e);
    }

    return (
        <div>
            logger
            <input onChange={(e) => {handleChangeName(e.target.value)}} type="text" value={name}/>
            <input onClick={() => {handleValide()}} type="button" value="Valide"/>
        </div>
    );
}