import { PlayerCharacter } from "../../../../Base/PlayerCharacter";
import { LevelingParams } from "../../../PlayerClass";
import * as CollegeOfValorDict from "./CollegeOfValor.json";

export class CollegeOfValor {

    static getFeature(level: string, featureName: string) {
        return CollegeOfValorDict["features"][level][featureName];
    }

    static valor3(pc: PlayerCharacter, params: LevelingParams) {
        pc.pcHelper.addFeatures(CollegeOfValor.getFeature("3", "COMBAT INSPIRATION"));
    }

    static valor6(pc: PlayerCharacter, params: LevelingParams) {
        pc.pcHelper.addFeatures(CollegeOfValor.getFeature("6", "EXTRA ATTACK"));
    }

    static valor14(pc: PlayerCharacter, params: LevelingParams) {
        pc.pcHelper.addFeatures(CollegeOfValor.getFeature("14", "BATTLE MAGIC"));
    }  
}