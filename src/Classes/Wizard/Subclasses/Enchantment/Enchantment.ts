import { PlayerCharacter } from "../../../../Base/PlayerCharacter";
import { LevelingParams } from "../../../../Classes/PlayerClass";
import * as EnchantmentSchoolDict from "./Enchantment.json"

export class Enchantment {

    static getFeature(level: string, featureName: string) {
        return EnchantmentSchoolDict["features"][level][featureName];
    }

    static enchantment2(pc: PlayerCharacter, params: LevelingParams): void {
        pc.pcHelper.addFeatures(Enchantment.getFeature("2", "ENCHANTMENT SAVANT"), Enchantment.getFeature("2", "HYPNOTIC GAZE"))
    }
    
    static enchantment6(pc: PlayerCharacter, params: LevelingParams): void {
        pc.pcHelper.addFeatures(Enchantment.getFeature("6", "INSTINCTIVE CHARM"))
    }

    static enchantment10(pc: PlayerCharacter, params: LevelingParams): void {
        pc.pcHelper.addFeatures(Enchantment.getFeature("10", "SPLIT ENCHANTMENT"))
    }

    static enchantment14(pc: PlayerCharacter, params: LevelingParams): void {
        pc.pcHelper.addFeatures(Enchantment.getFeature("14", "ALTER MEMORIES"))
    }
}