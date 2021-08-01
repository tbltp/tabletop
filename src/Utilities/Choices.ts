import * as RaceChoices from "./Choice Build Specs/RaceChoices.json";
import * as BackgroundChoices from "./Choice Build Specs/BackgroundChoices.json";
import * as ClassChoices from "./Choice Build Specs/ClassCreationChoices.json";
import * as SubclassChoices from "./Choice Build Specs/SubClassChoices.json";
import { CharacterSheet } from "../Base/CharacterSheet";
import { PlayerCharacter } from "../Base/PlayerCharacter";
import { Race } from "../Races/Race";
import { Background } from "../Backgrounds/Background";
import { PlayerClass } from "../Classes/PlayerClass";

import * as SpellList from "../../Assets/SpellList.json"


export class PlayerFactory {

    private propertyRailroad = {
        "RACE": RaceChoices,
        "BACKGROUND": BackgroundChoices,
        "CLASS": ClassChoices,
        "SUBCLASS": SubclassChoices
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

    storeEmptyStage(property: string, choice: string, level?: string): void {
        if(choice === "") {
            property === "CLASS" ?
            this.choiceDocs[property] = {"0": {}, "1": {}} :
            this.choiceDocs[property] = {} 
            return
        }
        
        this.choiceDocs[property]["title"] = choice 

        if(level != null){
            const reference: [string, ChoiceSpec][] = Object.entries(this.propertyRailroad[property][choice][level]);
            this.choiceDocs[property] = {"0": {}, "1": {}}
            for(let ref of reference) {
                if(ref[1].nested){
                    this.choiceDocs[property][level][ref[0]] = []
                    continue
                }
                ref[1].choose > 1 ? this.choiceDocs[property][level][ref[0]] = [] : this.choiceDocs[property][level][ref[0]] = "" 
            }
        }
        else {
            const reference: [string, ChoiceSpec][] = Object.entries(this.propertyRailroad[property][choice]);
            this.choiceDocs[property] = {}
            for(let ref of reference) {
                ref[1].choose > 1 ? this.choiceDocs[property][ref[0]] = [] : this.choiceDocs[property][ref[0]] = "" 
            }
        }
    }

    setAbilityScore(name: string, score: number): void {
        this.choiceDocs.abilityScores[name] = score;
    }

    setProp(property: string, feature: string, choice: string[] | string){
        this.choiceDocs[property][feature] = choice
    }

    renderPropertyChoices(property: string): ChoiceSpec {
        return {
            alias: property,
            choose: 1,
            required: true,
            from: Object.keys(this.propertyRailroad[property])
        };
    }

    renderChoiceSpecs(property: string, choice: string, level?: string): [string, ChoiceSpec][] {
        let choices: [string, ChoiceSpec][] = []
        
        if(level != null) {
            choices = this.propertyRailroad[property][choice][level] ? 
                Object.entries(this.propertyRailroad[property][choice][level]) :
                []
        } 
        else { choices = Object.entries(this.propertyRailroad[property][choice]) }
           
        
        return choices.map(c => 
            c[1].method ? 
                [c[0], {...c[1], from: ChoiceEvaluator.fns[c[1].method](c[1].args)}] : 
                c 
        )
    }



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
pf.storeEmptyStage("CLASS", "Barbarian", "0")
console.log(pf.choiceDocs)

