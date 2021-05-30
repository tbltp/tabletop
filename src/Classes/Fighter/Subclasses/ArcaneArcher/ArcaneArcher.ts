import { ScalingTrait } from "../../../../Base/Interfaces";
import { PlayerCharacter } from "../../../../Base/PlayerCharacter";
import { LevelingParams } from "../../../../Classes/PlayerClass";
import { FighterSubclassParams } from "../FighterSubclass";
import * as ArcaneArcherArchetype from "./ArcaneArcher.json"
import * as ArcaneShots from "./ArcaneShots.json"

export class ArcaneArcher {

  static getArcaneShot(shotName: string) {
    return ArcaneShots[shotName];
  }

  static getFeature(level: string, featureName: string) {
    return ArcaneArcherArchetype["features"][level][featureName];
  }

  static getArrow(pc: PlayerCharacter, params: LevelingParams) {
    // const arrowChoice = pc.pcHelper.findFeatureTraitByName("ARCANE SHOT CHOICES");
    // arrowChoice.choices.push(...(params.subclassParams as FighterSubclassParams)['arcaneShots']);
    return (params.subclassParams as FighterSubclassParams).arcaneShots.map(shot => ArcaneArcher.getArcaneShot(shot));
  }

  static arcaneArcher3(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(...ArcaneArcher.getArrow(pc, params), ArcaneArcher.getFeature("3", "ARCANE ARCHER LORE"), ArcaneArcher.getFeature("3", "ARCANE SHOT"));
    pc.pcHelper.addSpells(params.subclassParams.spellSelections.add,"intelligence");
    const arcaneShot: ScalingShotTrait = {dice: "2d6", saveDice: "1d6"}
    pc.pcHelper.addEffectsToFeature("ARCANE SHOT", {scaling: arcaneShot})
  }

  static arcaneArcher7(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(...ArcaneArcher.getArrow(pc, params), ArcaneArcher.getFeature("7", "MAGIC ARROW"), ArcaneArcher.getFeature("7", "CURVING SHOT"));
  }

  static arcaneArcher10(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(...ArcaneArcher.getArrow(pc, params));
  }

  static arcaneArcher15(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(...ArcaneArcher.getArrow(pc, params));
  }

  static arcaneArcher18(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(...ArcaneArcher.getArrow(pc, params));
    const arcaneShot = pc.pcHelper.findFeatureTraitByName("Arcane Shot").scaling as ScalingShotTrait;
    arcaneShot.dice = "4d6"
    arcaneShot.saveDice = "2d6"
  }
}

interface ScalingShotTrait extends ScalingTrait {
  saveDice: string;
}