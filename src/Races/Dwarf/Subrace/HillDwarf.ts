import { Dwarf } from "../Dwarf";
import { RaceParams } from "../../Race";
import * as traits from "../Dwarf.json";
import { PlayerCharacter } from "../../../Base/PlayerCharacter";

export class HillDwarf extends Dwarf {
    constructor(params: RaceParams) {
      super("Hill Dwarf", params.toolProficiency);
      this.traits.push(traits["DWARVEN TOUGHNESS"]);
    }
  
    abilityIncrease(pc: PlayerCharacter): void {
      super.abilityIncrease(pc);
      pc.abilityScores.wisdom.update(1);
    }
  
    proficiencies(pc: PlayerCharacter): void {
      return;
    }

    abilitiesAtLevels = {
      "1": this.plusHealth,
      "2": this.plusHealth,
      "3": this.plusHealth,
      "4": this.plusHealth,
      "5": this.plusHealth,
      "6": this.plusHealth,
      "7": this.plusHealth,
      "8": this.plusHealth,
      "9": this.plusHealth,
      "10": this.plusHealth,
      "11": this.plusHealth,
      "12": this.plusHealth,
      "13": this.plusHealth,
      "14": this.plusHealth,
      "15": this.plusHealth,
      "16": this.plusHealth,
      "17": this.plusHealth,
      "18": this.plusHealth,
      "19": this.plusHealth,
      "20": this.plusHealth,
    };
  
    plusHealth(pc: PlayerCharacter) {
      pc.baseStats["hpMax"].bonus.value += 1;
    }
  }