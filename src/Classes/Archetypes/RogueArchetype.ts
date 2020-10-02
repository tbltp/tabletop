import { PlayerCharacter } from "../../Base/PlayerCharacter";
import { LevelingParams } from "../PlayerClass";
import { SpellSlotFactory } from '../SpellSlotFactory'
import { Archetype } from "../Archetypes";

export class RogueArchetype extends Archetype {
    static archetypeHelper = {
      THIEF: {
        "3": RogueArchetype.thief3,
        "9": RogueArchetype.thief9,
        "13": RogueArchetype.thief13,
        "17": RogueArchetype.thief17,
      },
      ASSASSIN: {
        "3": RogueArchetype.assassin3,
        "9": RogueArchetype.assassin9,
        "13": RogueArchetype.assassin13,
        "17": RogueArchetype.assassin17,
      },
      "ARCANE TRICKSTER": {
        "3": RogueArchetype.arcaneTrickster3,
        "9": RogueArchetype.arcaneTrickster9,
        "13": RogueArchetype.arcaneTrickster13,
        "17": RogueArchetype.arcaneTrickster17,
      }
    };
  
    static getFeature(archetypeName: string, level: string, featureName: string) {
      return Archetype.getFeature("ROGUE", archetypeName, level, featureName);
    }

    static thief3(pc: PlayerCharacter, params: LevelingParams) {
      pc.addFeatures(RogueArchetype.getFeature("THIEF", "3", "FAST HANDS"), RogueArchetype.getFeature("THIEF", "3", "SECOND-STORY WORK"));
    }
  
    static thief9(pc: PlayerCharacter, params: LevelingParams) {
      pc.addFeatures(RogueArchetype.getFeature("THIEF", "9", "SUPREME SNEAK"));
    }
  
    static thief13(pc: PlayerCharacter, params: LevelingParams) {
      pc.addFeatures(RogueArchetype.getFeature("THIEF", "13", "USE MAGIC DEVICE"));
    }
  
    static thief17(pc: PlayerCharacter, params: LevelingParams) {
      pc.addFeatures(RogueArchetype.getFeature("THIEF", "17", "THIEF'S REFLEXES"));
    }
  
    static assassin3(pc: PlayerCharacter, params: LevelingParams) {
      pc.addFeatures(RogueArchetype.getFeature("ASSASSIN", "3", "BONUS PROFICIENCIES"), RogueArchetype.getFeature("ASSASSIN", "3", "ASSASSINATE"));
      pc.traits.toolProficiencies.push("Poisoner's Kit", "Disguise Kit")
    }
  
    static assassin9(pc: PlayerCharacter, params: LevelingParams) {
      pc.addFeatures(RogueArchetype.getFeature("ASSASSIN", "9", "INFILTRATION EXPERTISE"));
    }
  
    static assassin13(pc: PlayerCharacter, params: LevelingParams) {
      pc.addFeatures(RogueArchetype.getFeature("ASSASSIN", "13", "IMPOSTOR"));
    }
  
    static assassin17(pc: PlayerCharacter, params: LevelingParams) {
      pc.addFeatures(RogueArchetype.getFeature("ASSASSIN", "17", "DEATH STRIKE"));
    }
  
    static arcaneTrickster3(pc: PlayerCharacter, params: LevelingParams) {
      pc.addSpells(params.spellSelection, "intelligence")
      SpellSlotFactory.applySpellSlotsAtLevel(pc, 3, "TERTIARY")
      pc.addFeatures(RogueArchetype.getFeature("ARCANE TRICKSTER", "3", "MAGE HAND LEGERDEMAIN"));
    }
  
    static arcaneTrickster9(pc: PlayerCharacter, params: LevelingParams) {
      pc.addFeatures(RogueArchetype.getFeature("ARCANE TRICKSTER", "9", "MAGICAL AMBUSH"));
    }
  
    static arcaneTrickster13(pc: PlayerCharacter, params: LevelingParams) {
      pc.addFeatures(RogueArchetype.getFeature("ARCANE TRICKSTER", "13", "VERSATILE TRICKSTER"));
    }
  
    static arcaneTrickster17(pc: PlayerCharacter, params: LevelingParams) {
      pc.addFeatures(RogueArchetype.getFeature("ARCANE TRICKSTER", "17", "SPELL THIEF"));
    }
  }