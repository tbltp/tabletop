import { PlayerCharacter } from "Base/PlayerCharacter";
import { LevelingParams } from "Classes/PlayerClass";
import * as TransmutationSchoolDict from "./Transmutation.json"

export class Transmutation {

    static getFeature(level: string, featureName: string) {
        return TransmutationSchoolDict["features"][level][featureName];
    }

    static transmutation2(pc: PlayerCharacter, params: LevelingParams): void {
        pc.pcHelper.addFeatures(Transmutation.getFeature("2", "TRANSMUTATION SAVANT"), Transmutation.getFeature("2", "MINOR ALCHEMY"))
    }
    
    static transmutation6(pc: PlayerCharacter, params: LevelingParams): void {
        pc.pcHelper.addFeatures(Transmutation.getFeature("6", "TRANSMUTER'S STONE"))
    }

    static transmutation10(pc: PlayerCharacter, params: LevelingParams): void {
        pc.pcHelper.addFeatures(Transmutation.getFeature("10", "SHAPECHANGER"))
    }

    static transmutation14(pc: PlayerCharacter, params: LevelingParams): void {
        pc.pcHelper.addFeatures(Transmutation.getFeature( "14", "MASTER TRANSMUTER"))
    }

}