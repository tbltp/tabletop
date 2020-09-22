import 'jest-extended';

import { PlayerClass, SpellSlotFactory } from "../../src/Classes/PlayerClass";
import { PlayerCharacter } from "../../src/Base/PlayerCharacter";
import { BardArchetype } from "../../src/Classes/Archetypes";
import { Bard, BardLevelingParams } from "../../src/Classes/Bard";

import * as ClassTraits from "../../Assets/ClassTraits.json";

const BardTraits = ClassTraits["BARD"];


describe('Bard Class', () => {

    let pc: PlayerCharacter;
    const spellSlotsByLevel: {[key: string]: number[]} = {
        '1' : [2, 0, 0, 0, 0, 0, 0, 0, 0],
        '2' : [3, 0, 0, 0, 0, 0, 0, 0, 0],
        '3' : [4, 2, 0, 0, 0, 0, 0, 0, 0],
        '4' : [4, 3, 0, 0, 0, 0, 0, 0, 0],
        '5' : [4, 3, 2, 0, 0, 0, 0, 0, 0],
        '6' : [4, 3, 3, 0, 0, 0, 0, 0, 0],
        '7' : [4, 3, 3, 1, 0, 0, 0, 0, 0],
        '8' : [4, 3, 3, 2, 0, 0, 0, 0, 0],
        '9' : [4, 3, 3, 3, 1, 0, 0, 0, 0],
        '10': [4, 3, 3, 3, 2, 0, 0, 0, 0],
        '11': [4, 3, 3, 3, 2, 1, 0, 0, 0],
        '12': [4, 3, 3, 3, 2, 1, 0, 0, 0],
        '13': [4, 3, 3, 3, 2, 1, 1, 0, 0],
        '14': [4, 3, 3, 3, 2, 1, 1, 0, 0],
        '15': [4, 3, 3, 3, 2, 1, 1, 1, 0],
        '16': [4, 3, 3, 3, 2, 1, 1, 1, 0],
        '17': [4, 3, 3, 3, 2, 1, 1, 1, 1],
        '18': [4, 3, 3, 3, 3, 1, 1, 1, 1],
        '19': [4, 3, 3, 3, 3, 2, 1, 1, 1],
        '20': [4, 3, 3, 3, 3, 2, 2, 1, 1],
    };

    beforeEach(() => {
        pc = new PlayerCharacter(12,12,12,12,12,12);
    });

    describe('on initialization (Level 1):', () => {

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

        test('gains the Bardic Inspiration feature trait', () => {
            expect(pc.findFeatureTraitByName("Bardic Inspiration")).toBeTruthy();
         });

        test('gains the Bardic Inspiration resource trait', () => {
            expect(pc.findResourceTraitByName("Bardic Inspiration")).toBeTruthy(); 
        });

        test('gains two Level 1 spell slots', () => {
            expect(SpellSlotFactory.countAllPlayerSpellSlots(pc)).toStrictEqual(
                spellSlotsByLevel[1]
            );
        });

        test('learns two cantrips', () => {
            expect(pc.getCantripCount()).toBe(2);
        });

        test('learns four spells', () => {
            expect(pc.getSpellCount()).toBe(4);
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
        const bdArgs  = (college: string): BardLevelingParams[] => ([
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
            {
                isNoInput: false,
                spellSelection: [
                    "FAERIE FIRE"
                ]
            }, 
            {
                isNoInput: false,
                spellSelection: [
                    "KNOCK"
                ],
                archetypeSelection: [
                    {
                        archetype: college
                    }
                ],
                proficiencySelection: [
                    "performance", 
                    "persuasion"
                ]
            },             
            {
                isNoInput: false,
                spellSelection: [
                    "TRUE STRIKE",
                    "SUGGESTION"
                ],
                abilityScoreImprovement: [
                    {
                        ability: "charisma",
                        improvement: 1
                    },
                    {
                        ability: "dexterity",
                        improvement: 1
                    }
                ]
            },
            {
                isNoInput: false,
                spellSelection: [
                    "FEAR"
                ]
            },
            {
                isNoInput: false,
                spellSelection: [
                    "NONDETECTION"
                ],
                archetypeSelection: college == "LORE" ? [
                    {
                        archetype: college,
                        options: ["SHIELD, SHATTER"] 
                    }
                ] : []
            },
            {
                isNoInput: false,
                spellSelection: [
                    "DIMENSION DOOR"
                ]
            },
            {
                isNoInput: false,
                spellSelection: [
                    "CONFUSION"
                ],
                abilityScoreImprovement: [
                    {
                        ability: "charisma",
                        improvement: 1
                    },
                    {
                        ability: "dexterity",
                        improvement: 1
                    }
                ]
            },
            {
                isNoInput: false,
                spellSelection: [
                    "DREAM"
                ]   
            },
            {
                isNoInput: false,
                spellSelection: [
                    "MENDING",
                ],
                proficiencySelection: [
                    "intimidation",
                    "deception"
                ],
                magicalSecretsSpellSelection: [
                    "TELEKINESIS",
                    "INSECT PLAGUE"
                ]
            },
            {
                isNoInput: false,
                spellSelection: [
                    "MASS SUGGESTION"
                ]
            },
            {
                isNoInput: false,
                abilityScoreImprovement: [
                    {
                        ability: "charisma",
                        improvement: 1
                    },
                    {
                        ability: "dexterity",
                        improvement: 1
                    }
                ]
            },
            {
                isNoInput: false,
                spellSelection: [
                    "MIRAGE ARCANE"
                ]
            },
            {
                isNoInput: false,
                magicalSecretsSpellSelection: [
                    "FIRE STORM",
                    "HEAL"
                ]
            },
            {
                isNoInput: false,
                spellSelection: [
                    "POWER WORD STUN"
                ]
            },
            {
                isNoInput: false,
                abilityScoreImprovement: [
                    {
                        ability: "charisma",
                        improvement: 1
                    },
                    {
                        ability: "dexterity",
                        improvement: 1
                    }
                ]
            },
            {
                isNoInput: false,
                spellSelection: [
                    "POWER WORD KILL"
                ]  
            },
            {
                isNoInput: false,
                magicalSecretsSpellSelection: [
                    "CREATION",
                    "CRUSADER'S MANTLE"
                ]
            },
            {
                isNoInput: false,
                abilityScoreImprovement: [
                    {
                        ability: "charisma",
                        improvement: 1
                    },
                    {
                        ability: "dexterity",
                        improvement: 1
                    }
                ]
            },
            {
                isNoInput: true
            }
        ]);

        beforeEach(() => {
            bdClass = new Bard([], [], [], "", "ENTERTAINER", bdArgs("VALOR")[0]);
            bdClass.apply(pc);
        });

        describe('to Level 2', () => {
            
            beforeEach(() => {
                PlayerClass.quickClassLevelUp(pc, bdClass, bdArgs("VALOR"), 2);
            });

            test('gains the Jack of All Trades and Song of Rest feature traits', () => {
                expect(
                    pc.findFeatureTraitByName("Jack of All Trades") != null &&
                    pc.findFeatureTraitByName("Song of Rest") != null
                ).toBeTruthy();
            });

            test('gains the Song of Rest scaling trait', () => {
                expect(pc.findScalingTraitByName('Song of Rest')).toBeTruthy();
            });

            test('gains half proficiency in non-proficient skills through Jack of Trades', () => {
                expect(pc.skills['acrobatics'].bonus).toBe(pc.proficiency.halfBonus);
            });

            test('gains a Level 1 spell slot', () => {
                expect(SpellSlotFactory.countAllPlayerSpellSlots(pc)).toStrictEqual(
                    spellSlotsByLevel[2]
                );
            });

            test('knows a total of 5 spells', () => {
                expect(pc.getSpellCount()).toBe(5);
            });
        });

        describe('to Level 3', () => {

            beforeEach(() => {
                PlayerClass.quickClassLevelUp(pc, bdClass, bdArgs("VALOR"), 3);
            });

            test('gains the Expertise feature trait', () => {
                expect(pc.findFeatureTraitByName('Expertise')).toBeTruthy();
            });

            test('gains a Level 1 spell slot and two Level 2 spell slots', () => {
                expect(SpellSlotFactory.countAllPlayerSpellSlots(pc)).toStrictEqual(
                    spellSlotsByLevel[3]
                );
            });

            test('knows a total of 6 spells', () => {
                expect(pc.getSpellCount()).toBe(6);
            });

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
