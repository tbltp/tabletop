import { PlayerCharacter } from "Base/PlayerCharacter";
import { Feat, FeatParams } from "./Feat";

export class Mobile extends Feat {
  constructor(_featParams: FeatParams) {
    super("Mobile");
  }

  public apply(pc: PlayerCharacter) {
    pc.speed.value += 10;
    super.apply(pc);
  }
}
