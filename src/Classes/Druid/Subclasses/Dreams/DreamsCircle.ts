import { PlayerCharacter } from "../../../../Base/PlayerCharacter";
import { ResourceTrait, ScalingTrait } from "../../../../Base/Interfaces";
import { LevelingParams } from "../../../PlayerClass";
import * as DreamsCircleDict from "./Dreams.json";


export class DreamsCircle 
{        
    static getFeature(level: string, featureName: string) {
        return DreamsCircleDict["features"][level][featureName];
    }

    static upBalm(pc: PlayerCharacter) {
        const balmDice: ResourceTrait = pc.pcHelper.findResourceTraitByName("Balm of the Summer Court");
        balmDice.resourceMax.value+=1;
    }

    static dreams2(pc: PlayerCharacter, params: LevelingParams) {
        pc.pcHelper.addFeatures(DreamsCircle.getFeature("2", "BALM OF THE SUMMER COURT"));
        const balmDice: ResourceTrait = {
            title: "Balm of the Summer Court",
            description: "Number of times you may use Balm of the Summer Court",
            dice: "1d6",
            resourceMax: { value: 2 }
        }
        pc.pcHelper.addResourceTraits(balmDice);
        const wildShapeScale: ScalingTrait = pc.pcHelper.findScalingTraitByName("Wild Shape");
        wildShapeScale.challengeRating = 0.25;
    }
      
    static dreams4(pc: PlayerCharacter, params: LevelingParams){
        const wildShapeScale: ScalingTrait = pc.pcHelper.findScalingTraitByName("Wild Shape");
        wildShapeScale.challengeRating = 0.5;
        DreamsCircle.upBalm(pc);
    }

    static dreams6(pc: PlayerCharacter, params: LevelingParams) {
        pc.pcHelper.addFeatures(DreamsCircle.getFeature("6", "HEARTH OF MOONLIGHT AND SHADOW"));
        DreamsCircle.upBalm(pc);
    }
    
    static dreams8(pc: PlayerCharacter, params: LevelingParams){
        const wildShapeScale: ScalingTrait = pc.pcHelper.findScalingTraitByName("Wild Shape");
        wildShapeScale.challengeRating = 1;
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