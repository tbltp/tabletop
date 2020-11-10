import { PlayerCharacter } from "Base/PlayerCharacter";
import { LevelingParams } from "Classes/PlayerClass";
import * as HunterArchetypeDict from "./Hunter.json"


export class Hunter {
    static getFeature(level: string, featureName: string) {
        return HunterArchetypeDict["features"][level][featureName];
    }
    
    static hunter3(pc: PlayerCharacter, params: LevelingParams) {
        pc.addFeatures(
            Hunter.getFeature(
            "3",
            params.archetypeSelection[0].options[0]
          )
        );
      }
    
      static hunter7(pc: PlayerCharacter, params: LevelingParams) {
        pc.addFeatures(
            Hunter.getFeature(
            "7",
            params.archetypeSelection[0].options[0]
          )
        );
      }
    
      static hunter11(pc: PlayerCharacter, params: LevelingParams) {
        pc.addFeatures(
            Hunter.getFeature(
            "11",
            params.archetypeSelection[0].options[0]
          )
        );
      }
    
      static hunter15(pc: PlayerCharacter, params: LevelingParams) {
        pc.addFeatures(
            Hunter.getFeature(
            "15",
            params.archetypeSelection[0].options[0]
          )
        );
      }
}