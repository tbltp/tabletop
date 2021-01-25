import { Dwarf } from "../Dwarf";
import * as traits from "../Dwarf.json";
import { PlayerCharacter } from "../../../Base/PlayerCharacter";

export class MountainDwarf extends Dwarf {
    constructor(toolProficiency: string) {
      super("Mountain Dwarf", toolProficiency);
      this.traits.push(traits["DWARVEN ARMOR TRAINING"]);
      this.armorProficiencies.push("Light", "Medium");
    }
  
    abilityIncrease(pc: PlayerCharacter): void {
      super.abilityIncrease(pc);
      pc.abilityScores.strength.update(2);
    }
  
    proficiencies(pc: PlayerCharacter): void {
      return;
    }
  }