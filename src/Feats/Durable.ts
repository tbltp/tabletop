import { PlayerCharacter } from "Base/PlayerCharacter";
import { Feat } from "./Feat";


export class Durable extends Feat {
    constructor(abilityScore: string) {
      super("Durable", abilityScore);
    }
  
    apply(pc: PlayerCharacter) {
      super.apply(pc, [this.abilityScore]);
      pc.abilityScores[this.abilityScore].update(1);
    }
  }