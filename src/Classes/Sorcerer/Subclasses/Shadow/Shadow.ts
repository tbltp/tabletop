import { PlayerCharacter } from "../../../../Character/PlayerCharacter";
import { LevelingParams } from "../../../../Classes/PlayerClass";
import * as ShadowArchetypeDict from "./Shadow.json"


export class Shadow {

  static getFeature(level: string, featureName: string) {
    return ShadowArchetypeDict["features"][level][featureName];
  }

  static shadow1(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(Shadow.getFeature("1", "EYE OF THE DARK"), Shadow.getFeature("1", "STRENGTH OF THE GRAVE"))
  }

  static shadow3(pc: PlayerCharacter,params: LevelingParams) {
    pc.pcHelper.addSpells(["DARKNESS"],"charisma");
  }
  static shadow6(pc: PlayerCharacter, params: LevelingParams) {      
    pc.pcHelper.addFeatures(Shadow.getFeature("6", "HOUND OF ILL OMEN"))
  }

  static shadow14(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(Shadow.getFeature("14", "SHADOW WALK"))
  }

  static shadow18(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(Shadow.getFeature("17", "UMBRAL FORM"))
  }
}