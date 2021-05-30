import * as RaceChoices from "./Choice Build Specs/RaceChoices.json";
import * as BackgroundChoices from "./Choice Build Specs/BackgroundChoices.json";
import * as ClassChoices from "./Choice Build Specs/ClassChoices.json";
import * as SubclassChoices from "./Choice Build Specs/SubClassChoices.json";
import { CharacterSheet } from "../Base/CharacterSheet";
import { PlayerCharacter } from "../Base/PlayerCharacter";
import { Race } from "../Races/Race";
import { Background } from "../Backgrounds/Background";
import { PlayerClass } from "../Classes/PlayerClass";


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
    protected choiceDocs = {
        abilityScores: {str: 0, dex: 0, con: 0, int: 0, wis: 0, cha: 0},
        RACE: {},
        BACKGROUND: {},
        CLASS: {}
    }


    constructor() {
        //this.characterSheet = new CharacterSheet("");
        this.playerCharacter = null;
    }

    storeEmptyStage(property: string, choice: string): void {
       const reference: [string, ChoiceSpec][] = Object.entries(this.propertyRailroad[property][choice]);
       for(let ref of reference) {
            ref[1].choose > 1 ? this.choiceDocs[property][ref[0]] = [] : this.choiceDocs[property][ref[0]] = "" 
       }
       this.choiceDocs[property]["title"] = choice
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

    renderChoiceSpecs(property: string, choice: string, level?: number): [string, ChoiceSpec][] {
        return level != null ? 
            Object.entries(this.propertyRailroad[property][choice][`${level}`]) : 
            Object.entries(this.propertyRailroad[property][choice]);
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
}
