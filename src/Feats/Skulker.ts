import { PlayerCharacter } from "Base/PlayerCharacter";
import { Feat, FeatParams } from "./Feat";

export class Skulker extends Feat {
    constructor(_featParams: FeatParams) {
      super("Skulker");
    }
  
  
    apply(pc: PlayerCharacter) {
      if (!this.abilityPrereqCheck(pc, "dexterity", 13)) {
        throw Error("Requirement Not Met: 13 Dex");
      }
  
      super.apply(pc);
    }
  }