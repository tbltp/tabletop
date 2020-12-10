import { PlayerCharacter } from "../../../../Base/PlayerCharacter";
import { LevelingParams } from "../../../../Classes/PlayerClass";
import * as DrunkenMasterDict from "./DrunkenMaster.json"


export class DrunkenMaster {
    
  static getFeature(level: string, featureName: string) {
      return DrunkenMasterDict["features"][level][featureName];
  }
  
  static drunkenMaster3(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(DrunkenMaster.getFeature("3", "BONUS PROFICIENCIES"));
    pc.skills["performance"].proficient = true;
    pc.traits.toolProficiencies.push("BREWER'S SUPPLIES");
    pc.pcHelper.addFeatures(DrunkenMaster.getFeature("3", "DRUNKEN TECHNIQUE"));
  }

  static drunkenMaster6(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(DrunkenMaster.getFeature("6", "TIPSY SWAY"));
  }

  static drunkenMaster11(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(DrunkenMaster.getFeature("11", "DRUNKARD'S LUCK"));
  }

  static drunkenMaster17(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(DrunkenMaster.getFeature("17", "INTOXICATED FRENZY"));
  }
}