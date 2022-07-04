import { PlayerCharacter } from "../../../../Character/PlayerCharacter";
import { LevelingParams } from "../../../../Classes/PlayerClass";
import * as SunSoulDict from "./SunSoul.json"

export class SunSoul {

  static getFeature(level: string, featureName: string) {
    return SunSoulDict["features"][level][featureName];
  }

  static sunSoul3(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(SunSoul.getFeature("3", "RADIANT SUN BOLT"));
  }

  static sunSoul6(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(SunSoul.getFeature("6", "SEARING ARC STRIKE"));
    pc.pcHelper.addSpells(["BURNING HANDS"],"wisdom");
  }

  static sunSoul11(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(SunSoul.getFeature("11", "SEARING SUNBURST"));
  }

  static sunSoul17(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(SunSoul.getFeature("17", "SUN SHIELD"));
  }
} 
