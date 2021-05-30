import { ResourceTrait, Trait } from "../Base/Interfaces";
import { PlayerCharacter } from "../Base/PlayerCharacter";
import * as Maneuvers from "../Classes/Fighter/Subclasses/BattleMaster/Maneuvers.json";

import { Feat, FeatParams } from "./Feat";

export class MartialAdept extends Feat {
  
    constructor(featParams: FeatParams) {
      super("Martial Adept","","",[], [],[],[],[],"",featParams.maneuvers);
    }
  
    apply(pc: PlayerCharacter) {
      
      const superiorityDice = {
        resource: {resourceMax: { value: 1 }},
        scaling: {dice: "d6"},
      };
      
      pc.pcHelper.addEffectsToFeature("Martial Adept", superiorityDice);
      
      const maneuvers: Trait[] = this.maneuvers.map(m => Maneuvers[m]);
      pc.pcHelper.addFeatures(...maneuvers);
    }
  }