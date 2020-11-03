import { PlayerCharacter } from "../../Base/PlayerCharacter";
import { LevelingParams } from "../PlayerClass";
import { Archetype } from "../Archetypes";

export class DruidArchetype extends Archetype {
    static archetypeHelper = {
      LAND: {
        "2": DruidArchetype.land2,
        "3": DruidArchetype.land3,
        "6": DruidArchetype.land6,
        "10": DruidArchetype.land10,
        "14": DruidArchetype.land14,
      },
      MOON: {
        "2": DruidArchetype.moon2,
        "6": DruidArchetype.moon6,
        "10": DruidArchetype.moon10,
        "14": DruidArchetype.moon14,
      },
    };
  
    static landSpells = {
      ARCTIC: {
        "3": ["HOLD PERSON", "SPIKE GROWTH"],
        "5": ["SLEET STORM", "SLOW"],
        "7": ["FREEDOM OF MOVEMENT", "ICE STORM"],
        "9": ["COMMUNE WITH NATURE", "CONE OF COLD"],
      },
      COAST: {
        "3": ["MIRROR IMAGE", "MISTY STEP"],
        "5": ["WATER BREATHING", "WATER WALK"],
        "7": ["CONTROL WATER", "FREEDOM OF MOVEMENT"],
        "9": ["CONJURE ELEMENTAL", "SCRYING"],
      },
      DESERT: {
        "3": ["BLUR", "SILENCE"],
        "5": ["CREATE FOOD AND WATER", "PROTECTION FROM ENERGY"],
        "7": ["BLIGHT", "HALLUCINATORY TERRAIN"],
        "9": ["INSECT PLAGUE", "WALL OF STONE"],
      },
      FOREST: {
        "3": ["BARKSKIN", "SPIDER CLIMB"],
        "5": ["CALL LIGHTNING", "PLANT GROWTH"],
        "7": ["DIVINATION", "FREEDOM OF MOVEMENT"],
        "9": ["COMMUNE WITH NATURE", "TREE STRIDE"],
      },
      GRASSLAND: {
        "3": ["INVISIBILITY", "PASS WITHOUT TRACE"],
        "5": ["DAYLIGHT", "HASTE"],
        "7": ["DIVINATION", "FREEDOM OF MOVEMENT"],
        "9": ["DREAM", "INSECT PLAGUE"],
      },
      MOUNTAIN: {
        "3": ["SPIDER CLIMB", "SPIKE GROWTH"],
        "5": ["LIGHTNING BOLT", "MELD INTO STONE"],
        "7": ["STONE SHAPE", "STONESKIN"],
        "9": ["PASSWALL", "WALL OF STONE"],
      },
      SWAMP: {
        "3": ["DARKNESS", "MELF'S ACID ARROW"],
        "5": ["WATER WALK", "STINKING CLOUD"],
        "7": ["FREEDOM OF MOVEMENT", "LOCATE CREATURE"],
        "9": ["INSECT PLAGUE", "SCRYING"],
      },
      UNDERDARK: {
        "3": ["SPIDER CLIMB", "WEB"],
        "5": ["GASEOUS FORM", "STINKING CLOUD"],
        "7": ["GREATER INVISIBILITY", "STONE SHAPE"],
        "9": ["CLOUDKILL", "INSECT PLAGUE"],
      },
    };
  
    static getTerrainSpells(pc: PlayerCharacter, terrain: string, level: string) {
      pc.addSpells(DruidArchetype.landSpells[terrain][level], "wisdom");
    }
  
    static getFeature(archetypeName: string, level: string, featureName: string) {
      return Archetype.getFeature("DRUID", archetypeName, level, featureName);
    }
  
    static land2(pc: PlayerCharacter, params: LevelingParams) {
      pc.addSpells(params.spellSelection, "wisdom");
      pc.addFeatures(DruidArchetype.getFeature("LAND", "2", "NATURAL RECOVERY"));
    }
  
    static land3(pc: PlayerCharacter, params: LevelingParams) {
      pc.addFeatures(DruidArchetype.getFeature("LAND", "3", "CIRCLE SPELLS"));
    }
  
    static land6(pc: PlayerCharacter, params: LevelingParams) {
      pc.addFeatures(DruidArchetype.getFeature("LAND", "6", "LAND'S STRIDE"));
    }
  
    static land10(pc: PlayerCharacter, params: LevelingParams) {
      pc.addFeatures(DruidArchetype.getFeature("LAND", "10", "NATURE'S WARD"));
    }
  
    static land14(pc: PlayerCharacter, params: LevelingParams) {
      pc.addFeatures(DruidArchetype.getFeature("LAND", "2", "NATURE SANCTUARY"));
    }
  
    static moon2(pc: PlayerCharacter, params: LevelingParams) {
      pc.addFeatures(DruidArchetype.getFeature("MOON", "2", "COMBAT WILD SHAPE"));
      pc.addFeatures(DruidArchetype.getFeature("MOON", "2", "CIRCLE FORMS"));
      pc.findScalingTraitByName("Wild Shape").challengeRating = 1;
    }
  
    static moon6(pc: PlayerCharacter, params: LevelingParams) {
      pc.addFeatures(DruidArchetype.getFeature("MOON", "6", "PRIMAL STRIKE"));
      // NEED TO BOX CHALLENGE RATING FOR WILD SHAPE - IT'S MATH.FLOOR(druidLevel / 3).
    }
  
    static moon10(pc: PlayerCharacter, params: LevelingParams) {
      pc.addFeatures(
        DruidArchetype.getFeature("MOON", "10", "ELEMENTAL WILD SHAPE")
      );
    }
  
    static moon14(pc: PlayerCharacter, params: LevelingParams) {
      pc.addFeatures(DruidArchetype.getFeature("MOON", "14", "THOUSAND FORMS"));
    }
  }