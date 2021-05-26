import { PlayerCharacter } from "../../../../Base/PlayerCharacter";
import { ResourceTrait, ScalingTrait } from "../../../../Base/Interfaces";
import { LevelingParams, PlayerClass } from "../../../PlayerClass";
import * as DreamsCircleDict from "./Dreams.json";


export class DreamsCircle 
{        
    static getFeature(level: string, featureName: string) {
        return DreamsCircleDict["features"][level][featureName];
    }

    static upBalm(pc: PlayerCharacter) {
        pc.pcHelper.findFeatureTraitByName("Balm of the Summer Court").resource.resourceMax.value++;
    }

    static dreams2(pc: PlayerCharacter, params: LevelingParams) {
        pc.pcHelper.addFeatures(DreamsCircle.getFeature("2", "BALM OF THE SUMMER COURT"));
        const balmOfTheSummerCourt = {resource: {resourceMax: {value: 2}}, scaling: {dice: "1d6"}}
        pc.pcHelper.addEffectsToClassFeature("Balm of the Summer Court", balmOfTheSummerCourt)
        pc.pcHelper.findFeatureTraitByName("Wild Shape").scaling.challengeRating = 0.25;
    }
      
    static dreams4(pc: PlayerCharacter, params: LevelingParams){
        pc.pcHelper.findFeatureTraitByName("Wild Shape").scaling.challengeRating = 0.5;
        DreamsCircle.upBalm(pc);
    }

    static dreams6(pc: PlayerCharacter, params: LevelingParams) {
        pc.pcHelper.addFeatures(DreamsCircle.getFeature("6", "HEARTH OF MOONLIGHT AND SHADOW"));
        DreamsCircle.upBalm(pc);
    }
    
    static dreams8(pc: PlayerCharacter, params: LevelingParams){
        pc.pcHelper.findFeatureTraitByName("Wild Shape").scaling.challengeRating = 1;
        DreamsCircle.upBalm(pc);
    }

    static dreams10(pc: PlayerCharacter, params: LevelingParams) {
        pc.pcHelper.addFeatures(DreamsCircle.getFeature("10", "HIDDEN PATHS"));
        DreamsCircle.upBalm(pc);

    }
    static dreams14(pc: PlayerCharacter, params: LevelingParams) {
        pc.pcHelper.addFeatures(DreamsCircle.getFeature("14", "WALKER IN DREAMS"));
        DreamsCircle.upBalm(pc);
    }
}