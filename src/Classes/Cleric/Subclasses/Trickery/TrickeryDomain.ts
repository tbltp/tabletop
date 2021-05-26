import { ScalingTrait } from "Base/Interfaces";
import { PlayerCharacter } from "Base/PlayerCharacter";
import { LevelingParams, PlayerClass } from "../../../PlayerClass";
import * as TrickeryDomainDict from "./Trickery.json";

export class TrickeryDomain {
    
  static getFeature(level: string, featureName: string) {
      return TrickeryDomainDict["features"][level][featureName];
  }

  static getSpells(pc: PlayerCharacter, level: string){
    pc.pcHelper.addSpells(TrickeryDomain.spells[level],"wisdom");
  }

  static trickery1(pc: PlayerCharacter, params: LevelingParams) {
     pc.pcHelper.addFeatures(
      TrickeryDomain.getFeature("1", "BLESSING OF THE TRICKSTER")
    );
    TrickeryDomain.getSpells(pc,"1");
  }

  static trickery2(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(
      TrickeryDomain.getFeature(
        "2",
        "INVOKE DUPLICITY"
      )
    );
  }

  static trickery3(pc: PlayerCharacter, params: LevelingParams) {
    TrickeryDomain.getSpells(pc,"3");
  }

  static trickery5(pc: PlayerCharacter, params: LevelingParams) {
    TrickeryDomain.getSpells(pc,"5");
  }

  static trickery6(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(
      TrickeryDomain.getFeature(
        "6",
        "CLOAK OF SHADOWS"
      )
    );
  }

  static trickery7(pc: PlayerCharacter, params: LevelingParams) {
    TrickeryDomain.getSpells(pc,"7");
  }

  static trickery8(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(
      TrickeryDomain.getFeature("8", "DIVINE STRIKE")
    );
    pc.pcHelper.addEffectsToClassFeature("Divine Strike", {scaling: {dice: "1d8"}})
  }

  static trickery9(pc: PlayerCharacter, params: LevelingParams) {
    TrickeryDomain.getSpells(pc,"9");
  }

  static trickery14(pc:PlayerCharacter,params:LevelingParams) {
    pc.pcHelper.findFeatureTraitByName("Divine Strike").scaling.dice = "2d8";
  }

  static trickery17(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(
      TrickeryDomain.getFeature("17", "IMPROVED DUPLICITY")
    );
  }

  static spells = {
    1: ["CHARM PERSON","DISGUISE SELF"],
    3: ["MIRROR IMAGE","PASS WITHOUT TRACE"],
    5: ["BLINK", "DISPEL MAGIC"],
    7: ["DIMENSION DOOR","POLYMORPH"],
    9: ["DOMINATE PERSON","MODIFY MEMORY"]
  }
}