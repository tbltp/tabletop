import { PlayerCharacter } from "Base/PlayerCharacter";
import { LevelingParams } from "Classes/PlayerClass";
import * as OpenHandDict from "./OpenHand.json"

export class OpenHand {
    
    static getFeature(level: string, featureName: string) {
        return OpenHandDict["features"][level][featureName];
    }
    
    static openHand3(pc: PlayerCharacter, params: LevelingParams) {
        pc.addFeatures(OpenHand.getFeature("3", "OPEN HAND TECHNIQUE"))
      }
    
      static openHand6(pc: PlayerCharacter, params: LevelingParams) {
        pc.addFeatures(OpenHand.getFeature("6", "WHOLENESS OF BODY"))
      }
    
      static openHand11(pc: PlayerCharacter, params: LevelingParams) {
        pc.addFeatures(OpenHand.getFeature("11", "TRANQUILITY"))
        pc.addSpells(["SANCTUARY"], "wisdom");
      }
    
      static openHand17(pc: PlayerCharacter, params: LevelingParams) {
        pc.addFeatures(OpenHand.getFeature("17", "QUIVERING PALM"))
      }
}