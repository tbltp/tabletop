import { ResourceTrait, ScalingTrait } from "Base/Interfaces";
import { PlayerCharacter } from "Base/PlayerCharacter";
import { LevelingParams } from "../../../PlayerClass";
import * as NatureDomainDict from "./Nature.json";

export class NatureDomain {
    
  static getFeature(level: string, featureName: string) {
      return NatureDomainDict["features"][level][featureName];
  }

  static getSpells(pc: PlayerCharacter, level: string){
    pc.pcHelper.addSpells(NatureDomain.spells[level],"wisdom");
  }

  static nature1(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addSpells(
      [...params.spellSelections.add],"wisdom");
    NatureDomain.getSpells(pc,"1");
    pc.traits.armorProficiencies.push("Heavy");
    pc.pcHelper.addFeatures(
      {
        ...NatureDomain.getFeature("1", "ACOLYTE OF NATURE"),
        choices: params.spellSelections.add,
      },
      NatureDomain.getFeature("1", "BONUS PROFICIENCY")
    );
  }

  static nature2(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(
        NatureDomain.getFeature(
        "2",
        "CHANNEL DIVINITY: CHARM ANIMALS AND PLANTS"
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
    const divineStrike: ScalingTrait = {
      title: "Divine Strike",
      description:
        "Dice used for Divine Strike (cold, fire, or lightning damage).",
      dice: "1d8",
    };
    pc.pcHelper.addScalingTraits(divineStrike);
    pc.pcHelper.addFeatures(NatureDomain.getFeature("8", "DIVINE STRIKE"));
  }

  static nature9(pc: PlayerCharacter, params: LevelingParams) {
    NatureDomain.getSpells(pc,"9");
  }

  static nature14(pc:PlayerCharacter,params:LevelingParams) {
    const divineStrike: ScalingTrait = pc.pcHelper.findScalingTraitByName("Divine Strike");
    divineStrike.dice = "2d8";
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