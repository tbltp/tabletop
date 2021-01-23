import { PlayerCharacter } from "Base/PlayerCharacter";
import { Feat } from "./Feat";

export class Resilient extends Feat {
    constructor(abilityScore: string) {
      super("Resilient", abilityScore);
    }
  
    apply(pc: PlayerCharacter) {
      pc.abilityScores[this.abilityScore].update(1);
      pc.abilityScores[this.abilityScore].savingThrowProficiency = true;
      super.apply(pc, [this.abilityScore]);
    }
  }
  