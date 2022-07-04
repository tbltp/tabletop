import { PlayerCharacter } from "Character/PlayerCharacter";
import { Feat, FeatParams } from "./Feat";

export class HeavilyArmored extends Feat {
    constructor(_featParams: FeatParams) {
      super("Heavily Armored");
    }
  
    apply(pc: PlayerCharacter) {
      if (!this.armorPrereqCheck(pc, "Medium")) {
        throw Error("Requirement Not Met: Medium Armor Proficiency");
      }
  
      pc.abilityScores.strength.update(1);
      pc.traits.armorProficiencies.add("Heavy");
      super.apply(pc);
    }
  }