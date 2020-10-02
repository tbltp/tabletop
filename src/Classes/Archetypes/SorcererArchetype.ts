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
  
    static draconicAncestry1(pc: PlayerCharacter, params: LevelingParams) {}
  
    static draconicAncestry6(pc: PlayerCharacter, params: LevelingParams) {}
  
    static draconicAncestry14(pc: PlayerCharacter, params: LevelingParams) {}
  
    static draconicAncestry18(pc: PlayerCharacter, params: LevelingParams) {}
  
    static wildMagic1(pc: PlayerCharacter, params: LevelingParams) {}
  
    static wildMagic6(pc: PlayerCharacter, params: LevelingParams) {}
  
    static wildMagic14(pc: PlayerCharacter, params: LevelingParams) {}
  
    static wildMagic18(pc: PlayerCharacter, params: LevelingParams) {}
}
  