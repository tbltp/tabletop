import { PlayerCharacter } from "Base/PlayerCharacter";
import { LevelingParams } from "Classes/PlayerClass";
import * as ThiefArchetypeDict from "./Thief.json"

export class Thief {
    static getFeature(level: string, featureName: string) {
        return ThiefArchetypeDict["features"][level][featureName];
    }
    static thief3(pc: PlayerCharacter, params: LevelingParams) {
        pc.pcHelper.addFeatures(Thief.getFeature("3", "FAST HANDS"), Thief.getFeature("3", "SECOND-STORY WORK"));
      }
    
      static thief9(pc: PlayerCharacter, params: LevelingParams) {
        pc.pcHelper.addFeatures(Thief.getFeature("9", "SUPREME SNEAK"));
      }
    
      static thief13(pc: PlayerCharacter, params: LevelingParams) {
        pc.pcHelper.addFeatures(Thief.getFeature("13", "USE MAGIC DEVICE"));
      }
    
      static thief17(pc: PlayerCharacter, params: LevelingParams) {
        pc.pcHelper.addFeatures(Thief.getFeature("17", "THIEF'S REFLEXES"));
      }
}