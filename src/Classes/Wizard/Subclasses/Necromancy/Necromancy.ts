import { PlayerCharacter } from "../../../../Base/PlayerCharacter";
import { LevelingParams } from "../../../../Classes/PlayerClass";
import * as NecromancySchoolDict from "./Necromancy.json"

export class Necromancy {

    static getFeature(level: string, featureName: string) {
        return NecromancySchoolDict["features"][level][featureName];
    }

    static necromancy2(pc: PlayerCharacter, params: LevelingParams): void {
        pc.pcHelper.addFeatures(Necromancy.getFeature("2", "NECROMANCY SAVANT"), Necromancy.getFeature("2", "GRIM HARVEST"))
    }
    
    static necromancy6(pc: PlayerCharacter, params: LevelingParams): void {
        pc.pcHelper.addFeatures(Necromancy.getFeature("6", "UNDEAD THRALLS"))
    }

    static necromancy10(pc: PlayerCharacter, params: LevelingParams): void {
        pc.pcHelper.addFeatures(Necromancy.getFeature( "10", "INJURED TO UNDEATH"))
    }

    static necromancy14(pc: PlayerCharacter, params: LevelingParams): void {
        pc.pcHelper.addFeatures(Necromancy.getFeature("14", "COMMAND UNDEAD"))
    }

}