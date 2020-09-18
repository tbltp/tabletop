import 'jest-extended';

import { PlayerCharacter } from "../../src/Base/PlayerCharacter";
import { BardArchetype } from "../../src/Classes/Archetypes";
import { Bard, BardLevelingParams } from "../../src/Classes/Bard";

import * as ClassTraits from "../../Assets/ClassTraits.json";

const BardTraits = ClassTraits["BARD"];


describe('Bard Class', () => {

    let pc: PlayerCharacter;

    beforeEach(() => {
        pc = new PlayerCharacter(12,12,12,12,12,12);
    });

    describe('on initialization (Lvl 1):', () => {

        let bdClass: Bard;

        beforeEach(() => {
            bdClass = new Bard([], [], [], "", "ENTERTAINER", {
                isNoInput: false, 
                spellSelection: [
                    "VICIOUS MOCKERY",
                    "DANCING LIGHTS",
                    "CHARM PERSON",
                    "BANE",
                    "HEALING WORD",
                    "THUNDERWAVE"
                ]
            });
            bdClass.apply(pc);
        })

        test('gains Bardic Inspiration feature trait', () => {

            expect(pc.findFeatureTraitByName("Bardic Inspiration")).toBeTruthy();
         });

        test('gains Bardic Inspiration resource trait', () => {

            expect(pc.findResourceTraitByName("Bardic Inspiration")).toBeTruthy(); 
        });

        test('gains proficiency in Simple weapons, as well as in the Hand Crossbow, Longsword, Rapier, and Shortsword', () => {
            
            expect(pc.traits.weaponProficiencies).toIncludeAllMembers(
                ["Simple", "Crossbow, hand", "Longsword", "Rapier", "Shortsword"]
            );
        });

        test('gains proficiency in Light armor', () => {

            expect(pc.traits.armorProficiencies).toIncludeAllMembers(
                ["Light"]
            );
        });

        test.skip('inventory is not implemented yet', () => {

        });

        test.skip('hit point max is not implemented yet', () => {

        });

        test.skip('hit die is not implemented yet', () => {

        });
        
        test.skip('saving throw proficiency is not implemented yet', () => {

        });

    });
    
    describe('on leveling', () => {

        let bdClass: Bard;
        const bdArgs: BardLevelingParams[] = [
            {
                isNoInput: false,
                spellSelection: [
                    "VICIOUS MOCKERY",
                    "DANCING LIGHTS",
                    "CHARM PERSON",
                    "BANE",
                    "HEALING WORD",
                    "THUNDERWAVE"
                ]
            },
            
        ];

        describe('to Level 2', () => {

        });

        describe('to Level 3', () => {

            describe('with College of Lore archetype', () => {

            });

            describe('with College of Valor archetype', () => {

            });
        });

        describe('to Level 4', () => {

        });

        describe('to Level 5', () => {

        });

        describe('to Level 6', () => {

            describe('with College of Lore archetype', () => {

            });

            describe('with College of Valor archetype', () => {

            });
        });

        describe('to Level 7', () => {

        });

        describe('to Level 8', () => {

        });

        describe('to Level 9', () => {

        });

        describe('to Level 10', () => {

        });

        describe('to Level 11', () => {

        });

        describe('to Level 12', () => {

        });

        describe('to Level 13', () => {

        });

        describe('to Level 14', () => {
            
            describe('with College of Lore archetype', () => {

            });

            describe('with College of Valor archetype', () => {

            });
        });

        describe('to Level 15', () => {

        });

        describe('to Level 16', () => {

        });
        
        describe('to Level 17', () => {

        });

        describe('to Level 18', () => {

        });

        describe('to Level 19', () => {

        });

        describe('to Level 20', () => {

        });
    });
});
