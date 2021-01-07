import { ScalingTrait } from "../../../../Base/Interfaces";
import { PlayerCharacter } from "../../../../Base/PlayerCharacter";
import { LevelingParams } from "../../../../Classes/PlayerClass";
import * as HexbladePatronDict from "./TheHexblade.json"

export class Hexblade {

  static getFeature(level: string, featureName: string) {
    return HexbladePatronDict["features"][level][featureName];
  }

  static getPatronSpells(pc: PlayerCharacter, level: string) {
    pc.pcHelper.addSpells(Hexblade.patronSpells[level], "charisma");
  }

  static upCurse(pc: PlayerCharacter) {
    const hexCurse: ScalingTrait = pc.pcHelper.findScalingTraitByName("Hexblade's Curse");
    hexCurse.bonus = pc.proficiency.baseBonus.value;
    hexCurse.points = pc.level["WARLOCK"] + pc.abilityScores.charisma.modifier.value
  }

  static upSpecter(pc:PlayerCharacter) {
    const specter: ScalingTrait = pc.pcHelper.findScalingTraitByName("Accursed Specter");
    specter.bonus = pc.abilityScores.charisma.modifier.value;
    specter.points++;
    Hexblade.upCurse(pc);
  }

  static hexblade1(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(Hexblade.getFeature("1", "HEXBLADE'S CURSE"));
    pc.pcHelper.addFeatures(Hexblade.getFeature("1", "HEX WARRIOR"));
    pc.traits.armorProficiencies.push("Medium");
    pc.traits.weaponProficiencies.push("Martial");
    pc.traits.armorProficiencies.push("Shields");
    const hexCurse: ScalingTrait = {
      title: "Hexblade's Curse",
      description: "Bonus damage and healing points from Hexblade's Curse",
      bonus: pc.proficiency.baseBonus.value,
      points: 1 + pc.abilityScores.charisma.modifier.value
    }
    pc.pcHelper.addScalingTraits(hexCurse);
  }

  static hexblade6(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(Hexblade.getFeature("6", "ACCURSED SPECTER"));
    const specter: ScalingTrait = {
      title: "Accursed Specter",
      description: "Temporary hit points and bonus to attack rolls for Accursed Specter",
      bonus: pc.abilityScores.charisma.modifier.value,
      points: 3
    }
    pc.pcHelper.addScalingTraits(specter);
  }

  static hexblade10(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(Hexblade.getFeature("10", "ARMOR OF HEXES"));
    Hexblade.upSpecter(pc);
  }

  static hexblade14(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(Hexblade.getFeature("14", "MASTER OF HEXES"));
    Hexblade.upSpecter(pc);
  }

  static patronSpells = {
    "1": ["SHIELD", "WRATHFUL SMITE"],
    "2": ["BLUR", "BRANDING SMITE"],
    "3": ["BLINK", "ELEMENTAL WEAPON"],
    "4": ["PHANTASMAL KILLER", "STAGGERING SMITE"],
    "5": ["BANISHING SMITE", "CONE OF COLD"]
  }
}