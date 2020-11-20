import { PlayerCharacter } from "Base/PlayerCharacter";
import { LevelingParams } from "Classes/PlayerClass";
import * as MoonCircleDict from "./Moon.json";


export class MoonCircle {
    
      static getFeature(level: string, featureName: string) {
        return MoonCircleDict["features"][level][featureName];
    }

    static moon2(pc: PlayerCharacter, params: LevelingParams) {
        pc.pcHelper.addFeatures(MoonCircle.getFeature("2", "COMBAT WILD SHAPE"));
        pc.pcHelper.addFeatures(MoonCircle.getFeature("2", "CIRCLE FORMS"));
        pc.pcHelper.findScalingTraitByName("Wild Shape").challengeRating = 1;
      }
    
      static moon6(pc: PlayerCharacter, params: LevelingParams) {
        pc.pcHelper.addFeatures(MoonCircle.getFeature("6", "PRIMAL STRIKE"));
        // NEED TO BOX CHALLENGE RATING FOR WILD SHAPE - IT'S MATH.FLOOR(druidLevel / 3).
      }
    
      static moon10(pc: PlayerCharacter, params: LevelingParams) {
        pc.pcHelper.addFeatures(
            MoonCircle.getFeature("10", "ELEMENTAL WILD SHAPE")
        );
      }
    
      static moon14(pc: PlayerCharacter, params: LevelingParams) {
        pc.pcHelper.addFeatures(MoonCircle.getFeature("14", "THOUSAND FORMS"));
      }
    
}