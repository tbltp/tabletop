import { Trait } from "Base/Interfaces";
import { PlayerCharacter } from "Base/PlayerCharacter";
import { Feat } from "./Feat";

export class LightlyArmored extends Feat {
    constructor(abilityScore: string) {
      super("Lightly Armored");
    }
  
    public apply(pc: PlayerCharacter) {
  
      const newTrait: Trait = {
        ...this.trait,
        choices: [this.abilityScore]
      };
      super.apply(pc);
      pc.abilityScores[this.abilityScore].update(1);
      pc.traits.armorProficiencies.push("Light");
    }
  }