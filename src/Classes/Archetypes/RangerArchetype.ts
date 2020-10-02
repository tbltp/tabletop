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
  
    static hunter3(pc: PlayerCharacter, params: LevelingParams) {}
  
    static hunter7(pc: PlayerCharacter, params: LevelingParams) {}
  
    static hunter11(pc: PlayerCharacter, params: LevelingParams) {}
  
    static hunter15(pc: PlayerCharacter, params: LevelingParams) {}
  
    static beastMaster3(pc: PlayerCharacter, params: LevelingParams) {}
  
    static beastMaster7(pc: PlayerCharacter, params: LevelingParams) {}
  
    static beastMaster11(pc: PlayerCharacter, params: LevelingParams) {}
  
    static beastMaster15(pc: PlayerCharacter, params: LevelingParams) {}
  }