import { PlayerCharacter } from "Base/PlayerCharacter";
import { LevelingParams } from "Classes/PlayerClass";
import * as DivinationSchoolDict from "./Divination.json"

export class Divination {

    static getFeature(level: string, featureName: string) {
        return DivinationSchoolDict["features"][level][featureName];
    }

    static divination2(pc: PlayerCharacter, params: LevelingParams): void {
        pc.addFeatures(Divination.getFeature("2", "DIVINATION SAVANT"), Divination.getFeature("2", "PORTENT"))
    }
    
    static divination6(pc: PlayerCharacter, params: LevelingParams): void {
        pc.addFeatures(Divination.getFeature("6", "EXPERT DIVINATION"))
    }

    static divination10(pc: PlayerCharacter, params: LevelingParams): void {
        pc.addFeatures(Divination.getFeature("10", "THE THIRD EYE"))
    }

    static divination14(pc: PlayerCharacter, params: LevelingParams): void {
        pc.addFeatures(Divination.getFeature("14", "GREATER PORTENT"))
    }

}