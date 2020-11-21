import { PlayerCharacter } from "../../../../Base/PlayerCharacter";
import { LevelingParams } from "../../../../Classes/PlayerClass";
import * as IllusionSchoolDict from "./Illusion.json"

export class Illusion {

    static getFeature(level: string, featureName: string) {
        return IllusionSchoolDict["features"][level][featureName];
    }

    static illusion2(pc: PlayerCharacter, params: LevelingParams): void {
        pc.pcHelper.addFeatures(Illusion.getFeature("2", "ILLUSION SAVANT"), Illusion.getFeature("2", "IMPROVED MINOR ILLUSION"))
    }
    
    static illusion6(pc: PlayerCharacter, params: LevelingParams): void {
        pc.pcHelper.addFeatures(Illusion.getFeature("6", "MALLEABLE ILLUSIONS"))
    }

    static illusion10(pc: PlayerCharacter, params: LevelingParams): void {
        pc.pcHelper.addFeatures(Illusion.getFeature("10", "ILLUSORY SELF"))
    }

    static illusion14(pc: PlayerCharacter, params: LevelingParams): void {
        pc.pcHelper.addFeatures(Illusion.getFeature("14", "ILLUSORY REALITY"))
    }

}