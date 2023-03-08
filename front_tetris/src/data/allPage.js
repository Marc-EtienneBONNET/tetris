import { ModuleLogger } from '../allPage/logger/logger';
import { ModuleAccueil } from '../allPage/accueil/accueil';
import { ModuleGame } from '../allPage/game/game';
import { ModuleSalonAttente } from '../allPage/salonAttente/salonAttente';
import { ModuleSalonReglage } from '../allPage/salonReglage/salonReglage';

export const allPages = {
    Logger: <ModuleLogger/>,
    Accueil: <ModuleAccueil/>,
    SalonReglage : <ModuleSalonReglage/>,
    SalonAttente: <ModuleSalonAttente/>,
    Game: <ModuleGame/>,
  }