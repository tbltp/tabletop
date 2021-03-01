import { PlayerCharacter } from "../../../../Base/PlayerCharacter";
import { LevelingParams } from "../../../../Classes/PlayerClass";
import * as GloomStalkerArchetypeDict from "./GloomStalker.json"


export class GloomStalker {

  static getFeature(level: string, featureName: string) {
      return GloomStalkerArchetypeDict["features"][level][featureName];
  }
   
  static getSpell(pc: PlayerCharacter,level: string) {
    pc.pcHelper.addSpells(GloomStalker.spells[level],"wisdom");
  }

  static gloomStalker3(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(GloomStalker.getFeature("3","DREAD AMBUSHER"));
    pc.pcHelper.addFeatures(GloomStalker.getFeature("3","UMBRAL SIGHT"));
    GloomStalker.getSpell(pc,"3");
  }

  static gloomStalker5(pc: PlayerCharacter, params: LevelingParams) {
    GloomStalker.getSpell(pc,"5");
  }

  static gloomStalker7(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(GloomStalker.getFeature("7","IRON MIND"));
    if(params.subclassParams.savingThrows) pc.abilityScores[params.subclassParams.savingThrows[0]].savingThrowProficiency = true;
  }

  static gloomStalker9(pc: PlayerCharacter, params: LevelingParams) {
    GloomStalker.getSpell(pc,"9");
  }

  static gloomStalker11(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(GloomStalker.getFeature("11","STALKER'S FLURRY"));
  }

  static gloomStalker13(pc: PlayerCharacter, params: LevelingParams) {
    GloomStalker.getSpell(pc,"13");
  }

  static gloomStalker15(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(GloomStalker.getFeature("15","SHADOWY DODGE"));
  }

  static gloomStalker17(pc: PlayerCharacter, params: LevelingParams) {
    GloomStalker.getSpell(pc,"17");
  }
  
  static spells = {
    "3": ["DISGUISE SELF"],
    "5": ["ROPE TRICK"],
    "9": ["FEAR"],
    "13": ["GREATER INVISIBILITY"],
    "17": ["SEEMING"]
  }
}