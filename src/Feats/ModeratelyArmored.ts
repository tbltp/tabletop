import { PlayerCharacter } from "Base/PlayerCharacter";
import { Feat } from "./Feat";

export class ModeratelyArmored extends Feat {
    constructor(abilityScore: string) {
      super("Moderately Armored", abilityScore);
    }
  
  
    public apply(pc: PlayerCharacter) {
      if (!this.armorPrereqCheck(pc, "Light")) {
        throw Error("Requirement Not Met: Light Armor Proficiency");
      }
  
      pc.abilityScores[this.abilityScore].update(1);
      pc.traits.armorProficiencies.add("Medium");
      pc.traits.armorProficiencies.add("Shield");
      super.apply(pc, [this.abilityScore]);
    }
  }