import { PlayerCharacter } from "Base/PlayerCharacter";
import { Feat } from "./Feat";

export class Mobile extends Feat {
  constructor() {
    super("Mobile");
  }

  public apply(pc: PlayerCharacter) {
    pc.speed.value += 10;
    super.apply(pc);
  }
}
