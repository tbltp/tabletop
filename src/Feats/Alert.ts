import { PlayerCharacter } from "Character/PlayerCharacter";
import { Feat, FeatParams } from "./Feat";

export class Alert extends Feat {
    constructor(_featParams: FeatParams) {
      super("Alert");
    }
  
    apply(pc: PlayerCharacter) {
      super.apply(pc);
      pc.baseStats["initiativeBonus"].bonus.value += 5;
    }
  }