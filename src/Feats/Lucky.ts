import { PlayerCharacter } from "Base/PlayerCharacter";
import { Feat, FeatParams } from "./Feat";

export class Lucky extends Feat {
    constructor(_featParams: FeatParams) {
      super("Lucky");
    }
    
    public apply(pc: PlayerCharacter) {
      pc.pcHelper.addResourceTraits({
        ...this.trait,
        resourceMax: { value: 3 },
      });
      super.apply(pc);
    }
  }