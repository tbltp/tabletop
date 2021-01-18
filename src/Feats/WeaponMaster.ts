import { PlayerCharacter } from "Base/PlayerCharacter";
import { Feat } from "./Feat";

export class WeaponMaster extends Feat {
    constructor(abilityScore: string, weaponProficiencies: string[]) {
      super("Weapon Master", abilityScore, "", [], [], [], [], weaponProficiencies);
    }
  
    apply(pc: PlayerCharacter) {
      pc.abilityScores[this.abilityScore].update(1);
      for (let weapon of this.weaponProficiencies) {
        pc.traits.weaponProficiencies.add(weapon);
      }
  
      super.apply(pc, [this.abilityScore, ...this.weaponProficiencies]);
    }
  }
  