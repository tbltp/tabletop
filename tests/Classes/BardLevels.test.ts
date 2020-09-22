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
        pc = new PlayerCharacter(12, 12, 12, 12, 12, 12);
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

        test('starts with 2 cantrips', () => {
            expect(pc.getCantripCount()).toBe(2);
        });

        test('starts with four spells', () => {
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
                        options: ["SHIELD", "SHATTER"] 
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

            test('gains double proficiency in selected skills through Expertise', () => {
                expect(pc.skills['persuasion'].expertise).toBeTrue();
            });

            test('gains a Level 1 spell slot and two Level 2 spell slots', () => {
                expect(SpellSlotFactory.countAllPlayerSpellSlots(pc)).toStrictEqual(
                    spellSlotsByLevel[3]
                );
            });

            test('knows a total of 6 spells', () => {
                expect(pc.getSpellCount()).toBe(6);
            });

            test('can select the Bard College of Lore', () => {
                PlayerClass.quickClassLevelUp(pc, bdClass, bdArgs("LORE"), 3);
                expect(bdClass.bardCollege).toBe("LORE");
            });
            
            test('can select the Bard College of Valor', () => {
                expect(bdClass.bardCollege).toBe("VALOR");
            });

            describe('with College of Lore archetype', () => {

                beforeEach(() => {
                    PlayerClass.quickClassLevelUp(pc, bdClass, bdArgs("LORE"), 3);
                });

                test('gains the Cutting Words feature trait', () => {
                    expect(pc.findFeatureTraitByName('Cutting Words')).toBeTruthy();
                });
            });

            describe('with College of Valor archetype', () => {

                test('gains the Combat Inspiration feature trait', () => {
                    expect(pc.findFeatureTraitByName('Combat Inspiration')).toBeTruthy();
                });
            });
        });

        describe('to Level 4', () => {

            beforeEach(() => {
                PlayerClass.quickClassLevelUp(pc, bdClass, bdArgs("VALOR"), 4);
            });

            test('gets an ability score increase', () => {
                
                expect(
                    pc.abilityScores.charisma.score == 13 &&
                    pc.abilityScores.dexterity.score == 13
                ).toBeTruthy();
            });

            test('gains a Level 2 spell slot', () => {
                expect(SpellSlotFactory.countAllPlayerSpellSlots(pc)).toStrictEqual(
                    spellSlotsByLevel[4]
                );
            });

            test('knows a total of 3 cantrips', () => {
                expect(pc.getCantripCount()).toBe(3);
            });

            test('knows a total of 7 spells', () => {
                expect(pc.getSpellCount()).toBe(7);
            });
        });

        describe('to Level 5', () => {
            
            beforeEach(() => {
                PlayerClass.quickClassLevelUp(pc, bdClass, bdArgs("VALOR"), 5);
            });

            test('gains the Font of Inspiration feature trait', () => {
                expect(pc.findFeatureTraitByName('Font of Inspiration')).toBeTruthy();
            });

            test('upgrades Bardic Inspiration dice to 1d8', () => {
                expect(pc.findResourceTraitByName('Bardic Inspiration').dice).toBe('1d8');
            });

            test('gains two Level 3 spell slots', () => {
                expect(SpellSlotFactory.countAllPlayerSpellSlots(pc)).toStrictEqual(
                    spellSlotsByLevel[5]
                );
            });

            test('knows a total of 8 spells', () => {
                expect(pc.getSpellCount()).toBe(8);
            });
        });

        describe('to Level 6', () => {

            beforeEach(() => {
                PlayerClass.quickClassLevelUp(pc, bdClass, bdArgs("VALOR"), 6);
            });

            test('gains the Countercharm feature trait', () => {
                expect(pc.findFeatureTraitByName('Countercharm')).toBeTruthy();
            });

            test('gains a Level 3 spell slot', () => {
                expect(SpellSlotFactory.countAllPlayerSpellSlots(pc)).toStrictEqual(
                    spellSlotsByLevel[6]
                );                
            });

            test('knows a total of 9 spells', () => {
                expect(pc.getSpellCount()).toBe(9);
            });

            describe('with College of Lore archetype', () => {

                beforeEach(() => {
                    pc = new PlayerCharacter(12, 12, 12, 12, 12, 12);
                    bdClass.apply(pc);
                    PlayerClass.quickClassLevelUp(pc, bdClass, bdArgs("LORE"), 6);
                });

                test('gains the Additional Magical Secrets feature trait', () => {
                    expect(pc.findFeatureTraitByName('Additional Magical Secrets')).toBeTruthy();
                });

                test('learns additional spells through Additional Magical Secrets', () => {
                    expect(pc.getSpellCount()).toBe(11);
                });
            });

            describe('with College of Valor archetype', () => {

                test('gains the Extra Attack feature trait', () => {
                    expect(pc.findFeatureTraitByName('Extra Attack')).toBeTruthy();
                }); 
            });
        });

        describe('to Level 7', () => {

            beforeEach(() => {
                PlayerClass.quickClassLevelUp(pc, bdClass, bdArgs("VALOR"), 7);
            });

            test('gains a Level 4 spell slot', () => {
                expect(SpellSlotFactory.countAllPlayerSpellSlots(pc)).toStrictEqual(
                    spellSlotsByLevel[7]
                );
            });

            test('knows a total of 10 spells', () => {
                expect(pc.getSpellCount()).toBe(10);
            });
        });

        describe('to Level 8', () => {

            beforeEach(() => {
                PlayerClass.quickClassLevelUp(pc, bdClass, bdArgs("VALOR"), 8);
            });

            test('gets an ability score increase', () => {
                
                expect(
                    pc.abilityScores.charisma.score == 14 &&
                    pc.abilityScores.dexterity.score == 14
                ).toBeTruthy();
            });

            test('gains a Level 4 spell slot', () => {
                expect(SpellSlotFactory.countAllPlayerSpellSlots(pc)).toStrictEqual(
                    spellSlotsByLevel[8]
                );
            });   

            test('knows a total of 11 spells', () => {
                expect(pc.getSpellCount()).toBe(11);
            });         
        });

        describe('to Level 9', () => {

            beforeEach(() => {
                PlayerClass.quickClassLevelUp(pc, bdClass, bdArgs("VALOR"), 9);
            });

            test('upgrades Song of Rest dice to 1d8', () => {
                expect(pc.findScalingTraitByName('Song of Rest').dice).toBe('1d8');
            });

            test('gains a Level 4 spell slot and a Level 5 spell slot', () => {
                expect(SpellSlotFactory.countAllPlayerSpellSlots(pc)).toStrictEqual(
                    spellSlotsByLevel[9]
                );
            });

            test('knows a total of 12 spells', () => {
                expect(pc.getSpellCount()).toBe(12);
            });  
        });

        describe('to Level 10', () => {

            beforeEach(() => {
                PlayerClass.quickClassLevelUp(pc, bdClass, bdArgs("VALOR"), 10);
            });

            test('gains the Magical Secrets feature trait', () => {
                expect(pc.findFeatureTraitByName('Magical Secrets')).toBeTruthy();
            });

            test('can learn spells of other classes through Magical Secrets', () => {
                expect(pc.findFeatureTraitByName('Magical Secrets').choices.length).toBe(2);
            });

            test('gains double proficiency in additional skills through Expertise', () => {
                expect(pc.skills['deception'].expertise).toBeTrue();
            });

            test('upgrades Bardic Inspiration dice to 1d10', () => {
                expect(pc.findResourceTraitByName('Bardic Inspiration').dice).toBe('1d10');
            });

            test('gains a Level 5 spell slot', () => {
                expect(SpellSlotFactory.countAllPlayerSpellSlots(pc)).toStrictEqual(
                    spellSlotsByLevel[10]
                );
            });

            test('knows a total of 4 cantrips', () => {
                expect(pc.getCantripCount()).toBe(4);
            }); 

            test('knows a total of 14 spells', () => {
                expect(pc.getSpellCount()).toBe(14);
            }); 
        });

        describe('to Level 11', () => {

            beforeEach(() => {
                PlayerClass.quickClassLevelUp(pc, bdClass, bdArgs("VALOR"), 11);
            });

            test('gains a Level 6 spell slot', () => {
                expect(SpellSlotFactory.countAllPlayerSpellSlots(pc)).toStrictEqual(
                    spellSlotsByLevel[11]
                );
            });

            test('knows a total of 15 spells', () => {
                expect(pc.getSpellCount()).toBe(15);
            }); 
        });

        describe('to Level 12', () => {

            beforeEach(() => {
                PlayerClass.quickClassLevelUp(pc, bdClass, bdArgs("VALOR"), 12);
            });            

            test('gets an ability score increase', () => {
                expect(
                    pc.abilityScores.charisma.score == 15 &&
                    pc.abilityScores.dexterity.score == 15
                ).toBeTruthy();
            });            

        });

        describe('to Level 13', () => {

            beforeEach(() => {
                PlayerClass.quickClassLevelUp(pc, bdClass, bdArgs("VALOR"), 13);
            }); 

            test('upgrades Song of Rest dice to 1d10', () => {
                expect(pc.findScalingTraitByName('Song of Rest').dice).toBe('1d10');
            });

            test('gains a Level 7 spell slot', () => {
                expect(SpellSlotFactory.countAllPlayerSpellSlots(pc)).toStrictEqual(
                    spellSlotsByLevel[13]
                );
            });

            test('knows a total of 16 spells', () => {
                expect(pc.getSpellCount()).toBe(16);
            });             
        });

        describe('to Level 14', () => {
            
            beforeEach(() => {
                PlayerClass.quickClassLevelUp(pc, bdClass, bdArgs("VALOR"), 14);
            }); 

            test('can learn more spells of other classes through Magical Secrets', () => {
                expect(pc.findFeatureTraitByName('Magical Secrets').choices.length).toBe(4);
            });

            test('knows a total of 18 spells', () => {
                expect(pc.getSpellCount()).toBe(18);
            });

            describe('with College of Lore archetype', () => {

                beforeEach(() => {
                    pc = new PlayerCharacter(12, 12, 12, 12, 12, 12);
                    bdClass.apply(pc);
                    PlayerClass.quickClassLevelUp(pc, bdClass, bdArgs("LORE"), 14);
                });

                test('gains the Peerless Skill feature trait', () => {
                    expect(pc.findFeatureTraitByName('Peerless Skill')).toBeTruthy();
                });
            });

            describe('with College of Valor archetype', () => {

                test('gains the Battle Magic feature trait', () => {
                    expect(pc.findFeatureTraitByName('Battle Magic')).toBeTruthy();
                });
            });
        });

        describe('to Level 15', () => {

            beforeEach(() => {
                PlayerClass.quickClassLevelUp(pc, bdClass, bdArgs("VALOR"), 15);
            });

            test('upgrades Bardic Inspiration dice to 1d12', () => {
                expect(pc.findResourceTraitByName('Bardic Inspiration').dice).toBe('1d12');
            });

            test('gains a Level 8 spell slot', () => {
                expect(SpellSlotFactory.countAllPlayerSpellSlots(pc)).toStrictEqual(
                    spellSlotsByLevel[15]
                );
            });

            test('knows a total of 19 spells', () => {
                expect(pc.getSpellCount()).toBe(19);
            });             
        });

        describe('to Level 16', () => {

            beforeEach(() => {
                PlayerClass.quickClassLevelUp(pc, bdClass, bdArgs("VALOR"), 16);
            });

            test('gets an ability score increase', () => {
                expect(
                    pc.abilityScores.charisma.score == 16 &&
                    pc.abilityScores.dexterity.score == 16
                ).toBeTruthy();
            });     
        });
        
        describe('to Level 17', () => {

            beforeEach(() => {
                PlayerClass.quickClassLevelUp(pc, bdClass, bdArgs("VALOR"), 17);
            });

            test('upgrades Song of Rest dice to 1d12', () => {
                expect(pc.findScalingTraitByName('Song of Rest').dice).toBe('1d12');
            });

            test('gains a Level 9 spell slot', () => {
                expect(SpellSlotFactory.countAllPlayerSpellSlots(pc)).toStrictEqual(
                    spellSlotsByLevel[17]
                );
            });

            test('knows a total of 20 spells', () => {
                expect(pc.getSpellCount()).toBe(20);
            });             
        });

        describe('to Level 18', () => {

            beforeEach(() => {
                PlayerClass.quickClassLevelUp(pc, bdClass, bdArgs("VALOR"), 18);
            });            

            test('can learn more spells of other classes through Magical Secrets', () => {
                expect(pc.findFeatureTraitByName('Magical Secrets').choices.length).toBe(6);
            });

            test('gains a Level 5 spell slot', () => {
                expect(SpellSlotFactory.countAllPlayerSpellSlots(pc)).toStrictEqual(
                    spellSlotsByLevel[18]
                );
            });

            test('knows a total of 22 spells', () => {
                expect(pc.getSpellCount()).toBe(22);
            });             
        });

        describe('to Level 19', () => {

            beforeEach(() => {
                PlayerClass.quickClassLevelUp(pc, bdClass, bdArgs("VALOR"), 19);
            });

            test('gets an ability score increase', () => {
                expect(
                    pc.abilityScores.charisma.score == 17 &&
                    pc.abilityScores.dexterity.score == 17
                ).toBeTruthy();
            });              

            test('gains a Level 6 spell slot', () => {
                expect(SpellSlotFactory.countAllPlayerSpellSlots(pc)).toStrictEqual(
                    spellSlotsByLevel[19]
                );
            });          
        });

        describe('to Level 20', () => {

            beforeEach(() => {
                PlayerClass.quickClassLevelUp(pc, bdClass, bdArgs("VALOR"), 20);
            });

            test('gains the Superior Inspiration feature trait', () => {
                expect(pc.findFeatureTraitByName('Superior Inspiration')).toBeTruthy();
            });

            test('gains a Level 7 spell slot', () => {
                expect(SpellSlotFactory.countAllPlayerSpellSlots(pc)).toStrictEqual(
                    spellSlotsByLevel[20]
                );
            });             
        });
    });
});
