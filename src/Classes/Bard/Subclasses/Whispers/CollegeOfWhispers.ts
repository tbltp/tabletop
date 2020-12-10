import { ScalingTrait } from "Base/Interfaces";
import { PlayerCharacter } from "../../../../Base/PlayerCharacter";
import { LevelingParams, PlayerClass } from "../../../PlayerClass";
import * as CollegeOfWhispersDict from "./CollegeOfWhispers.json";

export class CollegeOfWhispers {
    
  static getFeature(level: string, featureName: string) {
      return CollegeOfWhispersDict["features"][level][featureName];
  }

  static whispers3(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(CollegeOfWhispers.getFeature("3", "PSYCHIC BLADES"));
    const psychicDmg: ScalingTrait = {
      title: "Psychic Blades",
      description: "The damage you deal with Psychic Blades",
      dice: "2d6"
    }
    pc.pcHelper.addScalingTraits(psychicDmg);
    pc.pcHelper.addFeatures(CollegeOfWhispers.getFeature("3", "WORDS OF TERROR"));
  }

  static whispers5(pc: PlayerCharacter,params: LevelingParams) {
    const psychicDmg: ScalingTrait = pc.pcHelper.findScalingTraitByName("Psychic Blades");
    psychicDmg.dice = "3d6";
  }

  static whispers6(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(CollegeOfWhispers.getFeature("6", "MANTLE OF WHISPERS"));
  }

  static whispers10(pc: PlayerCharacter,params: LevelingParams) {
    const psychicDmg: ScalingTrait = pc.pcHelper.findScalingTraitByName("Psychic Blades");
    psychicDmg.dice = "5d6";
  }

  static whispers14(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(CollegeOfWhispers.getFeature("14", "SHADOW LORE"));
  }  

  static whispers15(pc: PlayerCharacter,params: LevelingParams) {
    const psychicDmg: ScalingTrait = pc.pcHelper.findScalingTraitByName("Psychic Blades");
    psychicDmg.dice = "8d6";
  }
}