import { PlayerCharacter } from "Base/PlayerCharacter";
import { Feat } from "./Feat";

export class Skulker extends Feat {
    constructor() {
      super("Skulker");
    }
  
  
    apply(pc: PlayerCharacter) {
      if (!this.abilityPrereqCheck(pc, "dexterity", 13)) {
        throw Error("Requirement Not Met: 13 Dex");
      }
  
      super.apply(pc);
    }
  }