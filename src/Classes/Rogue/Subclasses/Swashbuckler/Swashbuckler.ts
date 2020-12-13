import { PlayerCharacter } from "../../../../Base/PlayerCharacter";
import { LevelingParams } from "../../../../Classes/PlayerClass";
import * as SwashbucklerArchetypeDict from "./Swashbuckler.json"

export class Swashbuckler {

  static getFeature(level: string, featureName: string) {
    return SwashbucklerArchetypeDict["features"][level][featureName];
  }

  static swashbuckler3(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(Swashbuckler.getFeature("3", "FANCY FOOTWORK"), 
    Swashbuckler.getFeature("3", "RAKISH AUDACITY"));
  }

  static swashbuckler9(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(Swashbuckler.getFeature("9", "PANACHE"));
  }

  static swashbuckler13(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(Swashbuckler.getFeature("13", "ELEGANT MANEUVER"));
  }

  static swashbuckler17(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(Swashbuckler.getFeature("17", "MASTER DUELIST"));
  }
}