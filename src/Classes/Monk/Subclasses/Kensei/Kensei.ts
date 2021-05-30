import { PlayerCharacter } from "../../../../Base/PlayerCharacter";
import { LevelingParams } from "../../../../Classes/PlayerClass";
import * as KenseiDict from "./Kensei.json"

export class Kensei {

  static getFeature(level: string, featureName: string) {
    return KenseiDict["features"][level][featureName];
  }

  static addKensei(pc:PlayerCharacter, params: LevelingParams) {
    for(let wep in params.subclassParams.weapons) {
      pc.traits.weaponProficiencies.add(wep);
    }
  }
  static kensei3(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(Kensei.getFeature("3", "PATH OF THE KENSEI"));
    Kensei.addKensei(pc,params);
    
    //Add proficiency for Calligrapher's or Artist Tools
    pc.traits.toolProficiencies.add(params.subclassParams.toolProficiencies[0]);
  }

  static kensei6(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(Kensei.getFeature("6", "ONE WITH THE BLADE"));
    Kensei.addKensei(pc,params);
  }

  static kensei11(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(Kensei.getFeature("11", "SHARPEN THE BLADE"));
    Kensei.addKensei(pc,params);
  }

  static kensei17(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(Kensei.getFeature("17", "UNERRING ACCURACY"));
    Kensei.addKensei(pc,params);
  }
} 
