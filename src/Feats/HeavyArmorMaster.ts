import { PlayerCharacter } from "Base/PlayerCharacter";
import { Feat } from "./Feat";

export class HeavyArmorMaster extends Feat {
    constructor() {
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