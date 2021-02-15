import { Background } from '../Backgrounds/Background';
import { ClassCreationParams, LevelingParams, PlayerClass } from '../Classes/PlayerClass';
import { Barbarian } from '../Classes/Barbarian/Barbarian';
import { Criminal } from '../Backgrounds/Criminal';
import { Race } from '../Races/Race';
import { Choices, ChoiceSpec } from './Choices';
import { CharacterSheet } from '../Base/CharacterSheet';
import { PlayerCharacter } from '../Base/PlayerCharacter';
import { Jsonify } from './Jsonify';
var prompt = require('prompt-sync')();



function defaultLevelingParams(): LevelingParams {
    return {
        isNoInput: true,
        abilityScoreImprovement: [],
        spellSelections: {
            add: [],
            remove: ""
        },
        proficiencySelection: [],
        toolProficiency: "",
        fightingStyle: [],
        subclassSelection: {
            subclass: "",
            options: []
        },
        featChoice: null
    };
}


function defaultCreationParams(): ClassCreationParams {

    let defaultLevelParams = defaultLevelingParams();
    return {
        multiclass: false,
        skillProficiencies: [],
        instrumentProficiencies: [],
        firstLevelParams: defaultLevelParams,
        weapons: [],
        armor: [],
        toolProficiencies: [],
        equipmentPack: "",
        instrument: "",
        holySymbol: "",
        arcaneFocus: "",
        druidicFocus: ""
    };
}



function createCharacter(){

    console.log("Welcome to Tbltp's DND Character Sheet Creator!\nEnter a character name:");
    const name = prompt(">");
    const scores = promptAbilityScores();
    let sheet: CharacterSheet = new CharacterSheet(
        name,
        new PlayerCharacter(...scores),
        raceHandler(),
        pclassHandler(),
        backgroundHandler()
    )

    Jsonify.dumpToJSON(sheet, `test-${name}`);
}

function promptAbilityScores(): [number, number, number, number, number, number] {
    const scores: string[] = [
        "Strength",
        "Dexterity",
        "Constitution",
        "Intelligence",
        "Wisdom",
        "Charisma"
    ];
    const values: [number, number, number, number, number, number] = [0,0,0,0,0,0];
    Object.entries(scores).forEach(([ind, scoreName]) => {
        console.log("Enter", scoreName, "(1-20):");
        values[ind] = +(prompt(">"));  
    });
    return values;
}


function promptChoice(key: string, selection: ChoiceSpec, resultObject: object): void {
    //pass by reference
    for(let i = 0; i < selection['choose']; i++) {
        console.log(key, ':');
        console.log(selection);
        console.log("Choice?");
        
        const userChoice = prompt(">");
        const paramType:string = typeof resultObject[key]; 
        if(paramType == "string") {
            resultObject[key] = userChoice
        }
        resultObject[key].push(userChoice); 
    }
}


function choiceHandler(choicesSet: [key: string, selection: ChoiceSpec][], resultObject: object): void {
    //pass by reference
    for(const [key, selection] of choicesSet) {

        if(selection instanceof Array) {
            selection.forEach(choice => {
                promptChoice(key, choice, resultObject);
            });
        }
        else if(Object.keys(selection).length !== 0) {

            promptChoice(key, selection, resultObject);
        }
    }
}


function pclassHandler() {
    console.log(Choices.renderClassChoices());
    console.log("Select Your Class.");
    let pclassSelection = prompt(">");
    console.log("Enter level [1-20].");
    let pclassLevel = prompt(">");

    let pclassInstance: PlayerClass = null;

    //assume no multiclassing for now
    let pclassParams: ClassCreationParams = {...defaultCreationParams(), multiclass: false };
    for(let i = 0; i <= pclassLevel; i++) {
        
        const choicesSet = Choices.renderClassChoicesAtLevel(pclassSelection, i);
        if(i == 0) {
            //creation will always have decisions
            choiceHandler(choicesSet, pclassParams)
        }
        else {
            if(i == 1) {
                //creation first level (meh)
                choiceHandler(choicesSet, pclassParams["firstLevelParams"]);
                console.log(pclassParams);
                pclassInstance = new classDict[pclassSelection](pclassParams);
                console.log(pclassInstance);
            }
            else {
                //other levels
            }
        }

    }

    return pclassInstance;
}


function raceHandler(){
    console.log(Choices.renderRaceChoices());
    console.log("Select Your Race.")
    let raceSelection = prompt(">");

    let raceParams = {};
    for(const [key, selection] of Choices.renderRaceSelectionChoices(raceSelection)){
        console.log(key, ':');
        console.log(selection);
        console.log("Choice?")
        raceParams[key] = prompt(">");
    }
    console.log(raceParams);
    const race = new raceDict[raceSelection](raceParams);
    console.log(race);
    return race;
}

function backgroundHandler(){
    console.log(Choices.renderBackgroundChoices());
    console.log("Select Your Background.")
    let bgSelection = prompt(">");

    let bgParams = {};
    for(const [key, selection] of Choices.renderBackgroundSelectionChoices(bgSelection)){
        console.log(key, ':');
        console.log(selection);
        console.log("Choice?");
        bgParams[key] = prompt(">");
    }

    console.log(bgParams);
    const bg = new bgDict[bgSelection](bgParams);
    console.log(bg)

    return bg;
}

createCharacter();