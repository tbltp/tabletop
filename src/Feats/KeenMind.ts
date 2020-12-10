import { PlayerCharacter } from "Base/PlayerCharacter";
import { Feat } from "./Feat";

export class KeenMind extends Feat {
    constructor() {
      super("Keen Mind");
    }
  
    public apply(pc: PlayerCharacter) {
      pc.abilityScores["intelligence"].update(1);
      super.apply(pc);
    }
  }