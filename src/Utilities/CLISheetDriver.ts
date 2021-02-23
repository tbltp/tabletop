import {
  ClassCreationParams,
  LevelingParams,
  PlayerClass,
} from "../Classes/PlayerClass";
import { SubclassParams } from "../Classes/Subclass";
import { bgDict, classDict, raceDict } from "./ConstructorDefinitions";
import { Choices, ChoiceSpec } from "./Choices";
import { CharacterSheet } from "../Base/CharacterSheet";
import { PlayerCharacter } from "../Base/PlayerCharacter";
import { Jsonify } from "./Jsonify";
import { Race, RaceParams } from "../Races/Race";
import { Background, BackgroundParams } from "../Backgrounds/Background";
import { FeatParams } from "Feats/Feat";
var prompt = require("prompt-sync")({ sigint: true });

function defaultRaceParams(): RaceParams {
  return {
    draconicAncestry: "",
    toolProficiency: "",
    abilityScores: [],
    skillProficiencies: [],
    language: "",
    cantrip: "",
    feat: "",
  };
}

function defaultBackgroundParams(): BackgroundParams {
  return {
    languages: [],
    holySymbol: "",
    gamingSet: "",
    toolProficiencies: [],
    instrument: "",
    toolKit: "",
  };
}

function defaultLevelingParams(): LevelingParams {
  return {
    isNoInput: true,
    abilityScoreImprovement: {
      abilities: [],
      value: "",
    },
    spellSelections: {
      add: [],
      remove: "",
    },
    proficiencySelection: [],
    toolProficiency: "",
    fightingStyles: [],
    subclassParams: defaultSubclassParams(),
    featParams: defaultFeatParams(),
  };
}

function defaultSubclassParams(): SubclassParams {
  return {
    name: "",
    spellSelections: {
      add: [],
      remove: "",
    },
    skillProficiencies: [],
    weapons: [],
    toolProficiencies: [],
    fightingStyles: [],
    languages: [],
    savingThrows: [],
  };
}

function defaultFeatParams(): FeatParams {
  return {
    name: "",
    abilityScore: "",
    spellClass: "",
    spells: [],
    languages: [],
    skills: [],
    tools: [],
    weaponProficiencies: [],
    element: "",
    maneuvers: [],
  };
}

function defaultCreationParams(): ClassCreationParams {
  return {
    multiclass: false,
    skillProficiencies: [],
    instrumentProficiencies: [],
    weapons: [],
    armor: [],
    toolProficiencies: [],
    equipmentPack: "",
    instrument: "",
    holySymbol: "",
    arcaneFocus: "",
    druidicFocus: "",
  };
}

function createCharacter() {
  console.log(
    "Welcome to Tbltp's DND Character Sheet Creator!\nEnter a character name:"
  );
  const name = prompt(">");
  const scores = promptAbilityScores();
  const pc: PlayerCharacter = new PlayerCharacter(...scores);
  const race: Race = raceHandler();
  const bg: Background = backgroundHandler(pc);
  const pClass: PlayerClass = pclassHandler(pc);

  let sheet: CharacterSheet = new CharacterSheet(name, pc, race, pClass, bg);
  levelHandler(sheet);
  Jsonify.dumpToJSON(sheet, `test-${name}`);
}

function promptAbilityScores(): [
  number,
  number,
  number,
  number,
  number,
  number
] {
  const scores: string[] = [
    "Strength",
    "Dexterity",
    "Constitution",
    "Intelligence",
    "Wisdom",
    "Charisma",
  ];
  const values: [number, number, number, number, number, number] = [
    0,
    0,
    0,
    0,
    0,
    0,
  ];
  const scoreRange = [...Array(20).keys()].map((l) => l + 1 + "");

  Object.entries(scores).forEach(([ind, scoreName]) => {
    let scorePrompt = `Enter score for ${scoreName} (1-20):`;
    values[ind] = +getInput(scoreRange, scorePrompt);
  });
  return values;
}

