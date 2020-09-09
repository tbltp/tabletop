import 'jest-extended';

import { PlayerCharacter } from "../../src/Base/PlayerCharacter";
import { BarbarianArchetype } from "../../src/Classes/Archetypes";
import { Barbarian } from "../../src/Classes/Barbarian";

import * as ClassTraits from "../../Assets/ClassTraits.json";
import { LevelingParams } from '../../src/Classes/PlayerClass';

const BarbarianTraits = ClassTraits["BARBARIAN"];

describe('Barbarian Class', () => {

    let pc: PlayerCharacter;

    beforeEach(() => {
        pc = new PlayerCharacter(12,12,12,12,12,12);
    });

    describe('on initialization (Lvl 1):', () => {

        let bnClass: Barbarian;

        test('gains Rage and Unarmored Defense traits', () => {

            bnClass = new Barbarian([], []);
            bnClass.apply(pc);
            expect(pc.traits.features).toIncludeAllMembers(
                [BarbarianTraits[1]["UNARMORED DEFENSE"],
                BarbarianTraits[1]["RAGE"]]);
        });

        test('gains Rage resource trait', () => {

            bnClass = new Barbarian([], []);
            bnClass.apply(pc);
            expect(pc.traits.resources[0]).toContainValue("Rage");
        });

        test('gains proficiency in Simple and Martial weapons', () => {

            bnClass = new Barbarian([], []);
            bnClass.apply(pc);
            expect(pc.traits.weaponProficiencies).toIncludeAllMembers(
                ["Simple", "Martial"]
            );
        });

        test('gains proficiency in Light armor, Medium armor, and Shields', () => {

            bnClass = new Barbarian([], []);
            bnClass.apply(pc);
            expect(pc.traits.armorProficiencies).toIncludeAllMembers(
                ["Light", "Medium", "Shield"]
            );
        });

        test.skip('inventory is not implemented yet', () => {

        });

        test.skip('hit die is not implemented yet', () => {

        });
        
        test.skip('saving throw proficiency is not implemented yet', () => {

        });

    });
    
    describe('on leveling', () => {
        
        let bnClass: Barbarian;
        const bnArgs: LevelingParams[] = [
            {
                isNoInput: true
            },
            {
                isNoInput: true
            },
            {
                isNoInput: false,
                archetypeSelection: [{
                    archetype: 'TOTEM WARRIOR',
                    options: ['BEAR']
                }]
            },
            {
                isNoInput: false,
                abilityScoreImprovement: [
                    {
                        ability: 'strength',
                        improvement: 1
                    },
                    {
                        ability: 'constitution',
                        improvement: 1
                    }
                ]
            },
            {
                isNoInput: true
            },
            {
                isNoInput: false,
                archetypeSelection: [{
                    archetype: 'TOTEM WARRIOR',
                    options: ['BEAR']
                }]
            },
            {
                isNoInput: true
            },
            {
                isNoInput: false, 
                abilityScoreImprovement: [
                    {
                        ability: 'strength',
                        improvement: 1
                    },
                    {
                        ability: 'constitution',
                        improvement: 1
                    }
                ]
            },
            {
                isNoInput: true
            },
            {
                isNoInput: false,
                archetypeSelection: [{
                    archetype: 'TOTEM WARRIOR',
                    options: ['BEAR']
                }]
            },
            {
                isNoInput: true
            },
            {
                isNoInput: false, 
                abilityScoreImprovement: [
                    {
                        ability: 'strength',
                        improvement: 1
                    },
                    {
                        ability: 'constitution',
                        improvement: 1
                    }
                ]
            },
            {
                isNoInput: true
            },
            {
                isNoInput: false,
                archetypeSelection: [{
                    archetype: 'TOTEM WARRIOR',
                    options: ['BEAR']
                }]
            },
            {
                isNoInput: true
            },
            {
                isNoInput: false, 
                abilityScoreImprovement: [
                    {
                        ability: 'strength',
                        improvement: 1
                    },
                    {
                        ability: 'constitution',
                        improvement: 1
                    }
                ]
            },
            {
                isNoInput: true
            },
            {
                isNoInput: true
            },
            {
                isNoInput: false, 
                abilityScoreImprovement: [
                    {
                        ability: 'strength',
                        improvement: 1
                    },
                    {
                        ability: 'constitution',
                        improvement: 1
                    }
                ]
            },
            {
               isNoInput: true 
            }
        ]

        beforeEach(() => {
            bnClass = new Barbarian([], []);
        });

        describe('to Level 2', () => {
            
            beforeEach(() => {

                bnClass = new Barbarian([], []);
                bnClass.apply(pc);
            });

            test('gains Reckless Attack and Danger Sense traits', () => {

                bnClass.abilitiesAtLevels[2](pc, {
                    isNoInput: true
                });
                expect(pc.traits.features).toIncludeAllMembers(
                    [BarbarianTraits[2]["RECKLESS ATTACK"],
                    BarbarianTraits[2]["DANGER SENSE"]]);
            });
        });

        describe('to Level 3', () => {

            beforeEach(() => {

                bnClass = new Barbarian([], []);
                bnClass.apply(pc);
                bnClass.abilitiesAtLevels[2](pc, bnArgs[1]);
            });

            test('gets an increase in max Rages to 3', () => {
                bnClass.abilitiesAtLevels[3](pc, bnArgs[2]);
                expect(pc.findResourceTraitByName("Rage").resourceMax).toBe(3);
            });

            test('can select the Berserker archetype', () => {
                bnClass.abilitiesAtLevels[3](pc, {
                    isNoInput: false,
                    archetypeSelection: [{
                        archetype: "BERSERKER"
                    }]
                });
                expect(bnClass.primalPath).toBe("BERSERKER");
            });
            
            test('can select the Totem Warrior archetype', () => {

                bnClass.abilitiesAtLevels[3](pc, bnArgs[2]);
                expect(bnClass.primalPath).toBe("TOTEM WARRIOR");
            });

        });

        describe('to Level 4', () => {

        });

        describe('to Level 5', () => {

        });

        describe('to Level 6', () => {

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