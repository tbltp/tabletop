import { PlayerCharacter } from "Base/PlayerCharacter";
import { Feat } from "./Feat";

export class Grappler extends Feat {
    constructor() {
      super("Grappler");
    }
  
    apply(pc: PlayerCharacter) {
      if (!this.abilityPrereqCheck(pc, "strength", 13)) {
        throw Error("Requirement Not Met: 13 Str");
      }
  
      super.apply(pc);
    }
  }