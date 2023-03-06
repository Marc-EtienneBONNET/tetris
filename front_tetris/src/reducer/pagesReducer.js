import { witchPage } from '../data/page' 

export const ACCUEIL = 'page/accueil';
export const GAME = 'page/game';
export const LOGGER = 'page/logger';
export const SALON_ATTENTE = 'page/salonAttente';
export const SALON_REGLAGE = 'page/salonReglage';



export function pageReducer(state = witchPage['logger'], action) {
    switch (action.type){
        case ACCUEIL:
            return witchPage['accueil'];
        case GAME:
            return witchPage['game'];
        case LOGGER:
            return witchPage['logger'];
        case SALON_ATTENTE:
            return witchPage['salonAttente'];
        case SALON_REGLAGE:
            return witchPage['salonReglage'];
        default :
            return witchPage['logger']; 
    }
}