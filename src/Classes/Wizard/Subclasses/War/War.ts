import { ResourceTrait, ScalingTrait } from "../../../../Base/Interfaces";
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
    }

    static war2(pc: PlayerCharacter, params: LevelingParams): void {
        pc.pcHelper.addFeatures(War.getFeature("2", "ARCANE DEFLECTION"));
        pc.pcHelper.addFeatures(War.getFeature("2","TACTICAL WIT"));
    }
    
    static war6(pc: PlayerCharacter, params: LevelingParams): void {
        pc.pcHelper.addFeatures(War.getFeature("6", "POWER SURGE"));
        const powerDmg: ScalingTrait = {
            title: "Power Surge",
            description: "Bonus force damage from Power Surge",
            bonus: 3
        }
        const powerUse: ResourceTrait = {
            title: "Power Surge",
            description: "Maximum number of Power Surges you may store",
            resourceMax: (pc.abilityScores.intelligence.modifier.value >= 1) ? pc.abilityScores.intelligence.modifier : {value: 1}
        }
        pc.pcHelper.addScalingTraits(powerDmg);
        pc.pcHelper.addResourceTraits(powerUse);
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