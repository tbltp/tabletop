import { PlayerCharacter } from "Base/PlayerCharacter";
import { LevelingParams, PlayerClass } from "Classes/PlayerClass";
import * as ChampionArchetype from "./Champion.json"

export class Champion {

    static getFeature(level: string, featureName: string) {
        return ChampionArchetype["features"][level][featureName];
    }

    static champion3(pc: PlayerCharacter, params: LevelingParams) {
        pc.addFeatures(Champion.getFeature("3", "IMPROVED CRITICAL"));
      }
    
      static champion7(pc: PlayerCharacter, params: LevelingParams) {
        pc.addFeatures(Champion.getFeature("7", "REMARKABLE ATHLETE"));
        // @Ez whatever you did for Jack of All Trades
      }
    
      static champion10(pc: PlayerCharacter, params: LevelingParams) {
        pc.addFeatures(Champion.getFeature("10", "ADDITIONAL FIGHTING STYLE"));
        PlayerClass.addFightingStyle(pc, params.fightingStyle[0]);  // move add fighting style to PC 
    
      }
    
      static champion15(pc: PlayerCharacter, params: LevelingParams) {
        pc.addFeatures(Champion.getFeature("15", "SUPERIOR CRITICAL"));
      }
    
      static champion18(pc: PlayerCharacter, params: LevelingParams) {
        pc.addFeatures(Champion.getFeature("18", "SURVIVOR"));
      }
}