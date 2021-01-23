import { PlayerCharacter } from "../../../../Base/PlayerCharacter";
import { LevelingParams } from "../../../../Classes/PlayerClass";
import * as ScoutArchetypeDict from "./Scout.json"

export class Scout {

  static getFeature(level: string, featureName: string) {
      return ScoutArchetypeDict["features"][level][featureName];
  }

  static Scout3(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(Scout.getFeature("3", "SKIRMISHER"), 
    Scout.getFeature("3", "SURVIVALIST"));
    pc.skills["nature"].proficient = true;
    pc.skills["nature"].expertise = true;
    pc.skills["survival"].proficient = true;
    pc.skills["survival"].expertise = true;
  }

  static Scout9(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(Scout.getFeature("9", "SUPERIOR MOBILITY"));
  }

  static Scout13(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(Scout.getFeature("13", "AMBUSH MASTER"));
  }

  static Scout17(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(Scout.getFeature("17", "SUDDEN STRIKE"));
  }
    
}