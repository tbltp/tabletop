import { PlayerCharacter } from "Base/PlayerCharacter";
import { Feat, FeatParams } from "./Feat";

export class DefensiveDuelist extends Feat {
    constructor(_featParams: FeatParams) {
      super("Defensive Duelist");
    }
  
    apply(pc: PlayerCharacter) {
      if (!this.abilityPrereqCheck(pc, "dexterity", 13)) {
        throw Error("Requirement Not Met: 13 Dex");
      }
      
      super.apply(pc);
    }
  }