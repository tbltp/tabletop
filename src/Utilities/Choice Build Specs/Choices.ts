import * as SpellList from "../../../Assets/SpellList.json"

import { bgDict, classDict, raceDict } from "../ConstructorDefinitions";

import { Background } from "../../Backgrounds/Background";
import { BackgroundChoices } from "./Background/BackgroundChoices";
import { CharacterSheet } from "../../Base/CharacterSheet";
import { ClassChoices } from "./Class/ClassChoices";
import { DSBackground } from "../../Backgrounds/Background";
import { DSClass } from "../../Classes/PlayerClass";
import { DSRace } from "../../Races/Race";
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
        topLevelChoices: {RACE: "", BACKGROUND: "", CLASS: ""},
        abilityScores: {str: 0, dex: 0, con: 0, int: 0, wis: 0, cha: 0},
        RACE: {},
        BACKGROUND: {},
        CLASS: {
            "0": {},
            "1": {}
        }
    }

    constructor() {
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
            
            this.choiceDocs.topLevelChoices[property] = "" 
            
            return
        }
        
        this.choiceDocs.topLevelChoices[property] = choice 

        if(level != null) {
            this.storeEmptyClassStage(choice, level)
            return
        }

        const reference: [string, ChoiceSpec][] = Object.entries(this.propertyRailroad[property][choice]);
        this.choiceDocs[property] = {}
        
        for(let ref of reference) {
            ref[1].choose > 1 ? this.choiceDocs[property][ref[0]] = [] : this.choiceDocs[property][ref[0]] = "" 
        }
        
    }

    storeEmptyClassStage(choice: string, level: string): void {
        if(!this.propertyRailroad["CLASS"][choice][level]){ return }

        this.choiceDocs["CLASS"][level] = {}
        const reference: [string, ChoiceSpec][] = Object.entries(this.propertyRailroad["CLASS"][choice][level]);
        
        for(let ref of reference) {
            const key =  ref[0]
            const val = ref[1]

            if(Array.isArray(val)) {
                this.choiceDocs["CLASS"][level][key] = []
            }
            else if(key === "spellSelections") {
                this.choiceDocs["CLASS"][level][key] = {add: [], remove: []}
            }
            else {
                this.choiceDocs["CLASS"][level][key] = val.choose > 1 ? [] : ""
            }
        }

    }

    renderChoiceSpecs(property: string, choice: string, level?: string): [string, ChoiceSpec][] {
        let choices;

        if (level !== undefined) {
            choices = (this.propertyRailroad[property][choice][level] ?
                Object.entries(this.propertyRailroad[property][choice][level]) :
                []);
        } else {
            choices =  Object.entries(this.propertyRailroad[property][choice]);
        }

        return choices;
    }

    buildCharacter() {
        try {
            this.playerCharacter = new PlayerCharacter(
                this.choiceDocs.abilityScores.str,
                this.choiceDocs.abilityScores.dex,
                this.choiceDocs.abilityScores.con,
                this.choiceDocs.abilityScores.int,
                this.choiceDocs.abilityScores.wis,
                this.choiceDocs.abilityScores.cha
            )
    
            const raceChoices: [string, {}] = [this.choiceDocs.topLevelChoices.RACE, this.choiceDocs.RACE]
            const classChoices: [string, {}] = [this.choiceDocs.topLevelChoices.CLASS, this.choiceDocs.CLASS]
            const bgChoices: [string, {}] = [this.choiceDocs.topLevelChoices.BACKGROUND, this.choiceDocs.BACKGROUND]

            this.race = raceChoices[0] ? new raceDict[raceChoices[0]](raceChoices[1]) : new DSRace()
            this.playerClass = classChoices[0] ? new classDict[classChoices[0]](classChoices[1][0]) : new DSClass()
            this.background = bgChoices[0] ? new bgDict[bgChoices[0]](bgChoices[1]) : new DSBackground()

            this.characterSheet = new CharacterSheet(
                "", 
                this.playerCharacter,
                this.race, 
                this.playerClass,
                this.background
            ) 

            this.characterSheet.levelUp(classChoices[0], 0, classChoices[1][1])
        }
        catch(error) {
            console.log(error)
        }
    }

    private checkCompletion(field: string) {
        if(field ===  "CLASS"){
            for(const [key, val] of Object.entries(this.choiceDocs["CLASS"]["0"])) {
                if(val == undefined) { return false }
            }
            
            for(const [key, val] of Object.entries(this.choiceDocs["CLASS"]["1"])) {
                if(val == undefined) { return false }
            }
        }
        else {
            for(const [key, val] of Object.entries(this.choiceDocs[field])) {
                if(val == undefined) { return false }
            }
        }

        return true
    }

}

export class ChoiceEvaluator {
    static fns = {
        getSpellList: ChoiceEvaluator.getSpellList,
        getKnownSpells: ChoiceEvaluator.getKnownSpells,
        getAvailableClericWeapons: ChoiceEvaluator.getAvailableClericWeapons,
        getAvailableClericArmor: ChoiceEvaluator.getAvailableClericArmor,
        getSkillProficiencies: ChoiceEvaluator.getSkillProficiencies
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

    static getKnownSpells(spec: ChoiceArgs) {
        return Object.values(spec.pc.spells).slice(1).reduce((entireArray, currentArray) => [...entireArray, ...currentArray], []).map(x => x.name.toUpperCase())
    }

    static getAvailableClericWeapons(spec: ChoiceArgs) {
        return spec.pc.traits.weaponProficiencies.has("Warhammer") || spec.pc.traits.weaponProficiencies.has("Martial")
          ?
          ["MACE", "WARHAMMER"] :
          ["MACE"]
    }

    static getAvailableClericArmor(spec: ChoiceArgs) {
        return spec.pc.traits.armorProficiencies.has("Heavy") ?
          ["SCALE MAIL", "LEATHER", "CHAIN MAIL"] :
          ["SCALE MAIL", "LEATHER"]
    }

    static getSkillProficiencies(spec: ChoiceArgs) {
        return Object.entries(spec.pc.skills).filter(skill => skill[1].proficient).map(skill => skill[0])
    }
}

interface ChoiceArgs {
    list?: string,
    level?: string,
    pc?: PlayerCharacter
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



