import { PlayerCharacter } from "../../../Base/PlayerCharacter";
import { Genasi } from "../Genasi";

export class EarthGenasi extends Genasi {
    constructor() {
      super("Earth Genasi", []);
    }
  
    abilityIncrease(pc: PlayerCharacter): void {
      super.abilityIncrease(pc);
    }
  
    proficiencies(pc: PlayerCharacter): void {
      return;
    }
  }