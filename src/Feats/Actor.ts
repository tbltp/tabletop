import { PlayerCharacter } from "Character/PlayerCharacter";
import { Feat, FeatParams } from "./Feat";

export class Actor extends Feat {
    constructor(_featParams: FeatParams) {
      super("Actor");
    }
    
    apply(pc: PlayerCharacter) {
      super.apply(pc);
      pc.abilityScores.charisma.update(1);
    }
  }