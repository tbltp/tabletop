import { PlayerCharacter } from "../../Base/PlayerCharacter";
import { LevelingParams } from "../PlayerClass";
import { Archetype } from "../Archetypes";

export class RangerArchetype extends Archetype {
    static archetypeHelper = {
      HUNTER: {
        "3": RangerArchetype.hunter3,
        "7": RangerArchetype.hunter7,
        "11": RangerArchetype.hunter11,
        "15": RangerArchetype.hunter15,
      },
      "BEAST MASTER": {
        "3": RangerArchetype.beastMaster3,
        "7": RangerArchetype.beastMaster7,
        "11": RangerArchetype.beastMaster11,
        "15": RangerArchetype.beastMaster15,
      },
    };
  
    static getFeature(archetypeName: string, level: string, featureName: string) {
      return Archetype.getFeature("RANGER", archetypeName, level, featureName);
    }

    static hunter3(pc: PlayerCharacter, params: LevelingParams) {
      pc.addFeatures(
        RangerArchetype.getFeature(
          "HUNTER",
          "3",
          params.archetypeSelection[0].options[0]
        )
      );
    }
  
    static hunter7(pc: PlayerCharacter, params: LevelingParams) {
      pc.addFeatures(
        RangerArchetype.getFeature(
          "HUNTER",
          "7",
          params.archetypeSelection[0].options[0]
        )
      );
    }
  
    static hunter11(pc: PlayerCharacter, params: LevelingParams) {
      pc.addFeatures(
        RangerArchetype.getFeature(
          "HUNTER",
          "11",
          params.archetypeSelection[0].options[0]
        )
      );
    }
  
    static hunter15(pc: PlayerCharacter, params: LevelingParams) {
      pc.addFeatures(
        RangerArchetype.getFeature(
          "HUNTER",
          "15",
          params.archetypeSelection[0].options[0]
        )
      );
    }
  
    static beastMaster3(pc: PlayerCharacter, params: LevelingParams) {
      pc.addFeatures(RangerArchetype.getFeature("HUNTER'S MARK", "3", "RANGER'S COMPANION"));
    }
  
    static beastMaster7(pc: PlayerCharacter, params: LevelingParams) {
      pc.addFeatures(RangerArchetype.getFeature("HUNTER'S MARK", "7", "EXCEPTIONAL TRAINING"));
    }
  
    static beastMaster11(pc: PlayerCharacter, params: LevelingParams) {
      pc.addFeatures(RangerArchetype.getFeature("HUNTER'S MARK", "11", "BESTIAL FURY"));
    }
  
    static beastMaster15(pc: PlayerCharacter, params: LevelingParams) {
      pc.addFeatures(RangerArchetype.getFeature("HUNTER'S MARK", "15", "SHARE SPELLS"));
    }
  }