import { PlayerCharacter } from "../../../Character/PlayerCharacter";
import { Halfling } from "../Halfling";
import * as traits from "../Halfling.json";

export class Lightfoot extends Halfling {
    constructor() {
      super("Lightfoot Halfling");
      this.traits.push(traits["NATURALLY STEALTHY"]);
    }
  
    abilityIncrease(pc: PlayerCharacter): void {
      pc.abilityScores.dexterity.update(2);
      pc.abilityScores.charisma.update(1);
    }
  
    proficiencies(pc: PlayerCharacter): void {
      return;
    }
  }
  