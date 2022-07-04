import { PlayerCharacter } from "Character/PlayerCharacter";
import { Feat, FeatParams } from "./Feat";

export class Resilient extends Feat {
    constructor(featParams: FeatParams) {
      super("Resilient", featParams.abilityScore);
    }
  
    apply(pc: PlayerCharacter) {
      pc.abilityScores[this.abilityScore].update(1);
      pc.abilityScores[this.abilityScore].savingThrowProficiency = true;
      super.apply(pc, [this.abilityScore]);
    }
  }
  