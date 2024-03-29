import { PlayerCharacter } from "../../../../Character/PlayerCharacter";
import { LevelingParams } from "../../../../Classes/PlayerClass";
import * as ArcaneTricksterArchetypeDict from "./ArcaneTrickster.json"

export class ArcaneTrickster {

  static getFeature(level: string, featureName: string) {
    return ArcaneTricksterArchetypeDict["features"][level][featureName];
  }

  static arcaneTrickster3(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(ArcaneTrickster.getFeature("3", "MAGE HAND LEGERDEMAIN"));

    const spellAttack = {
      proficiency: pc.charProficiency.baseBonus,
      modifier: pc.abilityScores["intelligence"].modifier
    }

    const spellSave = {
      base: 8,
      proficiency: pc.charProficiency.baseBonus,
      modifier: pc.abilityScores["intelligence"].modifier
    }

    let spellcasting = {
      title: "ARCANE TRICKSTER",
      spellSave: spellSave,
      spellAttack : spellAttack
    }

    pc.spellcasting
      ? pc.spellcasting.abilities.push(spellcasting)
      : (pc.spellcasting = {spellSlots: [], abilities: [spellcasting]});


    pc.pcHelper.addSpells([...params.subclassParams.spellSelections.add, "MAGE HAND"], "intelligence")
  }
      
  static arcaneTrickster4(pc: PlayerCharacter, params: LevelingParams){
    pc.pcHelper.addSpells(params.subclassParams.spellSelections.add, "intelligence")
  }

  static arcaneTrickster7(pc: PlayerCharacter, params: LevelingParams){
    pc.pcHelper.addSpells(params.subclassParams.spellSelections.add, "intelligence")
  }

  static arcaneTrickster8(pc: PlayerCharacter, params: LevelingParams){
    pc.pcHelper.addSpells(params.subclassParams.spellSelections.add, "intelligence")
  }

  static arcaneTrickster9(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(ArcaneTrickster.getFeature("9", "MAGICAL AMBUSH"));
  }

  static arcaneTrickster10(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addSpells(params.subclassParams.spellSelections.add, "intelligence")
  }

  static arcaneTrickster11(pc: PlayerCharacter, params: LevelingParams){
    pc.pcHelper.addSpells(params.subclassParams.spellSelections.add, "intelligence")
  }

  static arcaneTrickster13(pc: PlayerCharacter, params: LevelingParams){
    pc.pcHelper.addFeatures(ArcaneTrickster.getFeature("13", "VERSATILE TRICKSTER"));
    pc.pcHelper.addSpells(params.subclassParams.spellSelections.add, "intelligence")
  }

  static arcaneTrickster14(pc: PlayerCharacter, params: LevelingParams){
    pc.pcHelper.addSpells(params.subclassParams.spellSelections.add, "intelligence")
  }

  static arcaneTrickster16(pc: PlayerCharacter, params: LevelingParams){
    pc.pcHelper.addSpells(params.subclassParams.spellSelections.add, "intelligence")
  }

  static arcaneTrickster17(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(ArcaneTrickster.getFeature("17", "SPELL THIEF"));
  }

  static arcaneTrickster19(pc: PlayerCharacter, params: LevelingParams){
    pc.pcHelper.addSpells(params.subclassParams.spellSelections.add, "intelligence")
  }

  static arcaneTrickster20(pc: PlayerCharacter, params: LevelingParams){
    pc.pcHelper.addSpells(params.subclassParams.spellSelections.add, "intelligence")
  }
}