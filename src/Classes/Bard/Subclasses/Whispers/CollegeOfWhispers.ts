import { ScalingTrait } from "Character/Interfaces";
import { PlayerCharacter } from "../../../../Character/PlayerCharacter";
import { LevelingParams, PlayerClass } from "../../../PlayerClass";
import * as CollegeOfWhispersDict from "./CollegeOfWhispers.json";

export class CollegeOfWhispers {
    
  static getFeature(level: string, featureName: string) {
      return CollegeOfWhispersDict["features"][level][featureName];
  }

  static whispers3(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(CollegeOfWhispers.getFeature("3", "PSYCHIC BLADES"), CollegeOfWhispers.getFeature("3", "WORDS OF TERROR"));
    pc.pcHelper.addEffectsToFeature("Psychic Blades", {scaling: {dice: "2d6"}})
  }

  static whispers5(pc: PlayerCharacter,params: LevelingParams) {
    pc.pcHelper.findFeatureTraitByName("Psychic Blades").scaling.dice = "3d6";
  }

  static whispers6(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(CollegeOfWhispers.getFeature("6", "MANTLE OF WHISPERS"));
  }

  static whispers10(pc: PlayerCharacter,params: LevelingParams) {
    pc.pcHelper.findFeatureTraitByName("Psychic Blades").scaling.dice = "5d6";
  }

  static whispers14(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(CollegeOfWhispers.getFeature("14", "SHADOW LORE"));
  }  

  static whispers15(pc: PlayerCharacter,params: LevelingParams) {
    pc.pcHelper.findFeatureTraitByName("Psychic Blades").scaling.dice = "8d6";
  }
}