import { PlayerCharacter } from "../../../../Base/PlayerCharacter";
import { LevelingParams } from "../../../../Classes/PlayerClass";
import * as FourElementsDict from "./WayOfTheFourElements.json"
import * as Spells from "../../../../../Assets/Spells.json";
import * as ElementalDisciplines from "./ElementalDisciplines.json"
import { MonkLevelingParams } from "Classes/Monk/Monk";
import { ISpell, Spell, Trait } from "Base/Interfaces";

export class FourElements {

    static getFeature(level: string, featureName: string) {
        return FourElementsDict["features"][level][featureName];
    }
    
    static fourElements3(pc: PlayerCharacter, params: MonkLevelingParams) {
        // New elemental discipline learned, plus Elemental Attunement discipline.
    

        pc.pcHelper.addFeatures(
            FourElements.getFeature("3", "DISCIPLE OF THE ELEMENTS")
        );

        FourElements.handleDisciplineSelections(pc, params);
        
        pc.pcHelper.addScalingTraits({
            title: "Elemental Discipline Max Level",
            description: "Maximum number of Max Level you can spend to cast a spell with the Way of the Four Elements.",
            points: 2
        });
    }
  
    static fourElements5(pc: PlayerCharacter, params: MonkLevelingParams) {
        pc.pcHelper.findScalingTraitByName("Elemental Discipline Max Level").points++;
    }

    static fourElements6(pc: PlayerCharacter, params: MonkLevelingParams) {
        FourElements.handleDisciplineSelections(pc, params);
    }

    static fourElements9(pc: PlayerCharacter, params: MonkLevelingParams) {
        pc.pcHelper.findScalingTraitByName("Elemental Discipline Max Level").points++;
    }
  
    static fourElements11(pc: PlayerCharacter, params: MonkLevelingParams) {
        FourElements.handleDisciplineSelections(pc, params);
    }

    static fourElements13(pc: PlayerCharacter, params: MonkLevelingParams) {
        FourElements.handleDisciplineSelections(pc, params);        
        pc.pcHelper.findScalingTraitByName("Elemental Discipline Max Level").points++;
    }
  
    static fourElements17(pc: PlayerCharacter, params: MonkLevelingParams) {
        FourElements.handleDisciplineSelections(pc, params);
        pc.pcHelper.findScalingTraitByName("Elemental Discipline Max Level").points++;
    }

    static handleDisciplineSelections(
    pc: PlayerCharacter,
    params: MonkLevelingParams
    ) {
        if (params.disciplines.add) {
            const disciplines: Trait[] = params.disciplines.add.map(
            (d) => ElementalDisciplines[d]
            );
            pc.pcHelper.addFeatures(...disciplines);
            const spells: Spell[] = disciplines.map(
                d => {
                    if(d.spellAdded) {
                        const dSpell: Spell = { ...Spells[d.spellAdded], 
                            spellcastingAbility: "wisdom",
                            source: {
                                title: d.title,
                                description: d.description
                        }};
                        return dSpell;
                    }
                    return null;
                }
            );
            pc.pcHelper.addCustomSpells(...spells);
        }
        if (params.disciplines.remove) {

            const oldDisciplines: string[] = params.disciplines.remove;
            pc.pcHelper.removeFeatures(oldDisciplines);
            const oldSpells: string[] = oldDisciplines
                .map(d => ElementalDisciplines[d].spellAdded ? ElementalDisciplines[d].spellAdded : "" )
                .filter(s => s != "");

            pc.pcHelper.removeSpells(oldSpells);

        }
    }
}