import { PlayerCharacter } from "../../../../Base/PlayerCharacter";
import { LevelingParams, PlayerClass } from "../../../PlayerClass";
import * as CollegeOfSwordsDict from "./CollegeOfSwords.json";

export class CollegeOfSwords {
    
  static getFeature(level: string, featureName: string) {
      return CollegeOfSwordsDict["features"][level][featureName];
  }

  static swords3(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(CollegeOfSwords.getFeature("3", "BONUS PROFICIENCY"), CollegeOfSwords.getFeature("3", "FIGHTING STYLE"), CollegeOfSwords.getFeature("3", "BLADE FLOURISH"));
    params.fightingStyles ?? PlayerClass.addFightingStyle(pc,params.fightingStyles[0]);
  }

  static swords6(pc: PlayerCharacter, params: LevelingParams) {
    if(!pc.pcHelper.findFeatureTraitByName("Extra Attack")) {
      pc.pcHelper.addFeatures(CollegeOfSwords.getFeature("6", "EXTRA ATTACK"));
      pc.pcHelper.addEffectsToClassFeature("Extra Attack", {scaling: {uses: 1}})
    }
  }

  static swords14(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(CollegeOfSwords.getFeature("14", "MASTER'S FLOURISH"));
  }  
}