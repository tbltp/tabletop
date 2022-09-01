import { CharacterType, AbilityScore } from "../../src/Character/BaseCharacter";
import { BaseCharacterData } from "../../src/Factories/Interfaces";
import { CharacterFactory } from "../../src/Factories/CharacterFactory";
import {
    NonPlayerCharacter,
    PlayerCharacter,
} from "../../src/Character/CharacterClasses";
describe("CharacterFactory", () => {
    beforeEach(() => {});

    it("Creates a PlayerCharacter", () => {
        const character = CharacterFactory.createNewCharacter(
            "small",
            CharacterType.PC
        );
        expect(character instanceof PlayerCharacter);
    });

    it("Creates a NonPlayercharacter", () => {
        const character = CharacterFactory.createNewCharacter(
            "small",
            CharacterType.NPC
        );
        expect(character instanceof NonPlayerCharacter);
    });

    it("Creates a Character with default BaseCharacter attributes", () => {
        const character = CharacterFactory.createNewCharacter(
            "small",
            CharacterType.PC
        );
        const scoreNames = character.listAbilityScores();
        expect(scoreNames).toHaveLength(6);
        expect(scoreNames).toEqual(
            expect.arrayContaining([
                "strength",
                "dexterity",
                "constitution",
                "intelligence",
                "wisdom",
                "charisma",
            ])
        );
        expect(character.findAbilityScore("banana")).toBeUndefined();
        const strength = character.findAbilityScore("strength");
        expect(strength).toBeDefined();
        const confirmedStr = strength as AbilityScore;
        expect(confirmedStr.score).toEqual(1);
        expect(confirmedStr.modifier).toEqual(-5);
    });
});
