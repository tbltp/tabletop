import { PlayerCharacter } from "../../../Base/PlayerCharacter";
import { Genasi } from "../Genasi";
import * as Traits from "../Genasi.json";
import { Trait } from "../../../Base/Interfaces";
import * as Spells from "../../../../Assets/Spells.json";
import { ISpell } from "../../../Base/Interfaces";

export class FireGenasi extends Genasi {
    constructor() {
      super("Fire Genasi", [
        Traits["DARKVISION"],
        Traits["FIRE RESISTANCE"],
        Traits["REACH TO THE BLAZE"],
      ]);
    }
  
    abilityIncrease(pc: PlayerCharacter): void {
      super.abilityIncrease(pc);
      pc.abilityScores.intelligence.update(1);
    }
  
    proficiencies(pc: PlayerCharacter): void {
      return;
    }
  
    abilitiesAtLevels = {
      "1": this.level1,
      "3": this.level3,
    };
  
    level1(pc: PlayerCharacter) {
      let ispell: ISpell = Spells["PRODUCE FLAME"];
      const spell = { ...ispell, spellcastingAbility: "constitution" };
      pc.spells["0"].push(spell);
    }
  
    level3(pc: PlayerCharacter) {
      let ispell: ISpell = Spells["BURNING HANDS"];
      const spell = { ...ispell, spellcastingAbility: "constitution" };
      pc.spells["0"].push(spell);
    }
  }
  