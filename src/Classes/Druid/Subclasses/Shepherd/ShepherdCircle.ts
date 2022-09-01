import { PlayerCharacter } from "../../../../Character/PlayerCharacter";
import { ResourceTrait, ScalingTrait } from "../../../../Character/Interfaces";
import { LevelingParams, PlayerClass } from "../../../PlayerClass";
import * as ShepherdCircleDict from "./Shepherd.json";


export class ShepherdCircle 
{        
    static getFeature(level: string, featureName: string) {
        return ShepherdCircleDict["features"][level][featureName];
    }

    static upGuardian(pc: PlayerCharacter) {
        pc.pcHelper.findFeatureTraitByName("Guardian Spirit").scaling.bonus++;
        ShepherdCircle.upSpirit(pc);
    }

    static upSpirit(pc: PlayerCharacter) {
        pc.pcHelper.findFeatureTraitByName("Spirit Totem").scaling.bonus++;
    }

    static shepherd2(pc: PlayerCharacter, params: LevelingParams) {
        pc.pcHelper.addFeatures(ShepherdCircle.getFeature("2", "SPEECH OF THE WOODS"), ShepherdCircle.getFeature("2", "SPIRIT TOTEM"));
        pc.pcHelper.addEffectsToFeature("Spirit Totem", {scaling: {bonus: 2, points: 5}})
        pc.pcHelper.findFeatureTraitByName("Wild Shape").scaling.challengeRating = 0.25;
    }
      
    static shepherd4(pc: PlayerCharacter, params: LevelingParams){
        pc.pcHelper.findFeatureTraitByName("Wild Shape").scaling.challengeRating = 0.5;
        ShepherdCircle.upSpirit(pc);
    }

    static shepherd6(pc: PlayerCharacter, params: LevelingParams) {
        pc.pcHelper.addFeatures(ShepherdCircle.getFeature("6", "MIGHTY SUMMONER"));
        ShepherdCircle.upSpirit(pc);
    }
    
    static shepherd8(pc: PlayerCharacter, params: LevelingParams){
        pc.pcHelper.findFeatureTraitByName("Wild Shape").scaling.challengeRating = 1;
        ShepherdCircle.upSpirit(pc);
    }

    static shepherd10(pc: PlayerCharacter, params: LevelingParams) {
        pc.pcHelper.addFeatures(ShepherdCircle.getFeature("10", "GUARDIAN SPIRIT"));
        pc.pcHelper.addEffectsToFeature("Guardian Spirit", {scaling: {bonus: 5}})
        ShepherdCircle.upSpirit(pc);
    }

    static shepherd14(pc: PlayerCharacter, params: LevelingParams) {
        pc.pcHelper.addFeatures(ShepherdCircle.getFeature("14", "FAITHFUL SUMMONS"));
        ShepherdCircle.upGuardian(pc);
    }
}