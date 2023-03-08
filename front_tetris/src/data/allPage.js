import { ModuleLogger } from '../allPage/logger/logger';
import { ModuleAccueil } from '../allPage/accueil/accueil';
import { ModuleGame } from '../allPage/game/game';
import { ModuleSalonReglage } from '../allPage/salonReglage/salonReglage';

export const allPages = {
    Logger: <ModuleLogger/>,
    Accueil: <ModuleAccueil/>,
    SalonReglage : <ModuleSalonReglage/>,
    Game: <ModuleGame/>,
  }