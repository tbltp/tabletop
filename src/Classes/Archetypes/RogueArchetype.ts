import { PlayerCharacter } from "../../Base/PlayerCharacter";
import { LevelingParams } from "../PlayerClass";
import { Archetype } from "../Archetypes";

export class RogueArchetype extends Archetype {
    static archetypeHelper = {
      THIEF: {
        "3": RogueArchetype.thief3,
        "9": RogueArchetype.thief9,
        "13": RogueArchetype.thief13,
        "17": RogueArchetype.thief17,
      },
      ASSASSIN: {
        "3": RogueArchetype.assassin3,
        "9": RogueArchetype.assassin9,
        "13": RogueArchetype.assassin13,
        "17": RogueArchetype.assassin17,
      },
      "ARCANE TRICKSTER": {
        "3": RogueArchetype.arcaneTrickster3,
        "9": RogueArchetype.arcaneTrickster9,
        "13": RogueArchetype.arcaneTrickster13,
        "17": RogueArchetype.arcaneTrickster17,
      },
    };
  
    static thief3(pc: PlayerCharacter, params: LevelingParams) {}
  
    static thief9(pc: PlayerCharacter, params: LevelingParams) {}
  
    static thief13(pc: PlayerCharacter, params: LevelingParams) {}
  
    static thief17(pc: PlayerCharacter, params: LevelingParams) {}
  
    static assassin3(pc: PlayerCharacter, params: LevelingParams) {}
  
    static assassin9(pc: PlayerCharacter, params: LevelingParams) {}
  
    static assassin13(pc: PlayerCharacter, params: LevelingParams) {}
  
    static assassin17(pc: PlayerCharacter, params: LevelingParams) {}
  
    static arcaneTrickster3(pc: PlayerCharacter, params: LevelingParams) {}
  
    static arcaneTrickster9(pc: PlayerCharacter, params: LevelingParams) {}
  
    static arcaneTrickster13(pc: PlayerCharacter, params: LevelingParams) {}
  
    static arcaneTrickster17(pc: PlayerCharacter, params: LevelingParams) {}
  }