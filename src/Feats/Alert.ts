import { PlayerCharacter } from "Base/PlayerCharacter";
import { Feat } from "./Feat";

export class Alert extends Feat {
    constructor() {
      super("Alert");
    }
  
    apply(pc: PlayerCharacter) {
      super.apply(pc);
      pc.baseStats["initiativeBonus"].bonus.value += 5;
    }
  }