function getInput(choiceList: string[], userQ?: string): string {
  let invalid: boolean = true;
  let userChoice: string = "";
  const upperList = choiceList.map((ch) => ch.toUpperCase());
  const invMsg = `Invalid choice entered.  To skip this choice, enter nothing.  To quit the build, enter ^C (Ctrl+c).`;
  while (invalid) {
    if (userQ) console.log(userQ);
    console.log(
      upperList.sort((a, b) => a.localeCompare(b, "en", { numeric: true }))
    );
    console.log("Choice?");
    userChoice = prompt(">");

    let match: string = choiceList.find(
      (c) => c.toUpperCase() == userChoice.trim().toUpperCase()
    );
    if (match || !userChoice) {
      return match ? match : "";
    } else {
      console.log(invMsg);
    }
  }
}

function promptChoice(
  key: string,
  selection: ChoiceSpec,
  resultObject: object,
  pc?: PlayerCharacter
): void {
  //pass by reference
  for (let i = 0; i < selection["choose"]; i++) {
    const description = `${selection["alias"]} (${i + 1} of ${
      selection["choose"]
    }):`;
    let choices: string[] = [];
    if (selection["from"]) {
      choices = selection["from"];
    } else {
      const choiceParams = Choices.convertToParams(selection, pc);
      choices = Choices.functionRailRoad[selection["method"]](choiceParams);
    }
    const userChoice = getInput(choices, description);
    if (!userChoice) continue;
    const paramType: string = typeof resultObject[key];
    if (paramType == "string") {
      resultObject[key] = userChoice;
    } else {
      resultObject[key].push(userChoice);
    }
  }
}

function choiceHandler(
  choicesSet: [key: string, selection: ChoiceSpec][],
  resultObject: object,
  pc?: PlayerCharacter
): void {
  //pass by reference
  for (const [key, selection] of choicesSet) {
    if (key.includes(`Selection`)) {
      if (key == "subclassSelection") {
        //subclass selection
        promptChoice("name", selection, resultObject["subclassParams"], pc);
      } else {
        //spells, battle maneuvers, elemental disciplines, eldritch invocations
        const spellChoiceSet: [
          key: string,
          selection: ChoiceSpec
        ][] = Object.entries(selection);
        const spellChoiceResult = resultObject[key];
        choiceHandler(spellChoiceSet, spellChoiceResult, pc);
      }
    } else if (selection instanceof Array) {
      if (key == "or") {
        //or - meaning you pick between categories, then you select within them
        selection.forEach((category) => {
          const description = `${category["alias"]} (choose category):`;
          const choices = Object.keys(category["categories"]);
          const userChoice = getInput(choices, description);
          const categorySelection: ChoiceSpec =
            category["categories"][userChoice];
          choiceHandler([[userChoice, categorySelection]], resultObject, pc);
        });
      } else if (key == "and") {
        //and - meaning you pick between categories as a choice, and then use that choice later
        selection.forEach((category) => {
          const description = `${category["alias"]} (choose category):`;
          const choices = Object.keys(category["categories"]);
        });
      } else {
        selection.forEach((choice) => {
          promptChoice(key, choice, resultObject, pc);
        });
      }
    } else if (Object.keys(selection).length !== 0) {
      promptChoice(key, selection, resultObject, pc);
    }
  }
}

function raceHandler() {
  const raceSelection = getInput(
    Choices.renderRaceChoices(),
    "Select your Race:"
  );

  let raceParams = defaultRaceParams();
  const choicesSet = Choices.renderRaceSelectionChoices(raceSelection);
  choiceHandler(choicesSet, raceParams);

  //console.log(raceParams);
  const race = new raceDict[raceSelection](raceParams);
  //console.log(race);
  return race;
}

function backgroundHandler(pc: PlayerCharacter) {
  const bgSelection = getInput(
    Choices.renderBackgroundChoices(),
    "Select your Background:"
  );

  let bgParams = defaultBackgroundParams();
  const choicesSet = Choices.renderBackgroundSelectionChoices(bgSelection);
  choiceHandler(choicesSet, bgParams, pc);

  //console.log(bgParams);
  const bg = new bgDict[bgSelection](bgParams);
  //console.log(bg)

  return bg;
}

