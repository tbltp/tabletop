import { Dwarf } from "../Dwarf";
import * as traits from "../Dwarf.json";
import { PlayerCharacter } from "../../../Base/PlayerCharacter";

export class MountainDwarf extends Dwarf {
    constructor(toolProficiency: string) {
      super("Mountain Dwarf", toolProficiency);
      this.traits.push(traits["DWARVEN TOUGHNESS"]);
      this.armorProficiencies.push("Light", "Medium");
    }
  
    abilityIncrease(pc: PlayerCharacter): void {
      pc.abilityScores.strength.update(2);
      pc.abilityScores.constitution.update(2);
    }
  
    proficiencies(pc: PlayerCharacter): void {
      return;
    }
  }