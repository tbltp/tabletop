import { Dragonborn } from '../Races/Dragonborn/Dragonborn';
import { Background } from '../Backgrounds/Background';
import { ClassCreationParams, PlayerClass } from '../Classes/PlayerClass';
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
    let pclass: PlayerClass = pclassHandler();
    let background: Background = backgroundHandler();
}

function pclassHandler() {
    console.log(Choices.renderClassChoices());
    console.log("Select Your Class.");
    let pclassSelection = prompt(">");
    console.log("Enter level [1-20].");
    let pclassLevel = prompt(">");



    let pclassParams: ClassCreationParams = { multiclass: false };
    for(let i = 1; i <= pclassLevel; i++) {
        const choicesSet = Choices.renderClassChoicesAtLevel(pclassSelection, pclassLevel);
        for(const [key, selection] of choicesSet) {
            console.log(key, ':');
            console.log(selection);
            console.log("Choice?");
            
            const userChoice = prompt(">");
            type paramType = 
            console.log(paramType);
            if(paramType == "string") {
                pclassParams[key] = userChoice
            }
            pclassParams[key].push(userChoice); 
        }
    }
    console.log(pclassParams);
    const pclass = new classDict[pclassSelection](pclassParams);
    console.log(pclass);
    return pclass;
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

//raceHandler();
//backgroundHandler();
pclassHandler();