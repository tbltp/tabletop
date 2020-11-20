import { PlayerCharacter } from "Base/PlayerCharacter";
import { Genasi } from "../Genasi";

export class AirGenasi extends Genasi {
    constructor() {
      super("Air Genasi", []);
    }
  
    abilityIncrease(pc: PlayerCharacter): void {
      pc.abilityScores.constitution.update(2);
    }
  
    proficiencies(pc: PlayerCharacter): void {
      return;
    }
  }