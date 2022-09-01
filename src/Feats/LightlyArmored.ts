import { Trait } from "Character/Interfaces";
import { PlayerCharacter } from "Character/PlayerCharacter";
import { Feat, FeatParams } from "./Feat";

export class LightlyArmored extends Feat {
  constructor(featParams: FeatParams) {
    super("Lightly Armored", featParams.abilityScore);
  }

  public apply(pc: PlayerCharacter) {
    pc.abilityScores[this.abilityScore].update(1);
    pc.traits.armorProficiencies.add("Light");
    super.apply(pc, [this.abilityScore]);
  }
}
