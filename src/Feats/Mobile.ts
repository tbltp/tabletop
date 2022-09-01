import { PlayerCharacter } from "Character/PlayerCharacter";
import { Feat, FeatParams } from "./Feat";

export class Mobile extends Feat {
  constructor(_featParams: FeatParams) {
    super("Mobile");
  }

  public apply(pc: PlayerCharacter) {
    pc.speeds["Base Speed"].base.value += 10;
    super.apply(pc);
  }
}
