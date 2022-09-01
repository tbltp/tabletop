import { PlayerCharacter } from "Character/PlayerCharacter";
import { PlayerClass } from "Classes/PlayerClass";
import { Feat, FeatParams } from "./Feat";

export class Lucky extends Feat {
  constructor(_featParams: FeatParams) {
    super("Lucky");
  }
    
  public apply(pc: PlayerCharacter) {
    super.apply(pc);
    pc.pcHelper.addEffectsToFeature("Lucky", {resource: {resourceMax: {value: 3}}})
  }
}