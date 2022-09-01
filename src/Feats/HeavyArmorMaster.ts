import { PlayerCharacter } from "Character/PlayerCharacter";
import { Feat, FeatParams } from "./Feat";

export class HeavyArmorMaster extends Feat {
    constructor(_featParams: FeatParams) {
      super("Heavy Armor Master");
    }
  
    apply(pc: PlayerCharacter) {
      if (!this.armorPrereqCheck(pc, "Heavy")) {
        throw Error("Requirement Not Met: Heavy Armor Proficiency");
      }
  
      pc.abilityScores.strength.update(1);
      super.apply(pc);
    }
  }