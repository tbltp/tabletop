import { PlayerCharacter } from "Base/PlayerCharacter";
import { Feat, FeatParams } from "./Feat";

export class WeaponMaster extends Feat {
    constructor(featParams: FeatParams) {
      super("Weapon Master", featParams.abilityScore, "", [], [], [], [], featParams.weaponProficiencies);
    }
  
    apply(pc: PlayerCharacter) {
      pc.abilityScores[this.abilityScore].update(1);
      for (let weapon of this.weaponProficiencies) {
        pc.traits.weaponProficiencies.add(weapon);
      }
  
      super.apply(pc, [this.abilityScore, ...this.weaponProficiencies]);
    }
  }
  