import { PlayerCharacter } from "../../Base/PlayerCharacter";
import { LevelingParams, PlayerClass } from "../PlayerClass";
import { FighterLevelingParams } from "../Fighter";
import { ResourceTrait } from "../../Base/Interfaces";
import { SpellSlotFactory } from "../SpellSlotFactory";
import { Archetype } from "../Archetypes";

export class FighterArchetype extends Archetype {
    static archetypeHelper = {
      CHAMPION: {
        "3": FighterArchetype.champion3,
        "7": FighterArchetype.champion7,
        "10": FighterArchetype.champion10,
        "15": FighterArchetype.champion15,
        "18": FighterArchetype.champion18,
      },
      "BATTLE MASTER": {
        "3": FighterArchetype.battleMaster3,
        "7": FighterArchetype.battleMaster7,
        "10": FighterArchetype.battleMaster10,
        "15": FighterArchetype.battleMaster15,
        "18": FighterArchetype.battleMaster18,
      },
      "ELDRITCH KNIGHT": {
        "3": FighterArchetype.eldritchKnight3,
        "7": FighterArchetype.eldritchKnight7,
        "10": FighterArchetype.eldritchKnight10,
        "15": FighterArchetype.eldritchKnight15,
        "18": FighterArchetype.eldritchKnight18,
      },
    };
  
    static getFeature(archetypeName: string, level: string, featureName: string) {
      return Archetype.getFeature("FIGHTER", archetypeName, level, featureName);
    }
  
    static champion3(pc: PlayerCharacter, params: LevelingParams) {
      pc.addFeatures(FighterArchetype.getFeature("CHAMPION", "3", "IMPROVED CRITICAL"));
    }
  
    static champion7(pc: PlayerCharacter, params: LevelingParams) {
      pc.addFeatures(FighterArchetype.getFeature("CHAMPION", "7", "REMARKABLE ATHLETE"));
      // @Ez whatever you did for Jack of All Trades
    }
  
    static champion10(pc: PlayerCharacter, params: LevelingParams) {
      pc.addFeatures(FighterArchetype.getFeature("CHAMPION", "10", "ADDITIONAL FIGHTING STYLE"));
      PlayerClass.addFightingStyle(pc, params.fightingStyle[0]);  // move add fighting style to PC 
  
    }
  
    static champion15(pc: PlayerCharacter, params: LevelingParams) {
      pc.addFeatures(FighterArchetype.getFeature("CHAMPION", "15", "SUPERIOR CRITICAL"));
    }
  
    static champion18(pc: PlayerCharacter, params: LevelingParams) {
      pc.addFeatures(FighterArchetype.getFeature("CHAMPION", "18", "SURVIVOR"));
    }
  
    static battleMaster3(pc: PlayerCharacter, params: FighterLevelingParams) {
      // superiority dice
      const superiorityDice: ResourceTrait = {
        title: "Superiority Dice",
        description: "Number of superiority dice you can use for maneuvers",
        resourceMax: { value: 4 },
        dice: "d8"
      };
      // artisan tool proficiency
      pc.addFeatures(
        FighterArchetype.getFeature("BATTLE MASTER", "3", "COMBAT SUPERIORITY"),
        FighterArchetype.getFeature("BATTLE MASTER", "3", "STUDENT OF WAR")
      );
  
      // Insert tool proficiency, requires some modification to params.
      // Figure out how to add Maneuvers.
    }
  
    static battleMaster7(pc: PlayerCharacter, params: LevelingParams) {
      pc.addFeatures(FighterArchetype.getFeature("BATTLE MASTER", "7", "KNOW YOUR ENEMY"))
    }
  
    static battleMaster10(pc: PlayerCharacter, params: LevelingParams) {
      pc.addFeatures(FighterArchetype.getFeature("BATTLE MASTER", "7", "IMPROVED COMBAT SUPERIORITY"))
      pc.findResourceTraitByName("Superiority Dice").dice = "d10";
    }
  
    static battleMaster15(pc: PlayerCharacter, params: LevelingParams) {
      pc.addFeatures(FighterArchetype.getFeature("BATTLE MASTER", "7", "RELENTLESS"))
    }
  
    static battleMaster18(pc: PlayerCharacter, params: LevelingParams) {
      pc.findResourceTraitByName("Superiority Dice").dice = "d12";
    }
  
    static eldritchKnight3(pc: PlayerCharacter, params: LevelingParams) {
      pc.addSpells(params.spellSelection, "intelligence");
      SpellSlotFactory.applySpellSlotsAtLevel(pc, 3, "TERTIARY")
      pc.addFeatures(FighterArchetype.getFeature("ELDRITCH KNIGHT", "3", "WEAPON BOND"))
  
    }
  
    static eldritchKnight7(pc: PlayerCharacter, params: LevelingParams) {
      pc.addFeatures(FighterArchetype.getFeature("ELDRITCH KNIGHT", "7", "WAR MAGIC"))
    }
  
    static eldritchKnight10(pc: PlayerCharacter, params: LevelingParams) {
      pc.addFeatures(FighterArchetype.getFeature("ELDRITCH KNIGHT", "10", "ELDRITCH STRIKE"))
    }
  
    static eldritchKnight15(pc: PlayerCharacter, params: LevelingParams) {
      pc.addFeatures(FighterArchetype.getFeature("ELDRITCH KNIGHT", "15", "ARCANE CHARGE"))
    }
  
    static eldritchKnight18(pc: PlayerCharacter, params: LevelingParams) {
      pc.addFeatures(FighterArchetype.getFeature("ELDRITCH KNIGHT", "18", "IMPROVED WAR MAGIC"))
    }
  }