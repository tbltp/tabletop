import { PlayerCharacter } from "Base/PlayerCharacter";
import { Feat } from "./Feat";

export class Actor extends Feat {
    constructor() {
      super("Actor");
    }
    
    apply(pc: PlayerCharacter) {
      super.apply(pc);
      pc.abilityScores.charisma.update(1);
    }
  }