import { CharacterType, AbilityScore, CharacterSize } from "../../src/Character/BaseCharacter";
import { CharacterFactory } from '../../src/Factories/CharacterFactory';
import {
    NonPlayerCharacter,
    PlayerCharacter,
} from "../../src/Character/CharacterClasses";
describe("CharacterFactory", () => {
    let cf: CharacterFactory;

    beforeEach(() => {
        cf = new CharacterFactory();
        cf.charRuleSet = {
            allowedAbilities: [
                "strength",
                "constitution",
                "flexibility",
            ],
            linkedHealthAbility: "constitution",
        };
    });

    it("Creates a PlayerCharacter", () => {
        cf.createNewCharacter(
            CharacterSize.SMALL,
            CharacterType.PC
        );
        expect(cf.character instanceof PlayerCharacter);
    });

    it("Creates a NonPlayercharacter", () => {
        cf.createNewCharacter(
            CharacterSize.SMALL,
            CharacterType.NPC
        );
        expect(cf.character instanceof NonPlayerCharacter);
    });

    it("Creates a Character according to set rules", () => {
        cf.createNewCharacter(
            CharacterSize.SMALL,
            CharacterType.PC
        );
        const character: PlayerCharacter = cf.character;
        const scoreNames = character.listAbilityScores();
        expect(scoreNames).toHaveLength(3);
        expect(scoreNames).toEqual(
            expect.arrayContaining([
                "strength",
                "constitution",
                "flexibility",
            ])
        );
        expect(character.findAbilityScore("intelligence")).toBeUndefined();
        const strength = character.findAbilityScore("strength");
        expect(strength).toBeDefined();
        const confirmedStr = strength as AbilityScore;
        expect(confirmedStr.score).toEqual(1);
        expect(confirmedStr.modifier).toEqual(-5);
    });
});
