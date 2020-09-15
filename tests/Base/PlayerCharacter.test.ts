import "jest-extended";
import { PlayerCharacter } from '../../src/Base/PlayerCharacter';
import { ResourceTrait, ScalingTrait } from '../../src/Base/Interfaces';
import * as RacialTraits from '../../Assets/RacialTraits.json';
import * as Spells from '../../Assets/Spells.json';
import * as ClassTraits from '../../Assets/ClassTraits.json';



describe('PlayerCharacter', () => {

    let pc: PlayerCharacter;
    const rage: ResourceTrait = {title: "Rage", description: "Number of times you can go into a Rage.  Bonus applies to attack damage while in a rage.", resourceMax: {value: 2}, bonus: 2}; 
    const brutalCritical: ScalingTrait = {title: "Brutal Critical", description: ""}

    beforeEach(() => {
        pc = new PlayerCharacter(12,12,12,12,12,12);
    })

    test('can add feature traits', () => {
        pc.addFeatures(RacialTraits["DARKVISION"]);
        expect(pc.traits.features).toIncludeAllMembers([RacialTraits["DARKVISION"]]);
    });

    test('can add resource traits', () => {
        pc.addResourceTraits(rage);
        expect(pc.traits.resources).toIncludeAllMembers([rage]);
    });

    test.skip('can add scaling traits', () => {
        //TO DO
    });

    test('can add spells with a specified spellcasting ability', () => {
        pc.addSpells(["HEALING WORD"], "charisma");
        expect(pc.spells[1]).toIncludeAllMembers([{...Spells["HEALING WORD"], spellcastingAbility: "charisma"}]);
    });

    test('can replace a known spell with a new spell with a specified spellcasting ability', () => {
        //the available spell slot restriction is done elsewhere
        pc.addSpells(["HEALING WORD"], "charisma");
        pc.replaceSpells({ "HEALING WORD": "VAMPIRIC TOUCH"}, "charisma");
        expect(
            pc.spells[1].length == 0 &&
            pc.spells[3][0].name == Spells["VAMPIRIC TOUCH"].name &&
            pc.spells[3][0].spellcastingAbility == "charisma"
        ).toBeTruthy();
    });

    test('cannot be considered a spellcaster without any known spells', () => {
        expect(pc.isSpellcaster()).toBeFalsy();
    });

    test('is automatically considered a spellcaster after learning one spell', () => {
        pc.addSpells(["SLEEP"], "charisma");
        expect(pc.isSpellcaster()).toBeTruthy();        
    });

    test('can retrieve feature traits by name', () => {
        pc.addFeatures(RacialTraits["DWARVEN RESILIENCE"]);
        expect(pc.findFeatureTraitByName("Dwarven Resilience")).toBeTruthy();        
    });

    test('will return null if a feature trait cannot be found', () => {
        expect(pc.findFeatureTraitByName("Rage")).toBeNull();
    });

    test('can retrieve resource traits by name', () => {
        pc.addResourceTraits(rage);
        expect(pc.findResourceTraitByName("Rage")).toBeTruthy();        
    });

    test('will return null if a resource trait cannot be found', () => {
        expect(pc.findResourceTraitByName("Rage")).toBeNull();
    });

    test.skip('can retrieve scaling traits by name', () => {
        //TO DO
    });

    test.skip('will return null if a scaling trait cannot be found', () => {
        //TO DO
    });

    test('can retrieve known spells by name', () => {
        pc.addSpells(["ELDRITCH BLAST"], "charisma");
        expect(pc.findSpellByName("Eldritch Blast")).toBeTruthy();
    });

    test('will return null if a specified spell is not known', () => {
        expect(pc.findSpellByName("BLADE WARD")).toBeNull();
    });

    test('can change specific ability score maxima from the default of 20', () => {
        pc.changeAbilityScoreMaxes(['strength', 'constitution'], 24);
        expect(
            pc.abilityScores.strength.scoreMax == 24 &&
            pc.abilityScores.constitution.scoreMax == 24 &&
            pc.abilityScores.dexterity.scoreMax == 20
        ).toBeTruthy();
    });

    test('can increase specific ability score values', () => {
        pc.improveAbilityScores(
            [{ ability: 'dexterity', improvement: 2 }, 
            {ability: 'intelligence', improvement: 1}]
        );
        expect(
            pc.abilityScores.dexterity.score == 14 &&
            pc.abilityScores.intelligence.score == 13
        ).toBeTruthy();
    });
});