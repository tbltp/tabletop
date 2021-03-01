import { PlayerCharacter } from "Base/PlayerCharacter";
import { Feat, FeatParams } from "./Feat";

export class Grappler extends Feat {
    constructor(_featParams: FeatParams) {
      super("Grappler");
    }
  
    apply(pc: PlayerCharacter) {
      if (!this.abilityPrereqCheck(pc, "strength", 13)) {
        throw Error("Requirement Not Met: 13 Str");
      }
  
      super.apply(pc);
    }
  }