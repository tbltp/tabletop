import { PlayerCharacter } from "Base/PlayerCharacter";
import { Feat } from "./Feat";

export class Lucky extends Feat {
    constructor() {
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