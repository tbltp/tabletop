import { PlayerCharacter } from "../../../../Base/PlayerCharacter";
import { LevelingParams } from "../../../../Classes/PlayerClass";
import * as ConjurationSchoolDict from "./Conjuration.json"

export class Conjuration {

    static getFeature(level: string, featureName: string) {
        return ConjurationSchoolDict["features"][level][featureName];
    }

    static conjuration2(pc: PlayerCharacter, params: LevelingParams): void {
        pc.pcHelper.addFeatures(Conjuration.getFeature("2", "CONJURATION SAVANT"), Conjuration.getFeature("2", "MINOR CONJURATION"))
    }
    
    static conjuration6(pc: PlayerCharacter, params: LevelingParams): void {
        pc.pcHelper.addFeatures(Conjuration.getFeature("6", "BENIGN TRANSPOSITION"))
    }

    static conjuration10(pc: PlayerCharacter, params: LevelingParams): void {
        pc.pcHelper.addFeatures(Conjuration.getFeature("10", "FOCUSED CONJURATION"))
    }

    static conjuration14(pc: PlayerCharacter, params: LevelingParams): void {
        pc.pcHelper.addFeatures(Conjuration.getFeature("14", "DURABLE SUMMONS"))
    }
}