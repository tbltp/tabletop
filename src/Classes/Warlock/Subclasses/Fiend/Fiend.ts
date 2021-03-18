import { PlayerCharacter } from "../../../../Base/PlayerCharacter";
import { LevelingParams } from "../../../../Classes/PlayerClass";
import * as FiendPatronDict from "./TheFiend.json";

export class Fiend {
  static getFeature(level: string, featureName: string) {
    return FiendPatronDict[level][featureName];
  }

  static fiend1(pc: PlayerCharacter, _params: LevelingParams) {
    pc.pcHelper.addFeatures(Fiend.getFeature("1", "DARK ONE'S BLESSING"));
  }

  static fiend6(pc: PlayerCharacter, _params: LevelingParams) {
    pc.pcHelper.addFeatures(Fiend.getFeature("6", "DARK ONE'S OWN LUCK"));
  }

  static fiend10(pc: PlayerCharacter, _params: LevelingParams) {
    pc.pcHelper.addFeatures(Fiend.getFeature("10", "FIENDISH RESILIENCE"));
  }

  static fiend14(pc: PlayerCharacter, _params: LevelingParams) {
    pc.pcHelper.addFeatures(Fiend.getFeature("14", "HURL THROUGH HELL"));
  }
}
