import { PlayerCharacter } from "../../../../Base/PlayerCharacter";
import { LevelingParams } from "../../../../Classes/PlayerClass";
import * as KenseiDict from "./Kensei.json"

export class Kensei {
    
  static getFeature(level: string, featureName: string) {
      return KenseiDict["features"][level][featureName];
  }
  
  static kensei3(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(Kensei.getFeature("3", "PATH OF THE KENSEI"));
    pc.traits.toolProficiencies.push(params.proficiencySelection[0]);
  }

  static kensei6(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(Kensei.getFeature("6", "ONE WITH THE BLADE"));
  }

  static kensei11(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(Kensei.getFeature("11", "SHARPEN THE BLADE"));
  }

  static kensei17(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(Kensei.getFeature("17", "UNERRING ACCURACY"));
  }
}