import { PlayerCharacter } from "../../../../Base/PlayerCharacter";
import { LevelingParams } from "../../../../Classes/PlayerClass";
import * as ArchfeyPatronDict from "./TheArchfey.json";

export class Archfey {
  static getFeature(level: string, featureName: string) {
    return ArchfeyPatronDict[level][featureName];
  }

  static archfey1(pc: PlayerCharacter, _params: LevelingParams) {
    pc.pcHelper.addFeatures(Archfey.getFeature("1", "FEY PRESENCE"));
  }

  static archfey6(pc: PlayerCharacter, _params: LevelingParams) {
    pc.pcHelper.addFeatures(Archfey.getFeature("6", "MISTY ESCAPE"));
  }

  static archfey10(pc: PlayerCharacter, _params: LevelingParams) {
    pc.pcHelper.addFeatures(Archfey.getFeature("10", "BEGUILING DEFENSES"));
  }

  static archfey14(pc: PlayerCharacter, _params: LevelingParams) {
    pc.pcHelper.addFeatures(Archfey.getFeature("14", "DARK DELIRIUM"));
  }
}
