import { PlayerCharacter } from "../../Base/PlayerCharacter";
import { LevelingParams } from "../PlayerClass";
import { Archetype } from "../Archetypes";

export class BarbarianArchetype extends Archetype {
    static archetypeHelper = {
      BERSERKER: {
        "3": BarbarianArchetype.berserker3,
        "6": BarbarianArchetype.berserker6,
        "10": BarbarianArchetype.berserker10,
        "14": BarbarianArchetype.berserker14,
      },
      "TOTEM WARRIOR": {
        "3": BarbarianArchetype.totemWarrior3,
        "6": BarbarianArchetype.totemWarrior6,
        "10": BarbarianArchetype.totemWarrior10,
        "14": BarbarianArchetype.totemWarrior14,
      },
    };
  
    static getFeature(archetypeName: string, level: string, featureName: string) {
      return Archetype.getFeature("BARBARIAN", archetypeName, level, featureName);
    }
  
    static berserker3(pc: PlayerCharacter, params: LevelingParams) {
      pc.addFeatures(BarbarianArchetype.getFeature("BERSERKER", "3", "FRENZY"));
    }
  
    static berserker6(pc: PlayerCharacter, params: LevelingParams) {
      pc.addFeatures(
        BarbarianArchetype.getFeature("BERSERKER", "6", "MINDLESS RAGE")
      );
    }
  
    static berserker10(pc: PlayerCharacter, params: LevelingParams) {
      pc.addFeatures(
        BarbarianArchetype.getFeature("BERSERKER", "10", "INTIMIDATING PRESENCE")
      );
    }
  
    static berserker14(pc: PlayerCharacter, params: LevelingParams) {
      pc.addFeatures(
        BarbarianArchetype.getFeature("BERSERKER", "14", "RETALIATION")
      );
    }
  
    static totemWarrior3(pc: PlayerCharacter, params: LevelingParams) {
      pc.addSpells(["BEAST SENSE", "SPEAK WITH ANIMALS"], "None");
      pc.addFeatures(
        BarbarianArchetype.getFeature("TOTEM WARRIOR", "3", "SPIRIT SEEKER"),
        BarbarianArchetype.getFeature(
          "TOTEM WARRIOR",
          "3",
          params.archetypeSelection[0].options[0]
        )
      );
    }
  
    static totemWarrior6(pc: PlayerCharacter, params: LevelingParams) {
      pc.addFeatures(
        BarbarianArchetype.getFeature(
          "TOTEM WARRIOR",
          "6",
          params.archetypeSelection[0].options[0]
        )
      );
    }
  
    static totemWarrior10(pc: PlayerCharacter, params: LevelingParams) {
      pc.addSpells(["COMMUNE WITH NATURE"], "None");
      pc.addFeatures(
        BarbarianArchetype.getFeature("TOTEM WARRIOR", "10", "SPIRIT WALKER")
      );
    }
  
    static totemWarrior14(pc: PlayerCharacter, params: LevelingParams) {
      pc.addFeatures(
        BarbarianArchetype.getFeature(
          "TOTEM WARRIOR",
          "14",
          params.archetypeSelection[0].options[0]
        )
      );
    }
  }