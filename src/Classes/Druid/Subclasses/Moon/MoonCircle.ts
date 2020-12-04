import { PlayerCharacter } from "../../../../Base/PlayerCharacter";
import { LevelingParams } from "../../../../Classes/PlayerClass";
import * as MoonCircleDict from "./Moon.json";


export class MoonCircle {
    
  static getFeature(level: string, featureName: string) {
      return MoonCircleDict[level][featureName];
  }

  static moon2(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(MoonCircle.getFeature("2", "COMBAT WILD SHAPE"));
    pc.pcHelper.addFeatures(MoonCircle.getFeature("2", "CIRCLE FORMS"));
    pc.pcHelper.findScalingTraitByName("Wild Shape").challengeRating = 1;
  }
  
  static moon6(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(MoonCircle.getFeature("6", "PRIMAL STRIKE"));
    pc.pcHelper.findScalingTraitByName("Wild Shape").challengeRating = 2;
  }
    
  static moon9(pc: PlayerCharacter, params: LevelingParams){
    pc.pcHelper.findScalingTraitByName("Wild Shape").challengeRating = 3;
  }

  static moon10(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(
        MoonCircle.getFeature("10", "ELEMENTAL WILD SHAPE")
    );
  }
    
  static moon12(pc: PlayerCharacter, params: LevelingParams){
    pc.pcHelper.findScalingTraitByName("Wild Shape").challengeRating = 4;
  }

  static moon14(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(MoonCircle.getFeature("14", "THOUSAND FORMS"));
  }

  static moon15(pc: PlayerCharacter, params: LevelingParams){
    pc.pcHelper.findScalingTraitByName("Wild Shape").challengeRating = 5;
  }

  static moon18(pc: PlayerCharacter, params: LevelingParams){
    pc.pcHelper.findScalingTraitByName("Wild Shape").challengeRating = 6;
  }
    
}