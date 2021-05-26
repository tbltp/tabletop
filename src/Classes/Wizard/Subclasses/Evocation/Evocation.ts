import { PlayerCharacter } from "../../../../Base/PlayerCharacter";
import { LevelingParams } from "../../../../Classes/PlayerClass";
import * as EvocationSchoolDict from "./Evocation.json"

export class Evocation {

    static getFeature(level: string, featureName: string) {
        return EvocationSchoolDict["features"][level][featureName];
    }

    static evocation2(pc: PlayerCharacter, params: LevelingParams): void {
        pc.pcHelper.addFeatures(Evocation.getFeature("2", "EVOCATION SAVANT"), Evocation.getFeature("2", "SCULPT SPELLS"))

    }
    
    static evocation6(pc: PlayerCharacter, params: LevelingParams): void {
        pc.pcHelper.addFeatures(Evocation.getFeature("6", "POTENT CANTRIP"))
    }

    static evocation10(pc: PlayerCharacter, params: LevelingParams): void {
        pc.pcHelper.addFeatures(Evocation.getFeature("10", "EMPOWERERD EVOCATION"))
    }

    static evocation14(pc: PlayerCharacter, params: LevelingParams): void {
        pc.pcHelper.addFeatures(Evocation.getFeature("14", "OVERCHANNEL"))
    }
}