import { PlayerCharacter } from "Base/PlayerCharacter";
import { Feat, FeatParams } from "./Feat";


export class Durable extends Feat {
    constructor(featParams: FeatParams) {
      super("Durable", featParams.abilityScore);
    }
  
    apply(pc: PlayerCharacter) {
      super.apply(pc, [this.abilityScore]);
      pc.abilityScores[this.abilityScore].update(1);
    }
  }