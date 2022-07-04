import { PlayerCharacter } from "../../../../Character/PlayerCharacter";
import { LevelingParams } from "../../../../Classes/PlayerClass";
import { RangerSubclassParams } from "../RangerSubclass";
import * as HunterArchetypeDict from "./Hunter.json"


export class Hunter {
  static getFeature(level: string, featureName: string) {
    return HunterArchetypeDict["features"][level][featureName];
  }

  static hunter3(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(
      Hunter.getFeature(
      "3",
      (params.subclassParams as RangerSubclassParams).feature)
    );
  }

  static hunter7(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(
      Hunter.getFeature(
      "7",
      (params.subclassParams as RangerSubclassParams).feature)
    );
  }

  static hunter11(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(
      Hunter.getFeature(
      "11",
      (params.subclassParams as RangerSubclassParams).feature)
    );
  }

  static hunter15(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(
      Hunter.getFeature(
      "15",
      (params.subclassParams as RangerSubclassParams).feature)
    );
  }
}