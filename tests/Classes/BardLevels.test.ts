import 'jest-extended';

import { PlayerCharacter } from "../../src/Base/PlayerCharacter";
import { BarbarianArchetype } from "../../src/Classes/Archetypes";
import { Barbarian } from "../../src/Classes/Barbarian";

import * as ClassTraits from "../../Assets/ClassTraits.json";

const BarbarianTraits = ClassTraits["BARBARIAN"];

/*
describe('Bard Class', () => {

    let pc: PlayerCharacter;

    beforeEach(() => {
        pc = new PlayerCharacter(12,12,12,12,12,12);
    });

    describe('on initialization (Lvl 1):', () => {

        let bnClass: Barbarian;

        test('gains  traits', () => {

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

    });
    
    describe('on leveling', () => {

        describe('to Level 2', () => {

        });

        describe('to Level 3', () => {

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
*/