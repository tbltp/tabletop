import { PlayerCharacter } from "Base/PlayerCharacter";
import { Feat } from "./Feat";

export class InspiringLeader extends Feat {
    constructor() {
      super("Inspiring leader");
    }
    
    public apply(pc: PlayerCharacter) {
      if (!this.abilityPrereqCheck(pc, "charisma", 13)) {
        throw Error("Requirement Not Met: 13 Cha");
      }
  
      super.apply(pc);
    }
  }