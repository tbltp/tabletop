import { PlayerCharacter } from "Base/PlayerCharacter";
import { Feat } from "./Feat";

export class WarCaster extends Feat {
    constructor() {
      super("War Caster");
    }
  
    apply(pc: PlayerCharacter) {
      if (this.spellcasterPrereqCheck(pc)) {
        throw Error("Requirement Not Met: Spellcaster");
      }
  
      super.apply(pc);
    }
  }