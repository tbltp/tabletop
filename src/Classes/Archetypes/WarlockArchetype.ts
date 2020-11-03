import { PlayerCharacter } from "../../Base/PlayerCharacter";
import { LevelingParams } from "../PlayerClass";
import { Archetype } from "../Archetypes";

export class WarlockArchetype extends Archetype {
    static archetypeHelper = {
      ARCHFEY: {
        "1": WarlockArchetype.archfey1,
        "6": WarlockArchetype.archfey6,
        "10": WarlockArchetype.archfey10,
        "14": WarlockArchetype.archfey14,
      },
      FIEND: {
        "1": WarlockArchetype.fiend1,
        "6": WarlockArchetype.fiend6,
        "10": WarlockArchetype.fiend10,
        "14": WarlockArchetype.fiend14,
      },
      "GREAT OLD ONE": {
        "1": WarlockArchetype.greatOldOne1,
        "6": WarlockArchetype.greatOldOne6,
        "10": WarlockArchetype.greatOldOne10,
        "14": WarlockArchetype.greatOldOne14,
      },
    };

    static patronSpells = {
      ARCHFEY: {
        "1": ["FAERIE FIRE", "SLEEP"],
        "2": ["CALM EMOTIONS", "PHANTASMAL FORCE"],
        "3": ["BLINK", "PLANT GROWTH"],
        "4": ["DOMINATE BEAST", "GREATER INVISIBILITY"],
        "5": ["DOMINATE PERSON", "SEEMING"]
      },
      FIEND: {
        "1": ["BURNING HANDS", "COMMAND"],
        "2": ["BLINDNESS/DEAFNESS", "SCORCHING RAY"],
        "3": ["FIREBALL", "STINKING CLOUD"],
        "4": ["FIRE SHIELD", "WALL OF FIRE"],
        "5": ["FLAME STRIKE", "HALLOW"]
      },
      "GREAT OLD ONE": {
        "1": ["DISSONANT WHISPERS", "TASHA'S HIDEOUS LAUGHTER"],
        "2": ["DETECT THOUGHTS", "PHANTASMAL FORCE"],
        "3": ["CLAIRVOYANCE", "SENDING"],
        "4": ["DOMINATE BEAST", "EVARD'S BLACK TENTACLES"],
        "5": ["DOMINATE PERSON", "TELEKINESIS"]
      }
    }

    static getFeature(archetypeName: string, level: string, featureName: string) {
      return Archetype.getFeature("WARLOCK", archetypeName, level, featureName);
    }

    static getPatronSpells(pc: PlayerCharacter, patron: string, level: string) {
      pc.addSpells(WarlockArchetype.patronSpells[patron][level], "charisma");
    }
  
    static archfey1(pc: PlayerCharacter, params: LevelingParams) {
      pc.addFeatures(WarlockArchetype.getFeature("ARCHFEY", "1", "FEY PRESENCE"));
    }

    static archfey6(pc: PlayerCharacter, params: LevelingParams) {
      pc.addFeatures(WarlockArchetype.getFeature("ARCHFEY", "6", "MISTY ESCAPE"));
    }
  
    static archfey10(pc: PlayerCharacter, params: LevelingParams) {
      pc.addFeatures(WarlockArchetype.getFeature("ARCHFEY", "10", "BEGUILING DEFENSES"));
    }
  
    static archfey14(pc: PlayerCharacter, params: LevelingParams) {
      pc.addFeatures(WarlockArchetype.getFeature("ARCHFEY", "14", "DARK DELIRIUM"));
    }
  
    static fiend1(pc: PlayerCharacter, params: LevelingParams) {
      pc.addFeatures(WarlockArchetype.getFeature("FIEND", "1", "DARK ONE'S BLESSING"));
    }

    static fiend6(pc: PlayerCharacter, params: LevelingParams) {
      pc.addFeatures(WarlockArchetype.getFeature("FIEND", "6", "DARK ONE'S OWN LUCK"));
    }
  
    static fiend10(pc: PlayerCharacter, params: LevelingParams) {
      pc.addFeatures(WarlockArchetype.getFeature("FIEND", "10", "FIENDISH RESILIENCE"));
    }
  
    static fiend14(pc: PlayerCharacter, params: LevelingParams) {
      pc.addFeatures(WarlockArchetype.getFeature("FIEND", "14", "HURL THROUGH HELL"));
    }
  
    static greatOldOne1(pc: PlayerCharacter, params: LevelingParams) {
      pc.addFeatures(WarlockArchetype.getFeature("THE GREAT OLD ONE", "1", "AWAKENED MIND"));
    }
  
    static greatOldOne6(pc: PlayerCharacter, params: LevelingParams) {
      pc.addFeatures(WarlockArchetype.getFeature("THE GREAT OLD ONE", "6", "ENTROPIC WARD"));
    }
  
    static greatOldOne10(pc: PlayerCharacter, params: LevelingParams) {
      pc.addFeatures(WarlockArchetype.getFeature("THE GREAT OLD ONE", "10", "THOUGHT SHIELD"));
    }
  
    static greatOldOne14(pc: PlayerCharacter, params: LevelingParams) {
      pc.addFeatures(WarlockArchetype.getFeature("THE GREAT OLD ONE", "14", "CREATE THRALL"));
    }
  }