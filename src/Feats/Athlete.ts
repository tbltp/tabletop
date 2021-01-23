import { PlayerCharacter } from "Base/PlayerCharacter";
import { Feat } from "./Feat";

export class Athlete extends Feat {
  constructor(abilityScore: string) {
    super("Athlete", abilityScore);
  }

  apply(pc: PlayerCharacter) {
    super.apply(pc, [this.abilityScore]);
    pc.abilityScores[this.abilityScore].update(1);
  }
}
