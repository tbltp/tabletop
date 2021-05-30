import { PlayerCharacter } from "../../../../Base/PlayerCharacter";
import { LevelingParams } from "../../../../Classes/PlayerClass";
import * as EldritchKnightArchetype from "./EldritchKnight.json"

export class EldritchKnight {

  static getFeature(level: string, featureName: string) {
    return EldritchKnightArchetype["features"][level][featureName];
  }

  static eldritchKnight3(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(EldritchKnight.getFeature( "3", "WEAPON BOND"))

    const spellAttack = {
      proficiency: pc.proficiency.baseBonus,
      modifier: pc.abilityScores["intelligence"].modifier
    }

    const spellSave = {
      base: 8,
      proficiency: pc.proficiency.baseBonus,
      modifier: pc.abilityScores["intelligence"].modifier
    }

    let spellcasting = {
      title: "ELDRITCH KNIGHT",
      spellSave: spellSave,
      spellAttack : spellAttack
    }

    pc.spellcasting
      ? pc.spellcasting.abilities.push(spellcasting)
      : (pc.spellcasting = {spellSlots: [], abilities: [spellcasting]});

    pc.pcHelper.addSpells(params.subclassParams.spellSelections.add, "intelligence");
  }
  
  static eldritchKnight4(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addSpells(params.subclassParams.spellSelections.add, "intelligence");
  }

  static eldritchKnight7(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(EldritchKnight.getFeature("7", "WAR MAGIC"))
    pc.pcHelper.addSpells(params.subclassParams.spellSelections.add, "intelligence");
  }

  static eldritchKnight8(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addSpells(params.subclassParams.spellSelections.add, "intelligence");
  }

  static eldritchKnight10(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(EldritchKnight.getFeature("10", "ELDRITCH STRIKE"))
    pc.pcHelper.addSpells(params.subclassParams.spellSelections.add, "intelligence");
  }

  static eldritchKnight11(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addSpells(params.subclassParams.spellSelections.add, "intelligence");
  }

  static eldritchKnight13(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addSpells(params.subclassParams.spellSelections.add, "intelligence");
  }

  static eldritchKnight14(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addSpells(params.subclassParams.spellSelections.add, "intelligence");
  }

  static eldritchKnight15(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(EldritchKnight.getFeature("15", "ARCANE CHARGE"))
  }

  static eldritchKnight16(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addSpells(params.subclassParams.spellSelections.add, "intelligence");
  }

  static eldritchKnight18(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(EldritchKnight.getFeature("18", "IMPROVED WAR MAGIC"))
  }

  static eldritchKnight19(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addSpells(params.subclassParams.spellSelections.add, "intelligence");
  }

  static eldritchKnight20(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addSpells(params.subclassParams.spellSelections.add, "intelligence");
  }
}