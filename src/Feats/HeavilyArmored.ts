import { PlayerCharacter } from "Base/PlayerCharacter";
import { Feat } from "./Feat";

export class HeavilyArmored extends Feat {
    constructor() {
      super("Heavily Armored");
    }
  
    apply(pc: PlayerCharacter) {
      if (!this.armorPrereqCheck(pc, "Medium")) {
        throw Error("Requirement Not Met: Medium Armor Proficiency");
      }
  
      pc.abilityScores.strength.update(1);
      pc.traits.armorProficiencies.push("Heavy");
      super.apply(pc);
    }
  }