import { Dragonborn } from '../Races/Dragonborn/Dragonborn';
import { Background } from '../Backgrounds/Background';
import { PlayerClass } from '../Classes/PlayerClass';
import { Barbarian } from '../Classes/Barbarian/Barbarian';
import { Criminal } from '../Backgrounds/Criminal';
import { Race } from '../Races/Race';
import { Choices } from './Choices';
var prompt = require('prompt-sync')();


const raceDict = {
    Dragonborn: Dragonborn    
}

const classDict = {
    Barbarian: Barbarian
}

const bgDict = {
    Criminal: Criminal
}

function createCharacter(){
    let race: Race = raceHandler();
    let pclass: PlayerClass;
    let background: Background;
}

// function pclassHandler() {
//     console.log(Choices.renderClassChoices());
//     let pclassParams = [];

//     let pclassSelection = prompt("Select Your Class.\n");
//     let pclassLevel = prompt("Enter level [1-20].\n");

//     for(let i = 1; i <= pclassLevel; i++) {
//         const choices = Choices.renderClassChoicesAtLevel(pclassSelection, pclassLevel);
//         console.log(choices);
//         for(const choice of choices) {
//             const selections = Choices.renderClassSelections(pclassSelection, pclassLevel, choice);
//             console.log(selections);
//             pclassParams[choice] = prompt("Choice?\n") 
//         }
//     }

//     const pclass = new classDict[pclassSelection](...pclassParams);
//     console.log(pclass);
//     return pclass;
// }


function raceHandler(){
    console.log(Choices.renderRaceChoices());
    let raceSelection = prompt("Select Your Race.\n");

    let raceParams = {};
    for(const selection of Choices.renderRaceSelectionChoices(raceSelection)){
        console.log(selection);
        raceParams[selection.prop] = prompt("Choice?\n");
    }

    const race = new raceDict[raceSelection](raceParams);

    return race;
}

function backgroundHandler(){
    console.log(Choices.renderBackgroundChoices());
    let bgSelection = prompt("Select Your Background.\n");

    let bgParams = {};
    for(const selection of Choices.renderBackgroundSelectionChoices(bgSelection)){
        console.log(selection);
        bgParams[selection.prop] = prompt("Choice?\n");
    }

    console.log(bgParams);
    const bg = new bgDict[bgSelection](bgParams);
    console.log(bg)

    return bg;
}

backgroundHandler();