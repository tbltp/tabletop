import { Trait } from "Base/Interfaces";
import { PlayerCharacter } from "Base/PlayerCharacter";
import { Feat } from "./Feat";

export class LightlyArmored extends Feat {
  constructor(abilityScore: string) {
    super("Lightly Armored", abilityScore);
  }

  public apply(pc: PlayerCharacter) {
    pc.abilityScores[this.abilityScore].update(1);
    pc.traits.armorProficiencies.add("Light");
    super.apply(pc, [this.abilityScore]);
  }
}
