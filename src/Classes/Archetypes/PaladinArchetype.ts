import { PlayerCharacter } from "../../Base/PlayerCharacter";
import { LevelingParams } from "../PlayerClass";
import { Archetype } from "../Archetypes";

export class PaladinArchetype extends Archetype {
    static archetypeHelper = {
      DEVOTION: {
        "3": PaladinArchetype.devotion3,
        "7": PaladinArchetype.devotion7,
        "15": PaladinArchetype.devotion15,
        "20": PaladinArchetype.devotion20,
      },
      ANCIENTS: {
        "3": PaladinArchetype.devotion3,
        "7": PaladinArchetype.devotion7,
        "15": PaladinArchetype.devotion15,
        "20": PaladinArchetype.devotion20,
      },
      VENGEANCE: {
        "3": PaladinArchetype.vengeance3,
        "7": PaladinArchetype.vengeance7,
        "15": PaladinArchetype.vengeance15,
        "20": PaladinArchetype.vengeance20,
      },
    };
  
    static oathSpells = {
      DEVOTION: {
        "3": ["PROTECTION FROM EVIL AND GOOD", "SANCTUARY"],
        "5": ["LESSER RESTORATION", "ZONE OF TRUTH"],
        "9": ["BEACON OF HOPE", "DISPEL MAGIC"],
        "13": ["FREEDOM OF MOVEMENT", "GUARDIAN OF FAITH"],
        "17": ["COMMUNE", "FLAME STRIKE"],
      },
      ANCIENTS: {
        "3": ["ENSNARING STRIKE", "SPEAK WITH ANIMALS"],
        "5": ["MOONBEAM", "MISTY STEP"],
        "9": ["PLANT GROWTH", "PROTECTION FROM ENERGY"],
        "13": ["ICE STORM", "STONESKIN"],
        "17": ["COMMUNE WITH NATURE", "TREE STRIDE"],
      },
      VENGEANCE: {
        "3": ["BANE", "HUNTER'S MARK"],
        "5": ["HOLD PERSON", "MISTY STEP"],
        "9": ["HASTE", "PROTECTION FROM ENERGY"],
        "13": ["BANISHMENT", "DIMENSION DOOR"],
        "17": ["HOLD MONSTER", "SCRYING"],
      }
    };
  
    static getFeature(archetypeName: string, level: string, featureName: string) {
      return Archetype.getFeature("PALADIN", archetypeName, level, featureName);
    }
  
    static devotion3(pc: PlayerCharacter, params: LevelingParams) {
      pc.addFeatures(
        PaladinArchetype.getFeature("DEVOTION", "3", "SACRED WEAPON"), 
        PaladinArchetype.getFeature("DEVOTION", "3", "TURN THE UNHOLY") 
      )
    }
  
    static devotion7(pc: PlayerCharacter, params: LevelingParams) {
      pc.addFeatures(PaladinArchetype.getFeature("DEVOTION", "7", "AURA OF DEVOTION")) 
    }
  
    static devotion15(pc: PlayerCharacter, params: LevelingParams) {
      pc.addFeatures(PaladinArchetype.getFeature("DEVOTION", "15", "PURITY OF SPIRIT"))
    }
  
    static devotion20(pc: PlayerCharacter, params: LevelingParams) {
      pc.addFeatures(PaladinArchetype.getFeature("DEVOTION", "20", "HOLY NIMBUS"))
    }
  
    static ancients3(pc: PlayerCharacter, params: LevelingParams) {
      pc.addFeatures(
        PaladinArchetype.getFeature("ANCIENTS", "3", "NATURE'S WRATH"),
        PaladinArchetype.getFeature("ANCIENTS", "3", "TURN THE FAITHLESS")
      )
    }
  
    static ancients7(pc: PlayerCharacter, params: LevelingParams) {
      pc.addFeatures(PaladinArchetype.getFeature("ANCIENTS", "7", "AURA OF WARDING"))
    }
  
    static ancients15(pc: PlayerCharacter, params: LevelingParams) {
      pc.addFeatures(PaladinArchetype.getFeature("ANCIENTS", "15", "UNDYING SENTINEL"))
    }
  
    static ancients20(pc: PlayerCharacter, params: LevelingParams) {
      pc.addFeatures(PaladinArchetype.getFeature("ANCIENTS", "20", "ELDER CHAMPION"))
    }
  
    static vengeance3(pc: PlayerCharacter, params: LevelingParams) {
      pc.addFeatures(
        PaladinArchetype.getFeature("VENGEANCE", "3", "ABJURE ENEMY"),
        PaladinArchetype.getFeature("VENGEANCE", "3", "VOW OF ENMITY")
      )
    }
  
    static vengeance7(pc: PlayerCharacter, params: LevelingParams) {
      pc.addFeatures(PaladinArchetype.getFeature("VENGEANCE", "7", "RELENTLESS AVENGER"))
    }
  
    static vengeance15(pc: PlayerCharacter, params: LevelingParams) {
      pc.addFeatures(PaladinArchetype.getFeature("VENGEANCE", "15", "SOUL OF VENGEANCE"))
    }
  
    static vengeance20(pc: PlayerCharacter, params: LevelingParams) {
      pc.addFeatures(PaladinArchetype.getFeature("VENGEANCE", "20", "AVENGING ANGEL"))
    }
  }