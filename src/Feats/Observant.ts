import { PlayerCharacter } from "Base/PlayerCharacter";
import { Feat } from "./Feat";


export class Observant extends Feat {
    constructor(abilityScore: string) {
      super("Observant", abilityScore);
    }
  
    public apply(pc: PlayerCharacter) {
      pc.abilityScores[this.abilityScore].update(1);
      pc.baseStats["passivePerception"].bonus.value += 5;
      pc.baseStats["passiveInvestigation"].bonus.value += 5;
      super.apply(pc, [this.abilityScore]);
  
    }
  }
  