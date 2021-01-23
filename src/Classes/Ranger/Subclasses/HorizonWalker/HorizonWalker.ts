import { ScalingTrait } from "../../../../Base/Interfaces";
import { PlayerCharacter } from "../../../../Base/PlayerCharacter";
import { LevelingParams } from "../../../../Classes/PlayerClass";
import * as HorizonWalkerArchetypeDict from "./HorizonWalker.json"

export class HorizonWalker {

  static getFeature(level: string, featureName: string) {
    return HorizonWalkerArchetypeDict["features"][level][featureName];
  }

  static getSpell(pc: PlayerCharacter, level:string) {
    pc.pcHelper.addSpells(HorizonWalker.spells[level],"wisdom");
  }
  static horizonWalker3(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(HorizonWalker.getFeature("3", "DETECT PORTAL"));
    pc.pcHelper.addFeatures(HorizonWalker.getFeature("3", "PLANAR WARRIOR"));
    const planarDmg: ScalingTrait = {
      title: "Planar Warrior",
      description: "Extra damage granted by Planar Warrior",
      dice: "1d8"
    }
    pc.pcHelper.addScalingTraits(planarDmg);
    HorizonWalker.getSpell(pc,"3");
  }

  static horizonWalker5(pc: PlayerCharacter, params: LevelingParams) {
    HorizonWalker.getSpell(pc,"5");
  }

  static horizonWalker7(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(HorizonWalker.getFeature("7", "ETHEREAL STEP"));
    pc.pcHelper.addSpells(["ETHEREALNESS"],"wisdom");
  }

  static horizonWalker9(pc: PlayerCharacter, params: LevelingParams) {
    HorizonWalker.getSpell(pc,"9");
  }

  static horizonWalker11(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(HorizonWalker.getFeature("11", "DISTANT STRIKE"));
    const planarDmg: ScalingTrait = pc.pcHelper.findScalingTraitByName("Planar Warrior");
    planarDmg.dice = "2d8";
  }

  static horizonWalker13(pc: PlayerCharacter, params: LevelingParams) {
    HorizonWalker.getSpell(pc,"13");
  }

  static horizonWalker15(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(HorizonWalker.getFeature("15", "SPECTRAL DEFENSE"));
  }

  static horizonWalker17(pc: PlayerCharacter, params: LevelingParams) {
    HorizonWalker.getSpell(pc,"17");
  }

  static spells = {
    "3": ["PROTECTION FROM EVIL AND GOOD"],
    "5": ["MISTY STEP"],
    "9": ["HASTE"],
    "13": ["BANISHMENT"],
    "17": ["TELEPORTATION CIRCLE"]
  }
}