import { PlayerCharacter } from "../../Base/PlayerCharacter";
import { LevelingParams } from "../PlayerClass";
import { Archetype } from "../Archetypes";

export class MonkArchetype extends Archetype {
    static archetypeHelper = {
      "OPEN HAND": {
        "3": MonkArchetype.openHand3,
        "6": MonkArchetype.openHand6,
        "11": MonkArchetype.openHand11,
        "17": MonkArchetype.openHand17,
      },
      SHADOW: {
        "3": MonkArchetype.shadow3,
        "6": MonkArchetype.shadow6,
        "11": MonkArchetype.shadow11,
        "17": MonkArchetype.shadow17,
      },
      "FOUR ELEMENTS": {
        "3": MonkArchetype.fourElements3,
        "6": MonkArchetype.fourElements6,
        "11": MonkArchetype.fourElements11,
        "17": MonkArchetype.fourElements17,
      },
    };
  
    static getFeature(archetypeName: string, level: string, featureName: string) {
      return Archetype.getFeature("MONK", archetypeName, level, featureName);
    }
  
    static openHand3(pc: PlayerCharacter, params: LevelingParams) {
      pc.addFeatures(MonkArchetype.getFeature("OPEN HAND", "3", "OPEN HAND TECHNIQUE"))
    }
  
    static openHand6(pc: PlayerCharacter, params: LevelingParams) {
      pc.addFeatures(MonkArchetype.getFeature("OPEN HAND", "6", "WHOLENESS OF BODY"))
    }
  
    static openHand11(pc: PlayerCharacter, params: LevelingParams) {
      pc.addFeatures(MonkArchetype.getFeature("OPEN HAND", "11", "TRANQUILITY"))
      pc.addSpells(["SANCTUARY"], "wisdom");
    }
  
    static openHand17(pc: PlayerCharacter, params: LevelingParams) {
      pc.addFeatures(MonkArchetype.getFeature("OPEN HAND", "17", "QUIVERING PALM"))
    }
  
    static shadow3(pc: PlayerCharacter, params: LevelingParams) {
      pc.addFeatures(MonkArchetype.getFeature("SHADOW", "3", "SHADOW ARTS"))
      pc.addSpells(["DARKNESS", "DARKVISION", "PASS WITHOUT TRACE", "SILENCE", "MINOR ILLUSION"], "wisdom")
    }
  
    static shadow6(pc: PlayerCharacter, params: LevelingParams) {
      pc.addFeatures(MonkArchetype.getFeature("SHADOW", "6", "SHADOW STEP"))
    }
  
    static shadow11(pc: PlayerCharacter, params: LevelingParams) {
      pc.addFeatures(MonkArchetype.getFeature("SHADOW", "11", "CLOAK OF SHADOWS"))
    }
  
    static shadow17(pc: PlayerCharacter, params: LevelingParams) {
      pc.addFeatures(MonkArchetype.getFeature("SHADOW", "17", "OPPORTUNIST"))
    }
  
    static fourElements3(pc: PlayerCharacter, params: LevelingParams) {}
  
    static fourElements6(pc: PlayerCharacter, params: LevelingParams) {}
  
    static fourElements11(pc: PlayerCharacter, params: LevelingParams) {}
  
    static fourElements17(pc: PlayerCharacter, params: LevelingParams) {}
  }