import { PlayerCharacter } from "Base/PlayerCharacter";
import { LevelingParams } from "Classes/PlayerClass";
import * as FourElementsDict from "./WayOfTheFourElements.json"
import * as ElementalDisciplines from "./ElementalDisciplines.json"

export class FourElements {
    static fourElements3(pc: PlayerCharacter, params: LevelingParams) {
        // New elemental discipline learned, plus Elemental Attunement discipline.
        
        pc.pcHelper.addScalingTraits({
            title: "Elemental Discipline Ki Points",
            description: "Maximum number of Ki Points you can spend to cast a spell with the Way of the Four Elements.",
            points: 2
        })
    }
  
    static fourElements5(pc: PlayerCharacter, params: LevelingParams) {
        pc.pcHelper.findScalingTraitByName("Elemental Discipline Ki Points").points++;
    }

    static fourElements6(pc: PlayerCharacter, params: LevelingParams) {
        // New elemental discipline learned, ED replacements.
    }

    static fourElements9(pc: PlayerCharacter, params: LevelingParams) {
        pc.pcHelper.findScalingTraitByName("Elemental Discipline Ki Points").points++;
    }
  
    static fourElements11(pc: PlayerCharacter, params: LevelingParams) {
        // New elemental discipline learned, ED replacements.
    }

    static fourElements13(pc: PlayerCharacter, params: LevelingParams) {
        pc.pcHelper.findScalingTraitByName("Elemental Discipline Ki Points").points++;
    }
  
    static fourElements17(pc: PlayerCharacter, params: LevelingParams) {
        // New elemental discipline learned, ED replacements.
        pc.pcHelper.findScalingTraitByName("Elemental Discipline Ki Points").points++;
    }
}