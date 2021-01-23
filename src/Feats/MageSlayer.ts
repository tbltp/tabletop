import { PlayerCharacter } from "Base/PlayerCharacter";
import { Feat } from "./Feat";

export class MageSlayer extends Feat {
    constructor() {
      super("Mage Slayer");
    }
  
    public apply(pc: PlayerCharacter) {
      pc.traits.features.push(this.trait);
    }
  }