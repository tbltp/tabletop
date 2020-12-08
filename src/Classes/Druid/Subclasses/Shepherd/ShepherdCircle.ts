import { PlayerCharacter } from "../../../../Base/PlayerCharacter";
import { ResourceTrait, ScalingTrait } from "../../../../Base/Interfaces";
import { LevelingParams } from "../../../PlayerClass";
import * as ShepherdCircleDict from "./Shepherd.json";


export class ShepherdCircle 
{        
    static getFeature(level: string, featureName: string) {
        return ShepherdCircleDict["features"][level][featureName];
    }

    static upGuardian(pc: PlayerCharacter) {
        const guardianSpirit: ScalingTrait = pc.pcHelper.findScalingTraitByName("Guardian Spirit");
        guardianSpirit.bonus+=1;
        ShepherdCircle.upSpirit(pc);
    }

    static upSpirit(pc: PlayerCharacter) {
        const spirit: ScalingTrait = pc.pcHelper.findScalingTraitByName("Spirit Totem");
        spirit.bonus+=1;
    }

    static shepherd2(pc: PlayerCharacter, params: LevelingParams) {
        pc.pcHelper.addFeatures(ShepherdCircle.getFeature("2", "SPEECH OF THE WOODS"));
        pc.pcHelper.addFeatures(ShepherdCircle.getFeature("2", "SPIRIT TOTEM"));
        const spirit: ScalingTrait = {
            title: "Spirit Totem",
            description: "Extra HP granted to  creatures for Bear and Unicorn Spirit",
            bonus: 2,
            points: 5
        }
        pc.pcHelper.addScalingTraits(spirit);
        const wildShapeScale: ScalingTrait = pc.pcHelper.findScalingTraitByName("Wild Shape");
        wildShapeScale.challengeRating = 0.25;
    }
      
    static shepherd4(pc: PlayerCharacter, params: LevelingParams){
        const wildShapeScale: ScalingTrait = pc.pcHelper.findScalingTraitByName("Wild Shape");
        wildShapeScale.challengeRating = 0.5;
        ShepherdCircle.upSpirit(pc);
    }

    static shepherd6(pc: PlayerCharacter, params: LevelingParams) {
        pc.pcHelper.addFeatures(ShepherdCircle.getFeature("6", "MIGHTY SUMMONER"));
        ShepherdCircle.upSpirit(pc);
    }
    
    static shepherd8(pc: PlayerCharacter, params: LevelingParams){
        const wildShapeScale: ScalingTrait = pc.pcHelper.findScalingTraitByName("Wild Shape");
        wildShapeScale.challengeRating = 1;
        ShepherdCircle.upSpirit(pc);
    }

    static shepherd10(pc: PlayerCharacter, params: LevelingParams) {
        pc.pcHelper.addFeatures(ShepherdCircle.getFeature("10", "GUARDIAN SPIRIT"));
        const guardianSpirit: ScalingTrait = {
            title:"Guardian Spirit",
            description: "Amount of HP your summons regain in Guardian Spirit Aura",
            bonus: 5
        }
        pc.pcHelper.addScalingTraits(guardianSpirit);
        ShepherdCircle.upSpirit(pc);
    }

    static shepherd14(pc: PlayerCharacter, params: LevelingParams) {
        pc.pcHelper.addFeatures(ShepherdCircle.getFeature("14", "FAITHFUL SUMMONS"));
        ShepherdCircle.upGuardian(pc);
    }
}