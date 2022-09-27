import { SheetFactory } from "../../src/Factories/SheetFactory";
import { resolve } from "path";
import { AbilityScore } from '../../src/Character/BaseCharacter';
import {
    CharacterType,
    BaseCharacter,
} from "../../src/Character/BaseCharacter";

describe("SheetFactory", () => {
    it("should create sheet data from a file with default rules", () => {
        const sf = new SheetFactory();
        const dataPath: string = resolve(__dirname, "./data/C1.json");
        const character: BaseCharacter = sf.deserializeFile(dataPath);
        expect(character.size).toEqual("medium");
        expect(character.type).toEqual(CharacterType.PC);
        expect(character.listAbilityScores().sort()).toEqual([
            "charisma",
            "constitution",
            "dexterity",
            "intelligence",
            "strength",
            "wisdom",
        ]);
        const intelligence = character.findAbilityScore('intelligence');
        expect(intelligence).not.toBeNull();
        expect((intelligence as AbilityScore).modifier).toBeGreaterThan(0);
    });

    it("should create sheet data from a file with custom rules", () => {
        const sf = new SheetFactory();
        const dataPath: string = resolve(__dirname, "./data/C1.json");
        const rulesPath: string = resolve(__dirname, "./data/R1.json");
        const character: BaseCharacter = sf.deserializeFile(dataPath, rulesPath);
        expect(character.size).toEqual("medium");
        expect(character.type).toEqual(CharacterType.PC);
        expect(character.listAbilityScores().sort()).toEqual([
            "constitution",
            "dexterity",
            "intelligence",
            "strength",
        ]);
        const intelligence = character.findAbilityScore('intelligence');
        expect(intelligence).not.toBeNull();
        expect((intelligence as AbilityScore).modifier).toBeGreaterThan(0);
    });
});