function pclassHandler(pc: PlayerCharacter) {
  const pclassSelection = getInput(
    Choices.renderClassChoices(),
    "Select your starting Class:"
  );

  //assume no multiclassing for now
  let pclassParams: ClassCreationParams = {
    ...defaultCreationParams(),
    multiclass: false,
  };

  const choicesSet = Choices.renderClassChoicesAtLevel(pclassSelection, 0);
  choiceHandler(choicesSet, pclassParams, pc);

  //console.log(pclassParams);
  const pclassInstance = new classDict[pclassSelection](pclassParams);
  //console.log(pclassInstance);
  return pclassInstance;
}

function levelHandler(sheet: CharacterSheet) {
  const pClass: PlayerClass = Object.values(sheet.playerClasses)[0];
  const pClassName: string = pClass.name;

  const levelPrompt = `Select level to go up to in ${pClass.name} (1-20):`;
  const levelRange = [...Array(20).keys()].map((l) => l + 1 + "");
  const level = getInput(levelRange, levelPrompt);
  const asifLevels: number[] = [4, 8, 12, 16, 19];

  for (let i = 1; i <= +level; i++) {
    console.log(`---${pClassName} Level ${i}---`);
    let pc: PlayerCharacter = sheet.character;
    let hpAdd: number = 0;
    if (i != 1) {
      //bonus hp
      console.log("Enter amount of HP to increase:");
      hpAdd = +prompt(">");
    }
    let levelParams: LevelingParams = defaultLevelingParams();
    const classChoiceSet = Choices.renderClassChoicesAtLevel(pClassName, i);
    choiceHandler(classChoiceSet, levelParams, pc);

    //subclass handling
    let subclassName: string = "";
    if (pClass.subclass) {
      subclassName = pClass.subclass.name;
    } else if (levelParams["subclassParams"]["name"]) {
      subclassName = levelParams["subclassParams"]["name"];
    }
    const subclassChoiceSet = Choices.renderSubclassChoices(subclassName, i);
    choiceHandler(subclassChoiceSet, levelParams, pc);

    if(asifLevels.includes(i)) {
        asiOrFeatHandler(sheet, levelParams);
    }

    //console.log(levelParams);
    sheet.levelUp(pClassName, hpAdd, levelParams);
  }
}

function asiOrFeatHandler(sheet: CharacterSheet, levelParams: LevelingParams) {
  const asifPrompt = `Choose between Ability Score Improvement or Feat Choice:`;
  const asifChoices = [`Ability Score`, `Feat`];
  const asif = getInput(asifChoices, asifPrompt);

  if (asif == "Feat") {

    const featSelection = getInput(
        Choices.renderFeatChoices(),
        "Select a Feat:"
      );
    levelParams.featParams["name"] = featSelection;
    const featChoiceSet = Choices.renderFeatSelectionChoices(featSelection);
    choiceHandler(featChoiceSet, levelParams["featParams"], sheet.character);
  } else {
    const asiChoiceSet = Choices.renderAbilityScoreChoices();
    choiceHandler(asiChoiceSet, levelParams["abilityScoreImprovement"]);
    levelParams["abilityScoreImprovement"]["abilities"].length == 1
      ? (levelParams["abilityScoreImprovement"]["value"] = "2")
      : (levelParams["abilityScoreImprovement"]["value"] = "1");
  }
}

function testSubclasses() {
  const pc: PlayerCharacter = new PlayerCharacter(14, 14, 14, 14, 14, 14);
  const rc: Race = new raceDict["Tiefling"]();
  const bg: Background = new bgDict["Charlatan"]();
  const cls: PlayerClass = pclassHandler(pc);
  const sheet: CharacterSheet = new CharacterSheet("Test", pc, rc, cls, bg);
  levelHandler(sheet);

  Jsonify.dumpToJSON(sheet, `Test`);
}

function testASI() {
    const pc: PlayerCharacter = new PlayerCharacter(14, 14, 14, 14, 14, 14);
    const rc: Race = new raceDict["Tiefling"]();
    const bg: Background = new bgDict["Charlatan"]();
    const cls: PlayerClass = new classDict["Barbarian"]({
        multiclass: false,
        skillProficiencies: [ "athletics", "intimidation"],
        weapons: [ "GREATAXE", "CLUB"]
    });
    const sheet: CharacterSheet = new CharacterSheet("Test", pc, rc, cls, bg);
    levelHandler(sheet);
  
    Jsonify.dumpToJSON(sheet, `Test`);
  }

//createCharacter();
testASI();
