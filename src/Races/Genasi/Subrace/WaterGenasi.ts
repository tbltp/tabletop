import { PlayerCharacter } from "../../../Base/PlayerCharacter";
import { Genasi } from "../Genasi";
import * as Traits from "../Genasi.json";
import { Trait } from "../../../Base/Interfaces";
import * as Spells from "../../../../Assets/Spells.json";
import { ISpell } from "../../../Base/Interfaces";

export class WaterGenasi extends Genasi {
    constructor() {
      super("Water Genasi", [
        Traits["ACID RESISTANCE"],
        Traits["AMPHIBIOUS"],
        Traits["SWIM"],
        Traits["CALL TO THE WAVE"]
      ]);
    }
  
    abilityIncrease(pc: PlayerCharacter): void {
      pc.abilityScores.wisdom.update(1);
    }
  
    proficiencies(pc: PlayerCharacter): void {
      return;
    }
  
    abilitiesAtLevels = {
      "1": this.level1,
      "3": this.level3,
    };
  
    level1(pc: PlayerCharacter) {
      let ispell: ISpell = Spells["SHAPE WATER"];
      const spell = { ...ispell, spellcastingAbility: "constitution" };
      pc.spells["0"].push(spell);
    }
  
    level3(pc: PlayerCharacter) {
      let ispell: ISpell = Spells["CREATE OR DESTROY WATER"];
      const spell = { ...ispell, spellcastingAbility: "constitution" };
      pc.spells["2"].push(spell);
    }
  
  }

  export class DSWaterGenasi extends WaterGenasi {
    constructor(){
      super()
    }
  }
  