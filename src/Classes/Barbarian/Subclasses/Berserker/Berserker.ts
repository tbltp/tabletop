import { PlayerCharacter } from "../../../../Base/PlayerCharacter";
import { LevelingParams } from "../../../PlayerClass";
import * as BerserkerDict from "./Berserker.json";

export class Berserker {

    static getFeature(level: string, featureName: string) {
        return BerserkerDict["features"][level][featureName];
    }

    static berserker3(pc: PlayerCharacter, params: LevelingParams) {
      pc.addFeatures(Berserker.getFeature("3", "FRENZY"));
    }
  
    static berserker6(pc: PlayerCharacter, params: LevelingParams) {
      pc.addFeatures(Berserker.getFeature("6", "MINDLESS RAGE"));
    }
  
    static berserker10(pc: PlayerCharacter, params: LevelingParams) {
      pc.addFeatures(Berserker.getFeature("10", "INTIMIDATING PRESENCE"));
    }
  
    static berserker14(pc: PlayerCharacter, params: LevelingParams) {
      pc.addFeatures(Berserker.getFeature("14", "RETALIATION"));
    }
}