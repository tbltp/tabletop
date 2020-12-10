import { PlayerCharacter } from "Base/PlayerCharacter";
import { Feat } from "./Feat";

export class Healer extends Feat {
    constructor() {
      super("Healer");
    }
  
    apply(pc: PlayerCharacter) {
      super.apply(pc);
    }
  }