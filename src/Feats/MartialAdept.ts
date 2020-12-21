import { ResourceTrait, Trait } from "../Base/Interfaces";
import { PlayerCharacter } from "../Base/PlayerCharacter";
import * as Maneuvers from "../Classes/Fighter/Subclasses/BattleMaster/Maneuvers.json";

import { Feat } from "./Feat";

export class MartialAdept extends Feat {
  
    constructor(maneuvers: string[]) {
      super("Martial Adept","","",[], [],[],[],[],"",maneuvers);
    }
  
    apply(pc: PlayerCharacter) {
      
      const superiorityDice: ResourceTrait = {
        title: "Superiority Dice: Martial Adept",
        description: "Number of superiority dice you can use for maneuvers",
        resourceMax: { value: 1 },
        dice: "d6",
      };
      
      pc.pcHelper.addResourceTraits(superiorityDice);
      
      const maneuvers: Trait[] = this.maneuvers.map(m => Maneuvers[m]);
      pc.pcHelper.addFeatures(...maneuvers);
    }
    
  }