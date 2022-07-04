import * as IllusionSchoolDict from "./Illusion.json"

import { LevelingParams } from "../../../../Classes/PlayerClass";
import { PlayerCharacter } from "../../../../Character/PlayerCharacter";

export class Illusion {

    static getFeature(level: string, featureName: string) {
        return IllusionSchoolDict["features"][level][featureName];
    }

    static illusion2(pc: PlayerCharacter, params: LevelingParams): void {
        pc.pcHelper.addFeatures(Illusion.getFeature("2", "ILLUSION SAVANT"), Illusion.getFeature("2", "IMPROVED MINOR ILLUSION"))
        
        // Handle Minor Illusion or Free Cantrip
        if(pc.spells["0"].find(spell => spell.name === "Minor Illusion")){
            pc.pcHelper.addSpells(
                [...params.subclassParams.spellSelections.add], 
                "intelligence"
            )
        }
        else {
            pc.pcHelper.addSpells(
                ["MINOR ILLUSION"], 
                "intelligence"
            )
        }
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