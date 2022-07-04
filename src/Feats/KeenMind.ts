import { PlayerCharacter } from "Character/PlayerCharacter";
import { Feat, FeatParams } from "./Feat";

export class KeenMind extends Feat {
    constructor(_featParams: FeatParams) {
      super("Keen Mind");
    }
  
    public apply(pc: PlayerCharacter) {
      pc.abilityScores["intelligence"].update(1);
      super.apply(pc);
    }
  }