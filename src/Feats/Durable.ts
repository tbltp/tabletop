import { PlayerCharacter } from "Base/PlayerCharacter";
import { Feat } from "./Feat";


export class Durable extends Feat {
    constructor(abilityScore: string) {
      super(abilityScore);
    }
  
    apply(pc: PlayerCharacter) {
      super.apply(pc);
      pc.abilityScores[this.abilityScore].update(1);
    }
  }