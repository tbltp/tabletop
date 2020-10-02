import { PlayerCharacter } from "../../Base/PlayerCharacter";
import { LevelingParams } from "../PlayerClass";
import { Archetype } from "../Archetypes";

export class SorcererArchetype extends Archetype {
    static archetypeHelper = {
      "DRACONIC ANCESTRY": {
        "1": SorcererArchetype.draconicAncestry1,
        "6": SorcererArchetype.draconicAncestry6,
        "14": SorcererArchetype.draconicAncestry14,
        "18": SorcererArchetype.draconicAncestry18,
      },
      "WILD MAGIC": {
        "1": SorcererArchetype.wildMagic1,
        "6": SorcererArchetype.wildMagic6,
        "14": SorcererArchetype.wildMagic14,
        "18": SorcererArchetype.wildMagic18,
      },
    };

    /** TO DO
     * Draconic Resilience: HpMax++ every level, add armor class
     * Dragon Ancestor: Figure out how to reflect choice, and damage in one line.
     */

    static getFeature(archetypeName: string, level: string, featureName: string) {
      return Archetype.getFeature("SORCERER", archetypeName, level, featureName);
    }
  
    static draconicAncestry1(pc: PlayerCharacter, params: LevelingParams) {

    }
  
    static draconicAncestry6(pc: PlayerCharacter, params: LevelingParams) {
      pc.addFeatures(SorcererArchetype.getFeature("DRACONIC ANCESTRY", "6", "ELEMENTAL AFFINITY"))
    }
  
    static draconicAncestry14(pc: PlayerCharacter, params: LevelingParams) {
      pc.addFeatures(SorcererArchetype.getFeature("DRACONIC ANCESTRY", "14", "DRAGON WINGS"))
    }
  
    static draconicAncestry18(pc: PlayerCharacter, params: LevelingParams) {
      pc.addFeatures(SorcererArchetype.getFeature("DRACONIC ANCESTRY", "18", "DRACONIC PRESENCE"))
    }
  
    static wildMagic1(pc: PlayerCharacter, params: LevelingParams) {
      pc.addFeatures(SorcererArchetype.getFeature("WILD MAGIC", "1", "WILD MAGIC SURGE"), SorcererArchetype.getFeature("WILD MAGIC", "3", "TIDES OF CHAOS"))
    }
  
    static wildMagic6(pc: PlayerCharacter, params: LevelingParams) {      
      pc.addFeatures(SorcererArchetype.getFeature("WILD MAGIC", "6", "BEND LUCK"))
    }
  
    static wildMagic14(pc: PlayerCharacter, params: LevelingParams) {
      pc.addFeatures(SorcererArchetype.getFeature("WILD MAGIC", "14", "CONTROLLED CHAOS"))
    }
  
    static wildMagic18(pc: PlayerCharacter, params: LevelingParams) {
      pc.addFeatures(SorcererArchetype.getFeature("WILD MAGIC", "3", "SPELL BOMBARDMENT"))
    }
}
  