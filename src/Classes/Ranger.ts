import { PlayerClass, LevelingParams, SpellSlotFactory } from './PlayerClass';
import { PlayerCharacter } from '../Base/PlayerCharacter';
import { ResourceTrait } from '../Base/Interfaces';
import * as SpellList from '../../Assets/SpellList.json';
import { RangerArchetype } from './Archetypes';

export class Ranger extends PlayerClass {

    constructor(skillProficiencies: string[], weapons: string[], armor: string[], rangerParams: RangerParams, equipmentPack: string){ 
        super(
            "Ranger",
            [],
            skillProficiencies, 
            ["Simple", "Martial"],
            ["Light", "Medium", "Shield"],
            [],
            [...weapons, "LONGBOW"],
            armor,
            [],
            [],
            rangerParams,
            "d10",
            10,
            ["strength", "dexterity"]
        );

        this.equipmentPack = equipmentPack

        for(let level in this.abilitiesAtLevels) {
            const func: Function = this.abilitiesAtLevels[level];
            this.abilitiesAtLevels[level] = func.bind(this);
        }
    }

    /** TODO
     * FIGHTING STYLE
     */

	rangerArchetype: string;

    abilitiesAtLevels = {
        "1": this.level1,
        "2": this.level2,
        "3": this.level3,
        "4": this.level4,
        "5": this.level5,
        "6": this.level6,
        "7": this.level7,
        "8": this.level8,
        "9": this.level9,
        "10": this.level10,
        "11": this.level11,
        "12": this.level12,
        "13": this.level13,
        "14": this.level14,
        "15": this.level15,
        "16": this.level16,
        "17": this.level17,
        "18": this.level18,
        "19": this.level19,
        "20": this.level20,
    }

    pushRangerFeatures(pc: PlayerCharacter, level: string) {
        this.pushClassFeatures(pc, level, "RANGER");
    }

    level1(pc: PlayerCharacter, params: RangerParams): void {
		PlayerClass.pushCustomizedClassFeature(pc, "1", "RANGER", "FAVORED ENEMY", [params.favoredEnemy])
        PlayerClass.pushCustomizedClassFeature(pc, "1", "RANGER", "NATURAL EXPLORER", [params.favoredTerrain])
    }

    level2(pc: PlayerCharacter, params: LevelingParams): void {
        const lvl1Slots = SpellSlotFactory.getSpellSlots(1, 2);
        pc.addResourceTraits(lvl1Slots);
        pc.addSpells(params.spellSelection, "wisdom");

        // FIGHTING STYLE
    }

    level3(pc: PlayerCharacter, params: LevelingParams): void {

        this.rangerArchetype = params.archetypeSelection[0].archetype;

        this.pushRangerFeatures(pc, "3");
        pc.addSpells(params.spellSelection, "wisdom");
        SpellSlotFactory.findPlayerSpellSlots(pc, 1).resourceMax.value++;

        RangerArchetype.archetypeHelper[this.rangerArchetype]["3"](pc, params);
    }
    
    level4(pc: PlayerCharacter, params: LevelingParams): void {
        this.pushRangerFeatures(pc, "4");
        SpellSlotFactory.findPlayerSpellSlots(pc, 1).resourceMax.value++;
        pc.improveAbilityScores(params.abilityScoreImprovement)
    }

    level5(pc: PlayerCharacter, params: LevelingParams): void {
        this.pushRangerFeatures(pc, "5");
        const lvl2Slots = SpellSlotFactory.getSpellSlots(2, 2);
        pc.addResourceTraits(lvl2Slots);
        pc.addSpells(params.spellSelection, "wisdom");
        SpellSlotFactory.findPlayerSpellSlots(pc, 1).resourceMax.value++;
    }

    level6(pc: PlayerCharacter, params: RangerParams): void {
        this.pushRangerFeatures(pc, "6");
        pc.findFeatureTraitByName("Favored Enemy").choices.push(params.favoredEnemy);
        pc.findFeatureTraitByName("Natural Explorer").choices.push(params.favoredTerrain);
    }

    level7(pc: PlayerCharacter, params: LevelingParams): void {
        pc.addSpells(params.spellSelection, "wisdom");
        SpellSlotFactory.findPlayerSpellSlots(pc, 2).resourceMax.value++;

        RangerArchetype.archetypeHelper[this.rangerArchetype]["7"](pc, params);
 
    }

    level8(pc: PlayerCharacter, params: LevelingParams): void {
        this.pushRangerFeatures(pc, "8");
        pc.improveAbilityScores(params.abilityScoreImprovement);
    }

    level9(pc: PlayerCharacter, params: LevelingParams): void {
        const lvl3Slots = SpellSlotFactory.getSpellSlots(3, 2);
        pc.addResourceTraits(lvl3Slots);
        pc.addSpells(params.spellSelection, "wisdom");
    }

    level10(pc: PlayerCharacter, params: RangerParams): void {
        this.pushRangerFeatures(pc, "10");
        pc.findFeatureTraitByName("Natural Explorer").choices.push(params.favoredTerrain);
    }

    level11(pc: PlayerCharacter, params: LevelingParams): void {
        pc.addSpells(params.spellSelection, "wisdom");
        SpellSlotFactory.findPlayerSpellSlots(pc, 3).resourceMax.value++;

        RangerArchetype.archetypeHelper[this.rangerArchetype]["11"](pc, params); 
    }

    level12(pc: PlayerCharacter, params: LevelingParams): void {
        pc.improveAbilityScores(params.abilityScoreImprovement);
    }

    level13(pc: PlayerCharacter, params: LevelingParams): void {
        const lvl4Slots = SpellSlotFactory.getSpellSlots(4, 1);
        pc.addResourceTraits(lvl4Slots);
        pc.addSpells(params.spellSelection, "wisdom"); 
    }

    level14(pc: PlayerCharacter, params: RangerParams): void {
        this.pushRangerFeatures(pc, "14");
        pc.findFeatureTraitByName("Favored Enemy").choices.push(params.favoredEnemy);
    }

    level15(pc: PlayerCharacter, params: LevelingParams): void {
        pc.addSpells(params.spellSelection, "wisdom");
        SpellSlotFactory.findPlayerSpellSlots(pc, 4).resourceMax.value++;
 
        RangerArchetype.archetypeHelper[this.rangerArchetype]["15"](pc, params);
    }

    level16(pc: PlayerCharacter, params: LevelingParams): void {
        pc.improveAbilityScores(params.abilityScoreImprovement);
    }

    level17(pc: PlayerCharacter, params: LevelingParams): void {
        const lvl5Slots = SpellSlotFactory.getSpellSlots(5, 1);
        pc.addResourceTraits(lvl5Slots);
        pc.addSpells(params.spellSelection, "wisdom");
        SpellSlotFactory.findPlayerSpellSlots(pc, 4).resourceMax.value++;
    }

    level18(pc: PlayerCharacter, params: LevelingParams): void {
        this.pushRangerFeatures(pc, "18");
    }

    level19(pc: PlayerCharacter, params: LevelingParams): void {
        pc.addSpells(params.spellSelection, "wisdom");
        SpellSlotFactory.findPlayerSpellSlots(pc, 5).resourceMax.value++;
        pc.improveAbilityScores(params.abilityScoreImprovement);
    }

    level20(pc: PlayerCharacter, params: LevelingParams): void {
        this.pushRangerFeatures(pc, "20");
    }
    
}

interface RangerParams extends LevelingParams {
	favoredEnemy?: string;
	favoredTerrain?: string;
}