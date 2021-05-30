import { PlayerCharacter } from "../../../../Base/PlayerCharacter";
import { LevelingParams } from "../../../../Classes/PlayerClass";
import * as GreatOldOnePatronDict from "./TheGreatOldOne.json"

export class GreatOldOne {

  static getFeature(level: string, featureName: string) {
    return GreatOldOnePatronDict["features"][level][featureName];
  }

  static getPatronSpells(pc: PlayerCharacter, patron: string, level: string) {
    pc.pcHelper.addSpells(GreatOldOne.patronSpells[level], "charisma");
  }

  static greatOldOne1(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(GreatOldOne.getFeature("1", "AWAKENED MIND"));
  }
  
  static greatOldOne6(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(GreatOldOne.getFeature("6", "ENTROPIC WARD"));
  }

  static greatOldOne10(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(GreatOldOne.getFeature("10", "THOUGHT SHIELD"));
  }

  static greatOldOne14(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(GreatOldOne.getFeature("14", "CREATE THRALL"));
  }
  
  static patronSpells = {
    "1": ["DISSONANT WHISPERS", "TASHA'S HIDEOUS LAUGHTER"],
    "2": ["DETECT THOUGHTS", "PHANTASMAL FORCE"],
    "3": ["CLAIRVOYANCE", "SENDING"],
    "4": ["DOMINATE BEAST", "EVARD'S BLACK TENTACLES"],
    "5": ["DOMINATE PERSON", "TELEKINESIS"]
  }
}