import { PlayerCharacter } from "../../../../Base/PlayerCharacter";
import { LevelingParams } from "../../../../Classes/PlayerClass";
import * as GreatOldOnePatronDict from "./TheGreatOldOne.json";

export class GreatOldOne {
  static getFeature(level: string, featureName: string) {
    return GreatOldOnePatronDict[level][featureName];
  }

  static greatOldOne1(pc: PlayerCharacter, _params: LevelingParams) {
    pc.pcHelper.addFeatures(GreatOldOne.getFeature("1", "AWAKENED MIND"));
  }

  static greatOldOne6(pc: PlayerCharacter, _params: LevelingParams) {
    pc.pcHelper.addFeatures(GreatOldOne.getFeature("6", "ENTROPIC WARD"));
  }

  static greatOldOne10(pc: PlayerCharacter, _params: LevelingParams) {
    pc.pcHelper.addFeatures(GreatOldOne.getFeature("10", "THOUGHT SHIELD"));
  }

  static greatOldOne14(pc: PlayerCharacter, _params: LevelingParams) {
    pc.pcHelper.addFeatures(GreatOldOne.getFeature("14", "CREATE THRALL"));
  }
}
