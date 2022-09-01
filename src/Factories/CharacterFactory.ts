import { BaseCharacter, CharacterType } from "../Character/BaseCharacter";
import { BaseCharacterData } from "./Interfaces";
import {
    PlayerCharacter,
    NonPlayerCharacter,
} from "../Character/CharacterClasses";

export class CharacterFactory {
    /*
    Responsible for creating a new character object
    */
    public static createNewCharacter(
        size: string,
        type: CharacterType
    ): BaseCharacter {
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

        return CharacterFactory.loadCharacterFromData(baseData);
    }

    public static loadCharacterFromData(
        data: BaseCharacterData
    ): BaseCharacter | undefined {
        /*
        Loads a character using deserialized data
        */
        switch (data.type) {
            case CharacterType.PC:
                return new PlayerCharacter(data);
            case CharacterType.NPC:
                return new NonPlayerCharacter(data);
            default:
                return undefined;
        }
    }
}
