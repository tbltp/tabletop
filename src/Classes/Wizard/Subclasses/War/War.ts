import { ResourceTrait, ScalingTrait } from "../../../../Base/Interfaces";
import { PlayerCharacter } from "../../../../Base/PlayerCharacter";
import { LevelingParams, PlayerClass } from "../../../../Classes/PlayerClass";
import * as WarSchoolDict from "./War.json"

export class War {

    static getFeature(level: string, featureName: string) {
        return WarSchoolDict["features"][level][featureName];
    }

    static upSurge(pc: PlayerCharacter) {
        pc.pcHelper.findFeatureTraitByName("Power Surge").scaling.bonus++;
    }

    static war2(pc: PlayerCharacter, params: LevelingParams): void {
        pc.pcHelper.addFeatures(War.getFeature("2", "ARCANE DEFLECTION"));
        pc.pcHelper.addFeatures(War.getFeature("2","TACTICAL WIT"));
    }
    
    static war6(pc: PlayerCharacter, params: LevelingParams): void {
        pc.pcHelper.addFeatures(War.getFeature("6", "POWER SURGE"));
        const powerSurge = {
            resource: {resourceMax: (pc.abilityScores.intelligence.modifier.value >= 1) ? pc.abilityScores.intelligence.modifier : {value: 1}},
            scaling: {bonus: 3}
        }
        pc.pcHelper.addEffectsToClassFeature("Power Surge", powerSurge)
    }

    static war10(pc: PlayerCharacter, params: LevelingParams): void {
        pc.pcHelper.addFeatures(War.getFeature("10", "DURABLE MAGIC"));
        War.upSurge(pc);
    }

    static war14(pc: PlayerCharacter, params: LevelingParams): void {
        pc.pcHelper.addFeatures(War.getFeature( "14", "DEFLECTING SHROUD"));
        War.upSurge(pc);
    }
}