import { Dwarf } from "../Dwarf";
import * as traits from "../Dwarf.json";
import { PlayerCharacter } from "../../../Base/PlayerCharacter";

export class HillDwarf extends Dwarf {
    constructor(toolProficiency: string) {
      super("Hill Dwarf", toolProficiency);
    }
  
    abilityIncrease(pc: PlayerCharacter): void {
      pc.abilityScores.constitution.update(2);
      pc.abilityScores.wisdom.update(1);
    }
  
    proficiencies(pc: PlayerCharacter): void {
      return;
    }
  }