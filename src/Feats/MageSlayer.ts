import { PlayerCharacter } from "Character/PlayerCharacter";
import { Feat, FeatParams } from "./Feat";

export class MageSlayer extends Feat {
    constructor(_featParams: FeatParams) {
      super("Mage Slayer");
    }
  
    public apply(pc: PlayerCharacter) {
      pc.traits.features.push(this.trait);
    }
  }