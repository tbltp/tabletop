import { ScalingTrait } from "Base/Interfaces";
import { PlayerCharacter } from "Base/PlayerCharacter";
import { LevelingParams } from "Classes/PlayerClass";
import * as LandCircleDict from "./Land.json";


export class LandCircle {
    
      static getTerrainSpells(pc: PlayerCharacter, terrain: string, level: string) {
        pc.addSpells(LandCircle.landSpells[terrain][level], "wisdom");
      }
    
      static getFeature(level: string, featureName: string) {
        return LandCircleDict["features"][level][featureName];
    }
    
      static land2(pc: PlayerCharacter, params: LevelingParams) {
        pc.addSpells(params.spellSelection, "wisdom");
        pc.addFeatures(LandCircle.getFeature("2", "NATURAL RECOVERY"));
      }
    
      static land3(pc: PlayerCharacter, params: LevelingParams) {
        pc.addFeatures(LandCircle.getFeature("3", "CIRCLE SPELLS"));
        LandCircle.getTerrainSpells(pc, params.subclassSelection.options[0], "3");
      }

      static land4(pc, params: LevelingParams){
        const wildShapeScale: ScalingTrait = pc.findScalingTraitByName(
          "Wild Shape"
        );
        wildShapeScale.challengeRating = 0.5;
      }

      static land5(pc: PlayerCharacter, params: LevelingParams){
        LandCircle.getTerrainSpells(pc, params.subclassSelection.options[0], "5");
      }
    
      static land6(pc: PlayerCharacter, params: LevelingParams) {
        pc.addFeatures(LandCircle.getFeature("6", "LAND'S STRIDE"));
      }

      static land7(pc: PlayerCharacter, params: LevelingParams){
        LandCircle.getTerrainSpells(pc, params.subclassSelection.options[0], "7");
      }

      static land8(pc: PlayerCharacter, params: LevelingParams){
        const wildShapeScale: ScalingTrait = pc.findScalingTraitByName(
          "Wild Shape"
        );
        wildShapeScale.challengeRating = 1;
      }

      static land9(pc: PlayerCharacter, params: LevelingParams){
        LandCircle.getTerrainSpells(pc, params.subclassSelection.options[0], "5");
      }
    
      static land10(pc: PlayerCharacter, params: LevelingParams) {
        pc.addFeatures(LandCircle.getFeature("10", "NATURE'S WARD"));
      }
    
      static land14(pc: PlayerCharacter, params: LevelingParams) {
        pc.addFeatures(LandCircle.getFeature("2", "NATURE SANCTUARY"));
      }

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
}