import { PlayerCharacter } from "../../../../Base/PlayerCharacter";
import { LevelingParams } from "../../../../Classes/PlayerClass";
import * as AbjurationSchoolDict from "./Abjuration.json"

export class Abjuration {

    static getFeature(level: string, featureName: string) {
        return AbjurationSchoolDict["features"][level][featureName];
    }

    static abjuration2(pc: PlayerCharacter, params: LevelingParams): void {
        pc.pcHelper.addFeatures(Abjuration.getFeature("2", "ABJURATION SAVANT"), Abjuration.getFeature("2", "ARCANE WARD"))
    }
    
    static abjuration6(pc: PlayerCharacter, params: LevelingParams): void {
        pc.pcHelper.addFeatures(Abjuration.getFeature("6", "PROJECTED WARD"))
    }

    static abjuration10(pc: PlayerCharacter, params: LevelingParams): void {
        pc.pcHelper.addFeatures(Abjuration.getFeature("10", "IMPROVED ABJURATION"))
    }

    static abjuration14(pc: PlayerCharacter, params: LevelingParams): void {
        pc.pcHelper.addFeatures(Abjuration.getFeature("14", "SPELL RESISTANCE"))
    }
}