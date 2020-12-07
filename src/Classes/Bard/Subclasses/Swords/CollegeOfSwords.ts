import { PlayerCharacter } from "../../../../Base/PlayerCharacter";
import { LevelingParams, PlayerClass } from "../../../PlayerClass";
import * as CollegeOfSwordsDict from "./CollegeOfSwords.json";

export class CollegeOfSwords {
    
  static getFeature(level: string, featureName: string) {
      return CollegeOfSwordsDict["features"][level][featureName];
  }

  static swords3(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(CollegeOfSwords.getFeature("3", "BONUS PROFICIENCY"));
    pc.traits.armorProficiencies.push("Medium");
    pc.traits.weaponProficiencies.push("Scimitar");
    pc.pcHelper.addFeatures(CollegeOfSwords.getFeature("3", "FIGHTING STYLE"));
    if(params.fightingStyle) {
      PlayerClass.addFightingStyle(pc,params.fightingStyle[0]);
    }
    pc.pcHelper.addFeatures(CollegeOfSwords.getFeature("3", "BLADE FLOURISH"));
  }

  static swords6(pc: PlayerCharacter, params: LevelingParams) {
    CollegeOfSwords.getFeature("6", "EXTRA ATTACK");
    if(!pc.pcHelper.findResourceTraitByName("Extra Attack")) {
      pc.pcHelper.addResourceTraits({
        title: "Extra Attack",
        description: "Number of Extra Attacks you can make.",
        resourceMax: { value: 1 },
      });
    }
  }

  static swords14(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(CollegeOfSwords.getFeature("14", "MASTER'S FLOURISH"));
  }  
}