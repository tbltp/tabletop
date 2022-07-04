import { Dwarf } from "../Dwarf";
import { RaceParams } from "../../Race";
import * as traits from "../Dwarf.json";
import { PlayerCharacter } from "../../../Character/PlayerCharacter";

export class MountainDwarf extends Dwarf {
    constructor(params: RaceParams) {
      super("Mountain Dwarf", params.toolProficiency);
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