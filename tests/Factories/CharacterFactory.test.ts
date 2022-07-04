import { CharacterType } from '../../src/Character/BaseCharacter';
import { BaseCharacterData } from '../../src/Factories/Interfaces';
import { CharacterFactory } from '../../src/Factories/CharacterFactory';
import { NonPlayerCharacter, PlayerCharacter } from '../../src/Character/CharacterClasses';
describe("CharacterFactory", () => {

    let data: BaseCharacterData;
    beforeEach(() => {
        data = {
            size: "fakesize",
            type: CharacterType.NPC,
            abilityScores: {}
        };
    });

    it('Creates a PlayerCharacter', () => {
        data.type = CharacterType.PC;
        const character = CharacterFactory.createCharacter(data);
        expect(character instanceof PlayerCharacter);
    });

    it('Creates a NonPlayercharacter', () => {
        data.type = CharacterType.NPC;
        const character = CharacterFactory.createCharacter(data);
        expect(character instanceof NonPlayerCharacter);
    });
});