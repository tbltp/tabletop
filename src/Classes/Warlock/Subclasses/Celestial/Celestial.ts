import { resourceLimits } from "worker_threads";
import { ResourceTrait, ScalingTrait } from "../../../../Base/Interfaces";
import { PlayerCharacter } from "../../../../Base/PlayerCharacter";
import { LevelingParams } from "../../../../Classes/PlayerClass";
import * as CelestialPatronDict from "./TheCelestial.json"

export class Celestial {

  static getFeature(level: string, featureName: string) {
    return CelestialPatronDict["features"][level][featureName];
  }

  static getPatronSpells(pc: PlayerCharacter, level: string) {
    pc.pcHelper.addSpells(Celestial.patronSpells[level], "charisma");
  }

  static upScale(pc: PlayerCharacter) {
    const healing: ResourceTrait = pc.pcHelper.findResourceTraitByName("Healing Light");
    healing.bonus++;
  }

  static upBoth(pc: PlayerCharacter) {
    Celestial.upScale(pc);
    const celestial: ScalingTrait = pc.pcHelper.findScalingTraitByName("Celestial Resilience");
    celestial.bonus++;
    celestial.points = pc.abilityScores.charisma.modifier.value;
  }

  static celestial1(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(Celestial.getFeature("1", "BONUS CANTRIPS"));
    pc.pcHelper.addFeatures(Celestial.getFeature("1", "HEALING LIGHT"));
    pc.pcHelper.addSpells(["SACRED FLAME","LIGHT"],"charisma");
    const healingtLight: ResourceTrait = {
      title: "Healing Light",
      description: "Your pool of resources for Healing Light",
      dice: "1d6",
      bonus: 2,
      resourceMax: pc.abilityScores.charisma.modifier
    }
    Celestial.getPatronSpells(pc,"1");
    pc.pcHelper.addResourceTraits(healingtLight);
  }

  static celestial3(pc: PlayerCharacter, params: LevelingParams) {
    Celestial.getPatronSpells(pc,"2");
    Celestial.upScale(pc);
  }

  static celestial5(pc: PlayerCharacter, params: LevelingParams) {
    Celestial.getPatronSpells(pc,"3");
    Celestial.upScale(pc);
  }

  static celestial6(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(Celestial.getFeature("6", "RADIANT SOUL"));
    Celestial.upScale(pc);
  }

  static celestial7(pc: PlayerCharacter, params: LevelingParams) {
    Celestial.getPatronSpells(pc,"4");
    Celestial.upScale(pc);
  }

  static celestial9(pc: PlayerCharacter, params: LevelingParams) {
    Celestial.getPatronSpells(pc,"5");
    Celestial.upScale(pc);
  }

  static celestial10(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(Celestial.getFeature("10", "CELESTIAL RESILIENCE"));
    const celestial: ScalingTrait = {
      title: "Celestial Resilience",
      description: "Temporary HP granted by Celestial Resilience, allies get half of bonus",
      points: pc.abilityScores.charisma.modifier.value,
      bonus: 10
    }
    pc.pcHelper.addScalingTraits(celestial);
    Celestial.upScale(pc);
  }

  static celestial14(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(Celestial.getFeature("14", "SEARING VENGEANCE"));
    Celestial.upBoth(pc);
  }

  static patronSpells = {
    "1": ["CURE WOUNDS", "GUIDING BOLT"],
    "2": ["FLAMING SPHERE", "LESSER RESTORATION"],
    "3": ["DAYLIGHT", "REVIVIFY"],
    "4": ["GUARDIAN OF FAITH", "WALL OF FIRE"],
    "5": ["FLAME STRIKE", "GREATER RESTORATION"]
  }
}