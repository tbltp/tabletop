import * as SpellList from "../../../Assets/SpellList.json"

import { Background } from "../../Backgrounds/Background";
import { BackgroundChoices } from "./Background/BackgroundChoices";
import { CharacterSheet } from "../../Base/CharacterSheet";
import { ClassChoices } from "./Class/ClassChoices";
import { PlayerCharacter } from "../../Base/PlayerCharacter";
import { PlayerClass } from "../../Classes/PlayerClass";
import { Race } from "../../Races/Race";
import { RaceChoices } from "./Race/RaceChoices";

export class PlayerFactory {

    private propertyRailroad = {
        "RACE": RaceChoices,
        "BACKGROUND": BackgroundChoices,
        "CLASS": ClassChoices,
    }


    public characterSheet: CharacterSheet;
    public name: string;

    private playerCharacter: PlayerCharacter;
    private race: Race;
    private background: Background;
    private playerClass: PlayerClass;
    

    //staging object
    choiceDocs = {
        abilityScores: {str: 0, dex: 0, con: 0, int: 0, wis: 0, cha: 0},
        RACE: {},
        BACKGROUND: {},
        CLASS: {
            "0": {},
            "1": {}
        }
    }


    constructor() {
        //this.characterSheet = new CharacterSheet("");
        this.playerCharacter = null;
    }

    setAbilityScore(name: string, score: number): void {
        this.choiceDocs.abilityScores[name] = score;
    }

    setProp(property: string, feature: string, choice: string[] | string, level?: string){
        level != null ? this.choiceDocs[property][level][feature] = choice : this.choiceDocs[property][feature] = choice
    }

    renderPropertyChoices(property: string): ChoiceSpec {
        return {
            alias: property,
            choose: 1,
            required: true,
            from: Object.keys(this.propertyRailroad[property])
        };
    }

    storeEmptyStage(property: string, choice: string, level?: string): void {
        if(choice === "") {
            property === "CLASS" ?
            this.choiceDocs[property] = {"0": {}, "1": {}} :
            this.choiceDocs[property] = {} 
            return
        }
        
        this.choiceDocs[property]["title"] = choice 

        if(level != null) {
            this.storeEmptyClassStage(property, choice, level)
            return
        }

        const reference: [string, ChoiceSpec][] = Object.entries(this.propertyRailroad[property][choice]);
        this.choiceDocs[property] = {}
        
        for(let ref of reference) {
            ref[1].choose > 1 ? this.choiceDocs[property][ref[0]] = [] : this.choiceDocs[property][ref[0]] = "" 
        }
        
    }

    storeEmptyClassStage(property: string, choice: string, level: string): void {
        console.log(property, choice, level)
        const reference: [string, ChoiceSpec][] = Object.entries(this.propertyRailroad[property][choice][level]);
        this.choiceDocs[property][level] = {}
        
        if(level === "0") {
            for(let ref of reference) {
                ["skillProficiencies", "instrumentProficiencies", "weapons", "armor", "toolProficiencies"].includes(ref[0]) ?
                    this.choiceDocs[property][level][ref[0]] = [] :
                    this.choiceDocs[property][level][ref[0]] = ""
            }
        }
        else {
            for(let ref of reference) {
                if(ref[0] === "spellSelections.add") { this.choiceDocs[property][level].spellSelections = {add: []} }
                else if (ref[0] === "subclassSelection") { continue }
                else {
                    ref[1].choose > 1 ? this.choiceDocs[property][ref[0]] = [] : this.choiceDocs[property][ref[0]] = ""
                }
            }
        }

    }



    renderChoiceSpecs(property: string, choice: string, level?: string): [string, ChoiceSpec][] {
        
        const choices: [string, ChoiceSpec][] = 
        level != null ?
            (
                this.propertyRailroad[property][choice][level] ?
                    Object.entries(this.propertyRailroad[property][choice][level]) :
                    [] 
            ) :
            Object.entries(this.propertyRailroad[property][choice])
           
        
        return choices.map(c => 
            c[1].method ? 
                [c[0], {...c[1], from: ChoiceEvaluator.fns[c[1].method](c[1].args)}] : 
                c 
        )
    }

    // renderClassChoiceSpecs(property: string, choice: string, level: string): [string, ChoiceSpec][] {

    //     const choices: [string, ChoiceSpec][] = this.propertyRailroad[property][choice][level] ? 
    //             Object.entries(this.propertyRailroad[property][choice][level]) :
    //             []
        
    //     return choices.map(c => 
            
    //     )

    //     return 
    // }



    buildCharacter() {
        //this.playerCharacter = new PlayerCharacter(this.choiceDocs.abilityScores)
        /*
        this.characterSheet.fillSheet(
            this.playerCharacter,
            this.race,
            this.playerClass,
            this.background, 
            false
        );
        */
    }

}

class ChoiceEvaluator {
    static fns = {
        getSpellList: ChoiceEvaluator.getSpellList
    }

    static getSpellList(spec: ChoiceArgs) {
        //up to specified level
        if (+spec.level > 0) {
            let spellList = new Set<string>();
            for (let i = 1; i <= +spec.level; i++) {
                SpellList[spec.list][i].map((spell) => spellList.add(spell));
            }
            return [...spellList.values()];
        } else {
            return SpellList[spec.list][spec.level];
        }
    }
}

interface ChoiceArgs {
    list?: string,
    level?: string,
    pc?: string
}

export interface ChoiceSpec {
    alias: string;
    choose: number;
    required: boolean;
    from?: string[];
    method?: string;
    args?: string[];
    or?: ChoiceSpec[];
    and?: ChoiceSpec[];
    needs?: string;
    nested?: boolean;
}

const pf = new PlayerFactory()

pf.storeEmptyStage("CLASS", "Bard", "0")
pf.storeEmptyStage("CLASS", "Bard", "1")
console.log(pf.choiceDocs)

