import 'jest-extended';

import { PlayerCharacter } from "../../src/Base/PlayerCharacter";
import { BarbarianArchetype } from "../../src/Classes/Archetypes";
import { Barbarian } from "../../src/Classes/Barbarian";

import * as ClassTraits from "../../Assets/ClassTraits.json";
import * as ArchetypeTraits from "../../Assets/Archetypes.json";
import { LevelingParams, PlayerClass } from '../../src/Classes/PlayerClass';

const BarbarianTraits = ClassTraits["BARBARIAN"];
const BarbarianArchetypeTraits = ArchetypeTraits["BARBARIAN"];


describe('Barbarian Class', () => {

    let pc: PlayerCharacter;

    beforeEach(() => {
        pc = new PlayerCharacter(12,12,12,12,12,12);
    });

    describe('on initialization (Level 1):', () => {

        let bnClass: Barbarian;

        test('gains the Rage and Unarmored Defense feature traits', () => {

            bnClass = new Barbarian([], []);
            bnClass.apply(pc);
            expect(pc.traits.features).toIncludeAllMembers(
                [
                    BarbarianTraits[1]["UNARMORED DEFENSE"],
                    BarbarianTraits[1]["RAGE"]
                ]);
        });

        test('gains the Rage resource trait', () => {

            bnClass = new Barbarian([], []);
            bnClass.apply(pc);
            expect(pc.findResourceTraitByName("Rage")).toBeTruthy();
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

        test.skip('hit point max is not implemented yet', () => {

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
        ];


        beforeEach(() => {
            bnClass = new Barbarian([], []);
            bnClass.apply(pc);
        });

        describe('to Level 2', () => {

            test('gains the Reckless Attack and Danger Sense feature traits', () => {

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
                PlayerClass.quickClassLevelUp(pc, bnClass, bnArgs, 2);
            });

            test('gets an increase in max Rages to 3', () => {
                bnClass.abilitiesAtLevels[3](pc, bnArgs[2]);
                expect(pc.findResourceTraitByName("Rage").resourceMax.value).toBe(3);
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

            describe('with Berserker archetype', () => {

                test('gains the Frenzy feature trait', () => {

                    bnClass.abilitiesAtLevels[3](pc, {
                        isNoInput: false,
                        archetypeSelection: [{
                            archetype: "BERSERKER"
                        }]
                    });
                    expect(pc.findFeatureTraitByName("Frenzy")).toBeTruthy();
                });
            });

            describe('with Totem Warrior archetype', () => {

                test('gains the Spirit Seeker feature trait', () => {

                    bnClass.abilitiesAtLevels[3](pc, bnArgs[2]);
                    expect(pc.findFeatureTraitByName("Spirit Seeker")).toBeTruthy();
                });

                test('gains the Beast Sense and Speak With Animals spells', () => {

                    bnClass.abilitiesAtLevels[3](pc, bnArgs[2]);
                    expect(
                        pc.findSpellByName("Beast Sense") != null &&
                        pc.findSpellByName("Speak With Animals") != null
                    ).toBeTruthy();
                });

                test('gains Bear, Eagle, or Wolf feature traits', () => {

                    const pc1: PlayerCharacter = new PlayerCharacter(12,12,12,12,12,12);
                    const pc2: PlayerCharacter = new PlayerCharacter(12,12,12,12,12,12);
                    const pc3: PlayerCharacter = new PlayerCharacter(12,12,12,12,12,12);

                    bnClass.apply(pc1);
                    bnClass.apply(pc2);
                    bnClass.apply(pc3);

                    PlayerClass.quickClassLevelUp(pc1, bnClass, bnArgs, 2);
                    PlayerClass.quickClassLevelUp(pc2, bnClass, bnArgs, 2);
                    PlayerClass.quickClassLevelUp(pc3, bnClass, bnArgs, 2);

                    bnClass.abilitiesAtLevels[3](pc1, {
                        isNoInput: false,
                        archetypeSelection: [{
                            archetype: "TOTEM WARRIOR",
                            options: ["BEAR"]
                        }]
                    });
                    bnClass.abilitiesAtLevels[3](pc2, {
                        isNoInput: false,
                        archetypeSelection: [{
                            archetype: "TOTEM WARRIOR",
                            options: ["EAGLE"]
                        }]
                    });
                    bnClass.abilitiesAtLevels[3](pc3, {
                        isNoInput: false,
                        archetypeSelection: [{
                            archetype: "TOTEM WARRIOR",
                            options: ["WOLF"]
                        }]
                    });

                    expect(
                        pc1.findFeatureTraitByName("Bear (Lvl 3)") != null &&
                        pc2.findFeatureTraitByName("Eagle (Lvl 3)") != null &&
                        pc3.findFeatureTraitByName("Wolf (Lvl 3)") != null
                    ).toBeTruthy();
                });
            });

        });

        describe('to Level 4', () => {

            beforeEach(() => {
                PlayerClass.quickClassLevelUp(pc, bnClass, bnArgs, 4);
            });

            test('gets an ability score increase', () => {
                
                expect(
                    pc.abilityScores.strength.score == 13 &&
                    pc.abilityScores.constitution.score == 13
                ).toBeTruthy();
            });
        });

        describe('to Level 5', () => {
            
            beforeEach(() => {
                PlayerClass.quickClassLevelUp(pc, bnClass, bnArgs, 5);
            });

            test('gains the Extra Attack and Fast Movement feature traits', () => {

                expect(
                    pc.findFeatureTraitByName("Extra Attack") != null &&
                    pc.findFeatureTraitByName("Fast Movement") != null
                ).toBeTruthy();
            });

        });

        describe('to Level 6', () => {

            test('gets an increase in max Rages to 4', () => {
                PlayerClass.quickClassLevelUp(pc, bnClass, bnArgs, 6);
                expect(pc.findResourceTraitByName("Rage").resourceMax.value).toBe(4);
            });

            describe('with Berserker archetype', () => {

                test('gains the Mindless Rage feature trait', () => {
                    
                    let berserkerArgs = [...bnArgs];
                    const berserkAtype = {
                        isNoInput: false,
                        archetypeSelection: [{
                            archetype: "BERSERKER"
                        }]
                    }
                    berserkerArgs[2] = berserkAtype;
                    berserkerArgs[5] = berserkAtype;
                    PlayerClass.quickClassLevelUp(pc, bnClass, berserkerArgs, 6)
                    expect(pc.findFeatureTraitByName("Mindless Rage")).toBeTruthy();
                });
            });

            describe('with Totem Warrior archetype', () => {

                test('gains Bear, Eagle, or Wolf feature traits', () => {

                    const pc1: PlayerCharacter = new PlayerCharacter(12,12,12,12,12,12);
                    const pc2: PlayerCharacter = new PlayerCharacter(12,12,12,12,12,12);
                    const pc3: PlayerCharacter = new PlayerCharacter(12,12,12,12,12,12);

                    bnClass.apply(pc1);
                    bnClass.apply(pc2);
                    bnClass.apply(pc3);

                    let twArgs1 = [...bnArgs], twArgs2 = [...bnArgs];
                    twArgs1[5] = {
                        isNoInput: false,
                        archetypeSelection: [{
                            archetype: "TOTEM WARRIOR",
                            options: ["EAGLE"]
                        }]
                    };
                    twArgs2[5] = {
                        isNoInput: false,
                        archetypeSelection: [{
                            archetype: "TOTEM WARRIOR",
                            options: ["WOLF"]
                        }]
                    }
                    PlayerClass.quickClassLevelUp(pc1, bnClass, bnArgs, 6);
                    PlayerClass.quickClassLevelUp(pc2, bnClass, twArgs1, 6);
                    PlayerClass.quickClassLevelUp(pc3, bnClass, twArgs2, 6);

                    expect(
                        pc1.findFeatureTraitByName("Bear (Lvl 6)") != null &&
                        pc2.findFeatureTraitByName("Eagle (Lvl 6)") != null &&
                        pc3.findFeatureTraitByName("Wolf (Lvl 6)") != null
                    ).toBeTruthy();
                });
            });
        });

        describe('to Level 7', () => {

            beforeEach(() => {
                PlayerClass.quickClassLevelUp(pc, bnClass, bnArgs, 7);
            });

            test('gains the Feral Instinct feature trait', () => {
                expect(pc.findFeatureTraitByName("Feral Instinct")).toBeTruthy();
            });
        });

        describe('to Level 8', () => {
            
            beforeEach(() => {
                PlayerClass.quickClassLevelUp(pc, bnClass, bnArgs, 8);
            });

            test('gets an ability score increase', () => {
                
                expect(
                    pc.abilityScores.strength.score == 14 &&
                    pc.abilityScores.constitution.score == 14
                ).toBeTruthy();
            });
        });

        describe('to Level 9', () => {

            beforeEach(() => {
                PlayerClass.quickClassLevelUp(pc, bnClass, bnArgs, 9);
            });

            test('gains the Brutal Critical feature trait', () => {
                expect(pc.findFeatureTraitByName("Brutal Critical")).toBeTruthy();
            });

            test('gains the Brutal Critical scaling trait', () => {
                expect(pc.findScalingTraitByName("Brutal Critical")).toBeTruthy();
            });

            test('gets an increase in Rage bonus damage to 3', () => {
                expect(pc.findResourceTraitByName("Rage").bonus).toBe(3);
            });

        });

        describe('to Level 10', () => {

            describe('with Berserker archetype', () => {

                test('gains the Intimidating Presence feature trait', () => {
                    
                    let berserkerArgs = [...bnArgs];
                    const berserkAtype = {
                        isNoInput: false,
                        archetypeSelection: [{
                            archetype: "BERSERKER"
                        }]
                    }
                    berserkerArgs[2] = berserkAtype;
                    berserkerArgs[5] = berserkAtype;
                    berserkerArgs[9] = berserkAtype;
                    PlayerClass.quickClassLevelUp(pc, bnClass, berserkerArgs, 10)
                    expect(pc.findFeatureTraitByName("Intimidating Presence")).toBeTruthy();
                });
            });

            describe('with Totem Warrior archetype', () => {

                test('gains the Spirit Walker feature trait', () => {

                   PlayerClass.quickClassLevelUp(pc, bnClass, bnArgs, 10);
                   expect(pc.findFeatureTraitByName("Spirit Walker")).toBeTruthy();
                });

                test('gains the Commune With Nature spell', () => {

                    PlayerClass.quickClassLevelUp(pc, bnClass, bnArgs, 10);
                    expect(pc.findSpellByName("Commune With Nature")).toBeTruthy();
                });
            });
        });

        describe('to Level 11', () => {

            beforeEach(() => {
                PlayerClass.quickClassLevelUp(pc, bnClass, bnArgs, 11);
            });

            test('gains the Relentless Rage feature trait', () => {
                expect(pc.findFeatureTraitByName("Relentless Rage")).toBeTruthy();
            });
        });

        describe('to Level 12', () => {

            beforeEach(() => {
                PlayerClass.quickClassLevelUp(pc, bnClass, bnArgs, 12);
            });

            test('gets an ability score increase', () => {
                
                expect(
                    pc.abilityScores.strength.score == 15 &&
                    pc.abilityScores.constitution.score == 15
                ).toBeTruthy();
            });
            
            test('gets an increase in max Rages to 5', () => {
                expect(pc.findResourceTraitByName("Rage").resourceMax.value).toBe(5);
            });

        });

        describe('to Level 13', () => {

            beforeEach(() => {
                PlayerClass.quickClassLevelUp(pc, bnClass, bnArgs, 13);
            });

            test('gets an upgrade to Brutal Critical dice to 2dx', () => {
                expect(pc.findScalingTraitByName("Brutal Critical").dice).toBe("2dx");
            });

        });

        describe('to Level 14', () => {
            
            describe('with Berserker archetype', () => {

                test('gains the Retaliation feature trait', () => {
                    
                    let berserkerArgs = [...bnArgs];
                    const berserkAtype = {
                        isNoInput: false,
                        archetypeSelection: [{
                            archetype: "BERSERKER"
                        }]
                    }
                    berserkerArgs[2] = berserkAtype;
                    berserkerArgs[5] = berserkAtype;
                    berserkerArgs[9] = berserkAtype;
                    berserkerArgs[13] = berserkAtype;

                    PlayerClass.quickClassLevelUp(pc, bnClass, berserkerArgs, 14)
                    expect(pc.findFeatureTraitByName("Retaliation")).toBeTruthy();
                });
            });

            describe('with Totem Warrior archetype', () => {

                test('gains Bear, Eagle, or Wolf feature traits', () => {

                    const pc1: PlayerCharacter = new PlayerCharacter(12,12,12,12,12,12);
                    const pc2: PlayerCharacter = new PlayerCharacter(12,12,12,12,12,12);
                    const pc3: PlayerCharacter = new PlayerCharacter(12,12,12,12,12,12);

                    bnClass.apply(pc1);
                    bnClass.apply(pc2);
                    bnClass.apply(pc3);

                    let twArgs1 = [...bnArgs], twArgs2 = [...bnArgs];
                    twArgs1[13] = {
                        isNoInput: false,
                        archetypeSelection: [{
                            archetype: "TOTEM WARRIOR",
                            options: ["EAGLE"]
                        }]
                    };
                    twArgs2[13] = {
                        isNoInput: false,
                        archetypeSelection: [{
                            archetype: "TOTEM WARRIOR",
                            options: ["WOLF"]
                        }]
                    }
                    PlayerClass.quickClassLevelUp(pc1, bnClass, bnArgs, 14);
                    PlayerClass.quickClassLevelUp(pc2, bnClass, twArgs1, 14);
                    PlayerClass.quickClassLevelUp(pc3, bnClass, twArgs2, 14);

                    expect(
                        pc1.findFeatureTraitByName("Bear (Lvl 14)") != null &&
                        pc2.findFeatureTraitByName("Eagle (Lvl 14)") != null &&
                        pc3.findFeatureTraitByName("Wolf (Lvl 14)") != null
                    ).toBeTruthy();
                });
            });
            
        });

        describe('to Level 15', () => {

            beforeEach(() => {
                PlayerClass.quickClassLevelUp(pc, bnClass, bnArgs, 15);
            });

            test('gains the Persistent Rage feature trait', () => {
                expect(pc.findFeatureTraitByName("Persistent Rage")).toBeTruthy();
            });

        });

        describe('to Level 16', () => {

            beforeEach(() => {
                PlayerClass.quickClassLevelUp(pc, bnClass, bnArgs, 16);
            });
            
            test('gets an ability score increase', () => {
                
                expect(
                    pc.abilityScores.strength.score == 16 &&
                    pc.abilityScores.constitution.score == 16
                ).toBeTruthy();
            });
            
            test('gets an increase in Rage bonus damage to 4', () => {
                expect(pc.findResourceTraitByName("Rage").bonus).toBe(4);
            });

        });
        
        describe('to Level 17', () => {

            beforeEach(() => {
                PlayerClass.quickClassLevelUp(pc, bnClass, bnArgs, 17);
            });

            test('gets an upgrade to Brutal Critical dice to 3dx', () => {
                expect(pc.findScalingTraitByName("Brutal Critical").dice).toBe("3dx");
            });

            test('gets an increase in max Rages to 6', () => {
                expect(pc.findResourceTraitByName("Rage").resourceMax.value).toBe(6);
            });

        });

        describe('to Level 18', () => {
            
            beforeEach(() => {
                PlayerClass.quickClassLevelUp(pc, bnClass, bnArgs, 18);
            });

            test('gains the Indomitable Might feature trait', () => {
                expect(pc.findFeatureTraitByName("Indomitable Might")).toBeTruthy();
            });
        });

        describe('to Level 19', () => {

            beforeEach(() => {
                PlayerClass.quickClassLevelUp(pc, bnClass, bnArgs, 19);
            });

            test('gets an ability score increase', () => {
                
                expect(
                    pc.abilityScores.strength.score == 17 &&
                    pc.abilityScores.constitution.score == 17
                ).toBeTruthy();
            });

        });

        describe('to Level 20', () => {

            beforeEach(() => {
                PlayerClass.quickClassLevelUp(pc, bnClass, bnArgs, 20);
            });

            test('gains the Primal Champion feature trait', () => {
                expect(pc.findFeatureTraitByName("Primal Champion")).toBeTruthy();
            });

            test('upgrades ability score maximums of strength and constitution to 24', () => {

                expect(
                    pc.abilityScores['strength'].scoreMax == 24 &&
                    pc.abilityScores['constitution'].scoreMax == 24
                ).toBeTruthy();
            });

            test('increases strength and constitution ability scores by 4', () => {
                expect(
                    pc.abilityScores.strength.score == 21 &&
                    pc.abilityScores.constitution.score == 21
                ).toBeTruthy();
            });

            test('sets max Rages to Infinity', () => {
                expect(pc.findResourceTraitByName("Rage").resourceMax.value).toBe(Infinity);
            });

        });
    });
});
