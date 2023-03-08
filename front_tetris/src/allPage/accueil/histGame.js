import { useSelector, useDispatch} from 'react-redux'
import axios from 'axios';
import { connectUser, disconnectUser } from '../../reducer/reducerUser'
import { logger, accueil, salonReglage, sallonAttente, game } from '../../reducer/reducerPages'


export function ModuleHistUser(){
    let user = useSelector((state) => state.user.value)

    function takeListeHist(){
        let divForhist = user.hist.map((element) => {
            return (
                <div key={element.id}>
                    <h3>id : {element.id} | nbPlayeur: {element.listePlayeur.length} | difficulte : {element.vitesse}</h3>
                </div>
                )
        })
        return (
                <div>
                    Historique : 
                    {divForhist}
                </div>
            );
    }
    return (takeListeHist());
}