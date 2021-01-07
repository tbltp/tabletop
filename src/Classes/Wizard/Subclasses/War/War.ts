import { ScalingTrait } from "../../../../Base/Interfaces";
import { PlayerCharacter } from "../../../../Base/PlayerCharacter";
import { LevelingParams } from "../../../../Classes/PlayerClass";
import * as WarSchoolDict from "./War.json"

export class War {

    static getFeature(level: string, featureName: string) {
        return WarSchoolDict["features"][level][featureName];
    }

    static upSurge(pc: PlayerCharacter) {
        const powerSurge: ScalingTrait = pc.pcHelper.findScalingTraitByName("Power Surge");
        powerSurge.bonus++;
        powerSurge.points = pc.abilityScores.intelligence.modifier.value;
    }

    static war2(pc: PlayerCharacter, params: LevelingParams): void {
        pc.pcHelper.addFeatures(War.getFeature("2", "ARCANE DEFLECTION"));
        pc.pcHelper.addFeatures(War.getFeature("2","TACTICAL WIT"));
    }
    
    static war6(pc: PlayerCharacter, params: LevelingParams): void {
        pc.pcHelper.addFeatures(War.getFeature("6", "POWER SURGE"));
        const powerSurge: ScalingTrait = {
            title: "Power Surge",
            description: "Max number of stored charges, and bonus to damage for Power Surge",
            points: pc.abilityScores.intelligence.modifier.value,
            bonus: 3
        }
        pc.pcHelper.addScalingTraits(powerSurge);
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