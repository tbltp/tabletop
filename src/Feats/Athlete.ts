import { PlayerCharacter } from "Character/PlayerCharacter";
import { Feat, FeatParams } from "./Feat";

export class Athlete extends Feat {
  constructor(featParams: FeatParams) {
    super("Athlete", featParams.abilityScore);
  }

  apply(pc: PlayerCharacter) {
    super.apply(pc, [this.abilityScore]);
    pc.abilityScores[this.abilityScore].update(1);
  }
}
