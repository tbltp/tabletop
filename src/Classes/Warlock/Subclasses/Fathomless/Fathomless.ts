import { ResourceTrait, ScalingTrait } from "../../../../Base/Interfaces";
import { PlayerCharacter } from "../../../../Base/PlayerCharacter";
import { LevelingParams } from "../../../../Classes/PlayerClass";
import * as FathomlessPatronDict from "./TheFathomless.json"

export class Fathomless {

  static getFeature(level: string, featureName: string) {
    return FathomlessPatronDict["features"][level][featureName];
  }

  static getPatronSpells(pc: PlayerCharacter, patron: string, level: string) {
    pc.pcHelper.addSpells(Fathomless.patronSpells[level], "charisma");
  }

  static upGrasp(pc: PlayerCharacter, params: LevelingParams) {
    const grasping: ScalingTrait = pc.pcHelper.findScalingTraitByName("GRASPING TENTACLES");
    grasping.bonus++;
  }

  static fathomless1(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(Fathomless.getFeature("1", "TENTACLE OF THE DEEPS"),
    Fathomless.getFeature("1", "GIFT OF THE SEA"),Fathomless.getFeature("1", "EXPANDED SPELL LIST"));
    const deeps: ResourceTrait = {
      title: "Tentacle of the Deeps",
      description: "The number of times you may use Tentacle of the Deeps",
      resourceMax: pc.proficiency.baseBonus
    }
    const tentacle: ScalingTrait = {
      title: "Tentacle of the Deeps",
      description: "The cold damage you deal with Tentacle of the Deeps",
      dice: "1d8",
    }
    pc.pcHelper.addScalingTraits(tentacle);
    pc.pcHelper.addResourceTraits(deeps);
  }

  static fathomless6(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(Fathomless.getFeature("6", "OCEANIC SOUL"),Fathomless.getFeature("6", "GUARDIAN COIL"));
    const tentacle: ScalingTrait = pc.pcHelper.findScalingTraitByName("Tentacle of the Deeps");
    tentacle.description = "The damage (cold) you deal or reduce (Guardian Coil) with Tentacle of the Deeps";
  }

  static fathomless10(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(Fathomless.getFeature("10", "GRASPING TENTACLES"));
    pc.pcHelper.addSpells(["EVARD'S BLACK TENTACLES"],"charisma");
    const grasping: ScalingTrait = {
      title: "Grasping Tentacles",
      description: "The number of temporary hit points you gain from using Grasping Tentacles",
      bonus:10
    }
    const tentacle: ScalingTrait = pc.pcHelper.findScalingTraitByName("TENTACLE OF THE DEEPS");
    tentacle.dice = "2d8";
    pc.pcHelper.addScalingTraits(grasping);
  }

  static fathomless14(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(Fathomless.getFeature("14", "FATHOMLESS PLUNGE"));
  }

  static patronSpells = {
    "1": ["CREATE OR DESTROY WATER", "THUNDERWAVE"],
    "2": ["GUST OF WIND", "SILENCE"],
    "3": ["LIGHTNING BOLT", "SLEET STORM"],
    "4": ["CONTROL WATER", "SUMMON ELEMENTAL"],
    "5": ["BIGBY'S HAND", "CONE OF COLD"]
  }
}