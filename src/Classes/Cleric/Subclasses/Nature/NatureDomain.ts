import * as NatureDomainDict from "./Nature.json";

import { LevelingParams, PlayerClass } from "../../../PlayerClass";
import { ResourceTrait, ScalingTrait } from "Base/Interfaces";

import { PlayerCharacter } from "Base/PlayerCharacter";

export class NatureDomain {
    
  static getFeature(level: string, featureName: string) {
      return NatureDomainDict["features"][level][featureName];
  }

  static getSpells(pc: PlayerCharacter, level: string){
    pc.pcHelper.addSpells(NatureDomain.spells[level],"wisdom");
  }

  static nature1(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(
      {
        ...NatureDomain.getFeature("1", "ACOLYTE OF NATURE"),
        choices: params.subclassParams.spellSelections.add,
      },
      NatureDomain.getFeature("1", "BONUS PROFICIENCY")
    );
    pc.pcHelper.addSpells(
      [...params.subclassParams.spellSelections.add],"wisdom");
    NatureDomain.getSpells(pc,"1");
    pc.traits.armorProficiencies.add("Heavy");
  }

  static nature2(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(
        NatureDomain.getFeature(
        "2",
        "CHARM ANIMALS AND PLANTS"
      )
    );
  }

  static nature3(pc: PlayerCharacter, params: LevelingParams) {
    NatureDomain.getSpells(pc,"3");
  }

  static nature5(pc: PlayerCharacter, params: LevelingParams) {
    NatureDomain.getSpells(pc,"5");
  }

  static nature6(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(
        NatureDomain.getFeature("6", "DAMPEN ELEMENTS")
    );
  }

  static nature7(pc: PlayerCharacter, params: LevelingParams) {
    NatureDomain.getSpells(pc,"7");
  }

  static nature8(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(NatureDomain.getFeature("8", "DIVINE STRIKE"));
    pc.pcHelper.addEffectsToFeature("Divine Strike", {scaling: {dice: "1d8"}})
  }

  static nature9(pc: PlayerCharacter, params: LevelingParams) {
    NatureDomain.getSpells(pc,"9");
  }

  static nature14(pc:PlayerCharacter,params:LevelingParams) {
    pc.pcHelper.findFeatureTraitByName("Divine Strike").scaling.dice = "2d8";
  }

  static nature17(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(
        NatureDomain.getFeature("17", "MASTER OF NATURE")
    );
  }

  static spells = {
    1: ["ANIMAL FRIENDSHIP","SPEAK WITH ANIMALS"],
    3: ["BARKSKIN","SPIKE GROWTH"],
    5: ["PLANT GROWTH", "WIND WALL"],
    7: ["DOMINATE BEAST","GRASPING VINE"],
    9: ["INSECT PLAGUE","TREE STRIDE"]
  }
}