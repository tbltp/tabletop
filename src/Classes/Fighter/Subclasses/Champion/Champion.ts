import { PlayerCharacter } from "../../../../Base/PlayerCharacter";
import { LevelingParams, PlayerClass } from "../../../../Classes/PlayerClass";
import * as ChampionArchetype from "./Champion.json"

export class Champion {

    static getFeature(level: string, featureName: string) {
        return ChampionArchetype["features"][level][featureName];
    }

    static champion3(pc: PlayerCharacter, params: LevelingParams) {
        pc.pcHelper.addFeatures(Champion.getFeature("3", "IMPROVED CRITICAL"));
      }
    
      static champion7(pc: PlayerCharacter, params: LevelingParams) {
        pc.pcHelper.addFeatures(Champion.getFeature("7", "REMARKABLE ATHLETE"));

        for (let skill of Object.keys(pc.skills)) {
          if (!pc.skills[skill].proficient && ["strength", "dexterity"].includes(pc.skills[skill].ability)) {
            pc.skills[skill].bonus = pc.proficiency.halfBonus;
          }
        }

        pc.abilityScores.strength.halfProficiency = true;
        pc.abilityScores.dexterity.halfProficiency = true;
        pc.abilityScores.constitution.halfProficiency = true;

        pc.baseStats.initiativeBonus.bonus = pc.proficiency.halfBonus;

      }
    
      static champion10(pc: PlayerCharacter, params: LevelingParams) {
        pc.pcHelper.addFeatures(Champion.getFeature("10", "ADDITIONAL FIGHTING STYLE"));
        PlayerClass.addFightingStyle(pc, params.subclassParams.fightingStyles[0]);  // move add fighting style to PC 
    
      }
    
      static champion15(pc: PlayerCharacter, params: LevelingParams) {
        pc.pcHelper.addFeatures(Champion.getFeature("15", "SUPERIOR CRITICAL"));
      }
    
      static champion18(pc: PlayerCharacter, params: LevelingParams) {
        pc.pcHelper.addFeatures(Champion.getFeature("18", "SURVIVOR"));
      }
}