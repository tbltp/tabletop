import { BaseCharacterData, BaseCharacterRules } from "../../src/Factories/Interfaces";
import { CharacterSize, CharacterType } from "../../src/Character/BaseCharacter";
import { RuledCharacter } from '../../src/Character/CharacterClasses';
import {
    PlayerCharacter,
    NonPlayerCharacter,
} from "../../src/Character/CharacterClasses";

describe("RuledCharacter", () => {
    let data: BaseCharacterData;
    let character: PlayerCharacter;
    let rules: BaseCharacterRules;

    beforeEach(() => {
        rules = {
            allowedAbilities: [
                "strength",
                "intelligence",
            ],
            linkedHealthAbility: "strength"
        };
    });

    describe("common class functionality", () => {
        
        beforeEach(() => {
            data = {
                size: CharacterSize.DIMINUITIVE,
                type: CharacterType.NPC,
                abilityScores: {
                    "strength": {
                        name: "strength",
                        abbreviation: "str", 
                        score: 12
                    },
                    "nonsense": {
                        name: "nonsense",
                        abbreviation: "non",
                        score: 12
                    },
                },
            };
            character = new RuledCharacter(data, rules);
        });
    
        it("corrects ability score data according to rules", () => { 
            expect(character.listAbilityScores().sort()).toEqual(["intelligence", "strength"]);
        });

        it("sets ability score data", () => {
            expect(character.findAbilityScore("strength")?.modifier).toEqual(1);
            expect(character.findAbilityScore("intelligence")?.modifier).toEqual(-5);
        })
    });



    describe("child class PlayerCharacter", () => {

        beforeEach(() => {
            data = {
                size: CharacterSize.DIMINUITIVE,
                type: CharacterType.NPC,
                abilityScores: {},
            };
            character = new PlayerCharacter(data, rules);
        });
    
        it("maintains a character type of PC", () => {
            expect(character.type).toBe(CharacterType.PC);
        });
    });
    
    describe("child class NonPlayerCharacter", () => {
        let data: BaseCharacterData;
        let character: NonPlayerCharacter;
        beforeEach(() => {
            data = {
                size: CharacterSize.DIMINUITIVE,
                type: CharacterType.NPC,
                abilityScores: {},
            };
            character = new NonPlayerCharacter(data, rules);
        });
    
        it("maintains a character type of NPC", () => {
            expect(character.type).toBe(CharacterType.NPC);
        });
    });
    

});



