import { PlayerCharacter } from "Base/PlayerCharacter";
import { Feat } from "./Feat";

export class DefensiveDuelist extends Feat {
    constructor() {
      super("Defensive Duelist");
    }
  
    apply(pc: PlayerCharacter) {
      if (!this.abilityPrereqCheck(pc, "dexterity", 13)) {
        throw Error("Requirement Not Met: 13 Dex");
      }
      
      super.apply(pc);
    }
  }