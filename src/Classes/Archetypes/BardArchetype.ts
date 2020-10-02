import { PlayerCharacter } from "../../Base/PlayerCharacter";
import { LevelingParams } from "../PlayerClass";
import { Trait } from "../../Base/Interfaces";
import { Archetype } from "../Archetypes";

export class BardArchetype extends Archetype {
    static archetypeHelper = {
      LORE: {
        "3": BardArchetype.lore3,
        "6": BardArchetype.lore6,
        "14": BardArchetype.lore14,
      },
      VALOR: {
        "3": BardArchetype.valor3,
        "6": BardArchetype.valor6,
        "14": BardArchetype.valor14,
      },
    };
  
    static getFeature(archetypeName: string, level: string, featureName: string) {
      return Archetype.getFeature("BARD", archetypeName, level, featureName);
    }
  
    static lore3(pc: PlayerCharacter, params: LevelingParams) {
      pc.addFeatures(BardArchetype.getFeature("LORE", "3", "CUTTING WORDS"));
    }
  
    static lore6(pc: PlayerCharacter, params: LevelingParams) {
      const lore6Trait: Trait = {
        ...BardArchetype.getFeature("LORE", "6", "ADDITIONAL MAGICAL SECRETS"),
        choices: params.archetypeSelection[0].options,
      };
      pc.addSpells(params.archetypeSelection[0].options, "charisma");
      pc.addFeatures(lore6Trait);
    }
  
    static lore14(pc: PlayerCharacter, params: LevelingParams) {
      pc.addFeatures(BardArchetype.getFeature("LORE", "14", "PEERLESS SKILL"));
    }
  
    static valor3(pc: PlayerCharacter, params: LevelingParams) {
      pc.addFeatures(
        BardArchetype.getFeature("VALOR", "3", "COMBAT INSPIRATION")
      );
    }
  
    static valor6(pc: PlayerCharacter, params: LevelingParams) {
      pc.addFeatures(BardArchetype.getFeature("VALOR", "6", "EXTRA ATTACK"));
    }
  
    static valor14(pc: PlayerCharacter, params: LevelingParams) {
      pc.addFeatures(BardArchetype.getFeature("VALOR", "14", "BATTLE MAGIC"));
    }
  }