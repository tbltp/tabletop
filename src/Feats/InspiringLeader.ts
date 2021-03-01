import { PlayerCharacter } from "Base/PlayerCharacter";
import { Feat, FeatParams } from "./Feat";

export class InspiringLeader extends Feat {
    constructor(_featParams: FeatParams) {
      super("Inspiring leader");
    }
    
    public apply(pc: PlayerCharacter) {
      if (!this.abilityPrereqCheck(pc, "charisma", 13)) {
        throw Error("Requirement Not Met: 13 Cha");
      }
  
      super.apply(pc);
    }
  }