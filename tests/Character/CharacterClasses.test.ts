import { BaseCharacterData } from "../../src/Factories/Interfaces";
import { CharacterType } from "../../src/Character/BaseCharacter";
import {
    PlayerCharacter,
    NonPlayerCharacter,
} from "../../src/Character/CharacterClasses";

describe("PlayerCharacter", () => {
    let data: BaseCharacterData;
    let character: PlayerCharacter;
    beforeEach(() => {
        data = {
            size: "fakesize",
            type: CharacterType.NPC,
            abilityScores: {},
        };
        character = new PlayerCharacter(data);
    });

    it("maintains a character type of PC", () => {
        expect(character.type).toBe(CharacterType.PC);
    });
});

describe("NonPlayerCharacter", () => {
    let data: BaseCharacterData;
    let character: NonPlayerCharacter;
    beforeEach(() => {
        data = {
            size: "fakesize",
            type: CharacterType.NPC,
            abilityScores: {},
        };
        character = new NonPlayerCharacter(data);
    });

    it("maintains a character type of NPC", () => {
        expect(character.type).toBe(CharacterType.NPC);
    });
});
