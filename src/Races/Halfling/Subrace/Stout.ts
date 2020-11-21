import { PlayerCharacter } from "../../../Base/PlayerCharacter";
import { Halfling } from "../Halfling";
import * as traits from "../Halfling.json";

export class Stout extends Halfling {
    constructor() {
      super("Stout Halfling");
      this.traits.push(traits["STOUT RESILIENCE"]);
    }
  
    abilityIncrease(pc: PlayerCharacter): void {
      pc.abilityScores.dexterity.update(2);
      pc.abilityScores.constitution.update(1);
    }
  
    proficiencies(pc: PlayerCharacter): void {
      return;
    }
  }
  