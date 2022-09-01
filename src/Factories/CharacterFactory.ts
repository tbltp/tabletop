import { BaseCharacter, CharacterType, CharacterSize } from '../Character/BaseCharacter';
import { BaseCharacterData } from "./Interfaces";
import { BaseCharacterRules } from './BaseCharacterRules';
import {
    PlayerCharacter,
    NonPlayerCharacter,
} from "../Character/CharacterClasses";

export class CharacterFactory {
    /*
    Responsible for creating a new character object.  
    This factory holds state information:
        - The rules to apply to the character: 
            + Race
            + Class(es)
            + Background
        - The character data itself
            + Abilities
            + Levels
            + Equipment
            + etc etc
    */
    constructor() {
        this._character = null;
        this._charRuleSet = null;
    }

    private _character: BaseCharacter;
    private _charRuleSet: BaseCharacterRules;

    get character(): BaseCharacter {
        return this._character;
    }






    public createNewCharacter(
        size: CharacterSize,
        type: CharacterType
    ): void {
        /*
        Creates a new character from scratch
        */
        const baseData: BaseCharacterData = {
            size: size,
            type: type,
            abilityScores: {
                strength: {
                    name: "strength",
                    abbreviation: "str",
                    score: 1,
                },
                dexterity: {
                    name: "dexterity",
                    abbreviation: "dex",
                    score: 1,
                },
                constitution: {
                    name: "constitution",
                    abbreviation: "con",
                    score: 1,
                },
                intelligence: {
                    name: "intelligence",
                    abbreviation: "int",
                    score: 1,
                },
                wisdom: {
                    name: "wisdom",
                    abbreviation: "wis",
                    score: 1,
                },
                charisma: {
                    name: "charisma",
                    abbreviation: "cha",
                    score: 1,
                },
            },
        };
        this.loadCharacterFromData(baseData);
    }

    public loadCharacterFromData(
        data: BaseCharacterData
    ): void {
        /*
        Loads a character using deserialized data
        */
        switch (data.type) {
            case CharacterType.PC:
                this._character = new PlayerCharacter(data);
                break;
            case CharacterType.NPC:
                this._character = new NonPlayerCharacter(data);
                break;
            default:
                return undefined;
        }
    }
}
