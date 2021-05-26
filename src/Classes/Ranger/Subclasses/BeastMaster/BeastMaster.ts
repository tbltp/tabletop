import { PlayerCharacter } from "../../../../Base/PlayerCharacter";
import { LevelingParams, PlayerClass } from "../../../../Classes/PlayerClass";
import { RangerSubclassParams } from "../RangerSubclass";
import * as BeastMasterArchetypeDict from "./BeastMaster.json"

export class BeastMaster {

  static getFeature(level: string, featureName: string) {
      return BeastMasterArchetypeDict["features"][level][featureName];
  }

  static beastMaster3(pc: PlayerCharacter, params: LevelingParams) {
    PlayerClass.pushCustomizedClassFeature(
      pc,
      3,
      BeastMasterArchetypeDict,
      "RANGER'S COMPANION",
      [(params.subclassParams as RangerSubclassParams).beastCompanion]
    );
  }
  
  static beastMaster7(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(BeastMaster.getFeature("7", "EXCEPTIONAL TRAINING"));
  }

  static beastMaster11(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(BeastMaster.getFeature("11", "BESTIAL FURY"));
  }

  static beastMaster15(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(BeastMaster.getFeature("15", "SHARE SPELLS"));
  }
}