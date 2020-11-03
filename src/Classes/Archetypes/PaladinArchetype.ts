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

    static addArchetypeSpells(pc: PlayerCharacter, archetypeName: string, level: string){
      pc.addSpells(this.oathSpells[archetypeName][level], "charisma");
    }
  
    static devotion3(pc: PlayerCharacter, params: LevelingParams) {
      pc.addFeatures(
        PaladinArchetype.getFeature("DEVOTION", "3", "SACRED WEAPON"), 
        PaladinArchetype.getFeature("DEVOTION", "3", "TURN THE UNHOLY") 
      )

      PaladinArchetype.addArchetypeSpells(pc, "DEVOTION", "3");
    }

    static devotion5(pc: PlayerCharacter, params: LevelingParams) {
      PaladinArchetype.addArchetypeSpells(pc, "DEVOTION", "5");
    }
  
  
    static devotion7(pc: PlayerCharacter, params: LevelingParams) {
      pc.addFeatures(PaladinArchetype.getFeature("DEVOTION", "7", "AURA OF DEVOTION")) 
    }
  
    static devotion9(pc: PlayerCharacter, params: LevelingParams) {
      PaladinArchetype.addArchetypeSpells(pc, "DEVOTION", "9");
    }

    static devotion13(pc: PlayerCharacter, params: LevelingParams) {
      PaladinArchetype.addArchetypeSpells(pc, "DEVOTION", "13");
    }

    static devotion15(pc: PlayerCharacter, params: LevelingParams) {
      pc.addFeatures(PaladinArchetype.getFeature("DEVOTION", "15", "PURITY OF SPIRIT"))
    }

    static devotion19(pc: PlayerCharacter, params: LevelingParams) {
      PaladinArchetype.addArchetypeSpells(pc, "DEVOTION", "17");
    }
  
    static devotion20(pc: PlayerCharacter, params: LevelingParams) {
      pc.addFeatures(PaladinArchetype.getFeature("DEVOTION", "20", "HOLY NIMBUS"))
    }
  
    static ancients3(pc: PlayerCharacter, params: LevelingParams) {
      pc.addFeatures(
        PaladinArchetype.getFeature("ANCIENTS", "3", "NATURE'S WRATH"),
        PaladinArchetype.getFeature("ANCIENTS", "3", "TURN THE FAITHLESS")
      )

      PaladinArchetype.addArchetypeSpells(pc, "ANCIENTS", "3");

    }
    
    static ancients5(pc: PlayerCharacter, params: LevelingParams) {
      PaladinArchetype.addArchetypeSpells(pc, "ANCIENTS", "5");
    }

    static ancients7(pc: PlayerCharacter, params: LevelingParams) {
      pc.addFeatures(PaladinArchetype.getFeature("ANCIENTS", "7", "AURA OF WARDING"))
    }

    static ancients9(pc: PlayerCharacter, params: LevelingParams) {
      PaladinArchetype.addArchetypeSpells(pc, "ANCIENTS", "9");
    }
    
    static ancients13(pc: PlayerCharacter, params: LevelingParams) {
      PaladinArchetype.addArchetypeSpells(pc, "ANCIENTS", "13");
    }

    static ancients15(pc: PlayerCharacter, params: LevelingParams) {
      pc.addFeatures(PaladinArchetype.getFeature("ANCIENTS", "15", "UNDYING SENTINEL"))
    }
  
    static ancients17(pc: PlayerCharacter, params: LevelingParams) {
      PaladinArchetype.addArchetypeSpells(pc, "ANCIENTS", "17");
    }

    static ancients20(pc: PlayerCharacter, params: LevelingParams) {
      pc.addFeatures(PaladinArchetype.getFeature("ANCIENTS", "20", "ELDER CHAMPION"))
    }
  
    static vengeance3(pc: PlayerCharacter, params: LevelingParams) {
      pc.addFeatures(
        PaladinArchetype.getFeature("VENGEANCE", "3", "ABJURE ENEMY"),
        PaladinArchetype.getFeature("VENGEANCE", "3", "VOW OF ENMITY")
      )

      PaladinArchetype.addArchetypeSpells(pc, "VENGEANCE", "3");
    }

    static vengeance5(pc: PlayerCharacter, params: LevelingParams) {
      PaladinArchetype.addArchetypeSpells(pc, "VENGEANCE", "5");
    }
  
    static vengeance7(pc: PlayerCharacter, params: LevelingParams) {
      pc.addFeatures(PaladinArchetype.getFeature("VENGEANCE", "7", "RELENTLESS AVENGER"))
    }
  
    static vengeance9(pc: PlayerCharacter, params: LevelingParams) {
      PaladinArchetype.addArchetypeSpells(pc, "VENGEANCE", "9");
    }

    static vengeance13(pc: PlayerCharacter, params: LevelingParams) {
      PaladinArchetype.addArchetypeSpells(pc, "VENGEANCE", "13");
    }

    static vengeance15(pc: PlayerCharacter, params: LevelingParams) {
      pc.addFeatures(PaladinArchetype.getFeature("VENGEANCE", "15", "SOUL OF VENGEANCE"))
    }

    static vengeance17(pc: PlayerCharacter, params: LevelingParams) {
      PaladinArchetype.addArchetypeSpells(pc, "VENGEANCE", "17");
    }
  
    static vengeance20(pc: PlayerCharacter, params: LevelingParams) {
      pc.addFeatures(PaladinArchetype.getFeature("VENGEANCE", "20", "AVENGING ANGEL"))
    }
  }