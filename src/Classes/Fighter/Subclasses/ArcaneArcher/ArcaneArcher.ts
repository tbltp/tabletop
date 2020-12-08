import { ScalingTrait } from "../../../../Base/Interfaces";
import { PlayerCharacter } from "../../../../Base/PlayerCharacter";
import { LevelingParams, PlayerClass } from "../../../../Classes/PlayerClass";
import * as ArcaneArcherArchetype from "./ArcaneArcher.json"

export class ArcaneArcher {

  static getFeature(level: string, featureName: string) {
      return ArcaneArcherArchetype["features"][level][featureName];
  }

  static arcaneArcher3(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(ArcaneArcher.getFeature("3", "ARCANE ARCHER LORE"));
    pc.pcHelper.addFeatures(ArcaneArcher.getFeature("3", "ARCANE SHOT"));
    const dmgShot: ScalingTrait = {
      title: "Arcane Shot (Damage)",
      description: "Damage inflicted for Beguiling, Bursting, Enfeebling, Grasping, and Shadow Arrow.",
      dice: "2d6"
    }
    const saveShot: ScalingTrait = {
      title: "Arcane Shot (Save)",
      description: "Damage inflicted for Piercing, Seeking, (and Banishing Arrow @ lvl18)",
      dice: "1d6"
    }
    pc.pcHelper.addSpells(params.spellSelections.add,"intelligence");
    pc.skills[params.proficiencySelection[0]].proficient = true;
    pc.pcHelper.addScalingTraits(dmgShot);
    pc.pcHelper.addScalingTraits(saveShot);
    pc.pcHelper.addFeatures(ArcaneArcher.getFeature("3", "ARCANE SHOT OPTIONS"));
  }

  static arcaneArcher7(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(ArcaneArcher.getFeature("7", "MAGIC ARROW"));
    pc.pcHelper.addFeatures(ArcaneArcher.getFeature("7", "CURVING SHOT"));
    pc.pcHelper.addFeatures(ArcaneArcher.getFeature("7", "ADDITIONAL ARCANE SHOT OPTION"));
  }

  static arcaneArcher10(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(ArcaneArcher.getFeature("10", "ADDITIONAL ARCANE SHOT OPTION"));
  }

  static arcaneArcher15(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(ArcaneArcher.getFeature("15", "EVER-READY SHOT"));
    pc.pcHelper.addFeatures(ArcaneArcher.getFeature("15", "ADDITIONAL ARCANE SHOT OPTION"));
  }

  static arcaneArcher18(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(ArcaneArcher.getFeature("18", "ADDITIONAL ARCANE SHOT OPTION"));
    const dmgShot: ScalingTrait = pc.pcHelper.findScalingTraitByName("Arcane Shot (Damage)");
    dmgShot.dice = "4d6";
    const saveShot: ScalingTrait = pc.pcHelper.findScalingTraitByName("Arcane Shot (Save)");
    dmgShot.dice = "2d6";
  }
}