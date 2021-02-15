
import { ClassCreationParams, LevelingParams, PlayerClass } from '../Classes/PlayerClass';
import { bgDict, classDict, raceDict } from './ConstructorDefinitions';
import { Choices, ChoiceSpec } from './Choices';
import { CharacterSheet } from '../Base/CharacterSheet';
import { PlayerCharacter } from '../Base/PlayerCharacter';
import { Jsonify } from './Jsonify';
import { Race } from '../Races/Race';
import { Background } from '../Backgrounds/Background';
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
    const pc: PlayerCharacter = new PlayerCharacter(...scores);
    const race: Race = raceHandler();
    const bg: Background = backgroundHandler(pc);
    const pClass: PlayerClass = pclassHandler(pc);

    let sheet: CharacterSheet = new CharacterSheet(
        name,
        pc,
        race,
        pClass,
        bg
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


function promptChoice(key: string, selection: ChoiceSpec, resultObject: object, pc?: PlayerCharacter): void {
    //pass by reference
    for(let i = 0; i < selection['choose']; i++) {
        console.log(key, ':');
        if(selection['from']) {
            console.log(selection['from']);
            console.log("Choice?");
        } else {
            if(!pc) { let pc = null; }
            const choiceParams = Choices.convertToParams(selection , pc);
            console.log(selection['method']);
            const optionList = Choices.functionRailRoad[selection['method']](choiceParams);
            console.log(optionList);
            console.log("Choice?");
        }
        
        const userChoice = prompt(">");
        const paramType:string = typeof resultObject[key]; 
        if(paramType == "string") {
            resultObject[key] = userChoice
        }
        resultObject[key].push(userChoice); 
    }
}


function choiceHandler(choicesSet: [key: string, selection: ChoiceSpec][], resultObject: object, pc?: PlayerCharacter): void {
    //pass by reference
    for(const [key, selection] of choicesSet) {

        if(selection instanceof Array) {
            selection.forEach(choice => {
                promptChoice(key, choice, resultObject, pc);
            });
        }
        else if(Object.keys(selection).length !== 0) {

            promptChoice(key, selection, resultObject, pc);
        }
    }
}


function raceHandler(){
    console.log(Choices.renderRaceChoices());
    console.log("Select Your Race.")
    let raceSelection = prompt(">");

    let raceParams = {};
    const choicesSet = Choices.renderRaceSelectionChoices(raceSelection);
    choiceHandler(choicesSet, raceParams);

    console.log(raceParams);
    const race = new raceDict[raceSelection](raceParams);
    console.log(race);
    return race;
}

function backgroundHandler(pc: PlayerCharacter){
    console.log(Choices.renderBackgroundChoices());
    console.log("Select Your Background.")
    let bgSelection = prompt(">");

    let bgParams = {};
    const choicesSet = Choices.renderBackgroundSelectionChoices(bgSelection)
    choiceHandler(choicesSet, bgParams, pc);

    console.log(bgParams);
    const bg = new bgDict[bgSelection](bgParams);
    console.log(bg)

    return bg;
}


function pclassHandler(pc: PlayerCharacter) {
    console.log(Choices.renderClassChoices());
    console.log("Select Your Class.");
    let pclassSelection = prompt(">");

    let pclassInstance: PlayerClass = null;

    //assume no multiclassing for now
    let pclassParams: ClassCreationParams = {...defaultCreationParams(), multiclass: false };

    //creation
    const choicesSet = Choices.renderClassChoicesAtLevel(pclassSelection, 0);
    choiceHandler(choicesSet, pclassParams);
    
    console.log(pclassParams);
    pclassInstance = new classDict[pclassSelection](pclassParams);
    console.log(pclassInstance);
    return pclassInstance;
}


//createCharacter();
raceHandler();