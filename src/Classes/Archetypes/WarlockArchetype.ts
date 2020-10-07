import { PlayerCharacter } from "../../Base/PlayerCharacter";
import { LevelingParams } from "../PlayerClass";
import { Archetype } from "../Archetypes";

export class WarlockArchetype extends Archetype {
    static archetypeHelper = {
      ARCHFEY: {
        "1": WarlockArchetype.archfey1,
        "6": WarlockArchetype.archfey6,
        "10": WarlockArchetype.archfey10,
        "14": WarlockArchetype.archfey14,
      },
      FIEND: {
        "1": WarlockArchetype.fiend1,
        "6": WarlockArchetype.fiend6,
        "10": WarlockArchetype.fiend10,
        "14": WarlockArchetype.fiend14,
      },
      "GREAT OLD ONE": {
        "1": WarlockArchetype.greatOldOne1,
        "6": WarlockArchetype.greatOldOne6,
        "10": WarlockArchetype.greatOldOne10,
        "14": WarlockArchetype.greatOldOne14,
      },
    };

    static getFeature(archetypeName: string, level: string, featureName: string) {
      return Archetype.getFeature("WARLOCK", archetypeName, level, featureName);
    }
  
    static archfey1(pc: PlayerCharacter, params: LevelingParams) {}
  
    static archfey6(pc: PlayerCharacter, params: LevelingParams) {}
  
    static archfey10(pc: PlayerCharacter, params: LevelingParams) {}
  
    static archfey14(pc: PlayerCharacter, params: LevelingParams) {}
  
    static fiend1(pc: PlayerCharacter, params: LevelingParams) {}
  
    static fiend6(pc: PlayerCharacter, params: LevelingParams) {}
  
    static fiend10(pc: PlayerCharacter, params: LevelingParams) {}
  
    static fiend14(pc: PlayerCharacter, params: LevelingParams) {}
  
    static greatOldOne1(pc: PlayerCharacter, params: LevelingParams) {
      
    }
  
    static greatOldOne6(pc: PlayerCharacter, params: LevelingParams) {

    }
  
    static greatOldOne10(pc: PlayerCharacter, params: LevelingParams) {}
  
    static greatOldOne14(pc: PlayerCharacter, params: LevelingParams) {}
  }