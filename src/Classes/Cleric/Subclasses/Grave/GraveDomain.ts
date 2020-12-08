import { ScalingTrait } from "Base/Interfaces";
import { PlayerCharacter } from "Base/PlayerCharacter";
import { LevelingParams } from "../../../PlayerClass";
import * as GraveDomainDict from "./Grave.json";


export class GraveDomain {

  static getFeature(level: string, featureName: string) {
      return GraveDomainDict["features"][level][featureName];
  }
  
  static getSpells(pc: PlayerCharacter, level: string){
    pc.pcHelper.addSpells(GraveDomain.spells[level],"wisdom");
  }

  static grave1(pc: PlayerCharacter, params: LevelingParams) {
    GraveDomain.getSpells(pc,"1");
    pc.pcHelper.addFeatures(
      GraveDomain.getFeature("1", "CIRCLE OF MORTALITY"),
      GraveDomain.getFeature("1", "EYES OF THE GRAVE")
    );
    }
  
  static grave2(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(
        GraveDomain.getFeature("2", "PATH TO THE GRAVE")
    );
  }

  static grave3(pc: PlayerCharacter, params: LevelingParams) {
    GraveDomain.getSpells(pc,"3");
  }

  static grave5(pc: PlayerCharacter, params: LevelingParams) {
    GraveDomain.getSpells(pc,"5");
  }

  static grave6(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(GraveDomain.getFeature("6", "SENTINEL AT DEATH'S DOOR"));
  }

  static grave7(pc: PlayerCharacter, params: LevelingParams) {
    GraveDomain.getSpells(pc,"7");
  }

  static grave8(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(GraveDomain.getFeature("8", "POTENT SPELLCASTING"));
  }

  static grave9(pc: PlayerCharacter, params: LevelingParams) {
    GraveDomain.getSpells(pc,"9");
  }

  static grave17(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(GraveDomain.getFeature("17", "KEEPER OF SOULS"));
  }

  static spells = {
    1: ["BANE","FALSE LIFE","SPARE THE DYING"],
    3: ["GENTLE REPOSE", "RAY OF ENFEEBLEMENT"],
    5: ["REVIVIFY", "VAMPIRIC TOUCH"],
    7: ["BLIGHT","DEATH WARD"],
    9: ["ANTILIFE SHELL", "RAISE DEAD"]
  }
}