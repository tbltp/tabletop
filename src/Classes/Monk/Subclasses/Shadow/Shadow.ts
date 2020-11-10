import { PlayerCharacter } from "Base/PlayerCharacter";
import { LevelingParams } from "Classes/PlayerClass";
import * as ShadowDict from "./WayOfShadow.json";

export class Shadow {
    
    static getFeature(level: string, featureName: string) {
        return ShadowDict["features"][level][featureName];
    }

    static shadow3(pc: PlayerCharacter, params: LevelingParams) {
        pc.addFeatures(Shadow.getFeature("3", "SHADOW ARTS"))
        pc.addSpells(["DARKNESS", "DARKVISION", "PASS WITHOUT TRACE", "SILENCE", "MINOR ILLUSION"], "wisdom")
      }
    
      static shadow6(pc: PlayerCharacter, params: LevelingParams) {
        pc.addFeatures(Shadow.getFeature("6", "SHADOW STEP"))
      }
    
      static shadow11(pc: PlayerCharacter, params: LevelingParams) {
        pc.addFeatures(Shadow.getFeature("11", "CLOAK OF SHADOWS"))
      }
    
      static shadow17(pc: PlayerCharacter, params: LevelingParams) {
        pc.addFeatures(Shadow.getFeature("17", "OPPORTUNIST"))
      }
}