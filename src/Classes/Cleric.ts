import { PlayerClass, LevelingParams } from './PlayerClass';
import { PlayerCharacter } from '../Base/PlayerCharacter';
import {ISpell, Spell, ResourceTrait, ScalingTrait } from '../Base/Interfaces';
import * as ClassTraits from '../../Assets/ClassTraits.json';
import * as Spells from '../../Assets/Spells.json';
import { ClericArchetype } from './Archetypes';
import * as SpellList from '../../Assets/SpellList.json';
import * as SpellcastingAbility from '../../Assets/SpellcastingAbility.json';
import { SpellSlotFactory } from './SpellSlotFactory';

export class Cleric extends PlayerClass {

    constructor(skillProficiencies: string[], weapons: string[], armor: string[], clericParams: LevelingParams, equipmentPack: string){ 
        super(
            "Cleric",
            [],
            skillProficiencies, 
            ["Simple"],
            ["Light", "Medium", "Shield"],
            [],
            weapons,
            armor,
            [],
            [],
            clericParams,
            "d8",
            8,
            ["wisdom", "charisma"]
        );

        this.equipmentPack = equipmentPack;

        for(let level in this.abilitiesAtLevels) {   
            const func: Function = this.abilitiesAtLevels[level];
            this.abilitiesAtLevels[level] = func.bind(this);
        }
    }

    clericDomain: string = "";

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

    /** TODO:
     * FIGURE OUT HOW TO REPRESENT NUMBER OF PREPARED SPELLS.
     * HOLY SYMBOL IN INVENTORY - NOT A REAL ITEM
     * PRIESTS PACK CONTAINS NOT REAL ITEMS
     */

    private pushClericFeatures(pc: PlayerCharacter, level: number) {
        this.pushClassFeatures(pc, level, "CLERIC");
    }

    private handleClericSpellSelections(pc: PlayerCharacter, params: LevelingParams) {
        this.handleSpellSelections(pc, params, SpellcastingAbility["CLERIC"]);
    }

    private applyClericSpellSlots(pc: PlayerCharacter, level: number) {
        SpellSlotFactory.applySpellSlotsAtLevel(pc, level, "PRIMARY");
    }

    level1(pc: PlayerCharacter, params: LevelingParams): void {
        pc.addSpells([...params.spellSelection, ...SpellList["Cleric"][1]], SpellcastingAbility["CLERIC"]);
        this.applyClericSpellSlots(pc, 1);
        // divine domain 
        this.clericDomain = params.archetypeSelection[0].archetype;
        ClericArchetype.archetypeHelper[this.clericDomain][1](pc, params);
    }

    level2(pc: PlayerCharacter, params: LevelingParams): void {
        this.applyClericSpellSlots(pc, 2);
        // channel divinity
        const channelDivinity: ResourceTrait = {title: "Channel Divinity", description: "Number of times you can use a Channel Divinity ability.", resourceMax: {value: 1} }; 
        pc.addResourceTraits(channelDivinity);
        // divine domain
        ClericArchetype.archetypeHelper[this.clericDomain][2](pc, params);
        this.pushClericFeatures(pc, 2);
    }

    level3(pc: PlayerCharacter, params: LevelingParams): void {
        this.applyClericSpellSlots(pc, 3);
        // divine domain spells
        ClericArchetype.archetypeHelper[this.clericDomain][3](pc, params);
    }
    
    level4(pc: PlayerCharacter, params: LevelingParams): void {
        // cantrip
        this.handleClericSpellSelections(pc, params);
        this.applyClericSpellSlots(pc, 4);
        pc.improveAbilityScores(params.abilityScoreImprovement);
    }

    level5(pc: PlayerCharacter, params: LevelingParams): void {
        this.applyClericSpellSlots(pc, 5);
        // destroy undead
        const destroyUndead: ScalingTrait = { title: "Destroy Undead", description: "Challenge rating threshold for destroying undead that fail the saving throw against Turn Undead", challengeRating: 0.5 };
        // divine domain spells
        ClericArchetype.archetypeHelper[this.clericDomain][5](pc, params);
        this.pushClericFeatures(pc, 5);
    }

    level6(pc: PlayerCharacter, params: LevelingParams): void {
        this.applyClericSpellSlots(pc, 6);
        // channel divinity
        pc.findResourceTraitByName("Channel Divinity").resourceMax.value++;
        // divine domain
        ClericArchetype.archetypeHelper[this.clericDomain][6](pc, params);
    }

    level7(pc: PlayerCharacter, params: LevelingParams): void {
        this.applyClericSpellSlots(pc, 7);
        // divine domain spells
        ClericArchetype.archetypeHelper[this.clericDomain][7](pc, params);
    }

    level8(pc: PlayerCharacter, params: LevelingParams): void {
        this.applyClericSpellSlots(pc, 8);
        pc.improveAbilityScores(params.abilityScoreImprovement);
        // destroy undead
        pc.findScalingTraitByName("Destroy Undead").challengeRating = 1;
        // divine domain
        ClericArchetype.archetypeHelper[this.clericDomain][8](pc, params);
    }

    level9(pc: PlayerCharacter, params: LevelingParams): void {
        this.applyClericSpellSlots(pc, 9);
        // divine domain spells
        ClericArchetype.archetypeHelper[this.clericDomain][9](pc, params);
    }

    level10(pc: PlayerCharacter, params: LevelingParams): void {
        // cantrip
        this.handleClericSpellSelections(pc, params);
        this.applyClericSpellSlots(pc, 10);
        // divine intervention
        const divineIntervention: ResourceTrait = { title: "Divine Intervention", description: "Number of times your deity can intervene through a successful Divine Intervention. (Once per 7 days and a long rest)", resourceMax: {value: 1} }; 
        pc.addResourceTraits(divineIntervention);
        this.pushClericFeatures(pc, 10);
    }

    level11(pc: PlayerCharacter, params: LevelingParams): void {
        this.applyClericSpellSlots(pc, 11);
        // destroy undead
        pc.findScalingTraitByName("Destroy Undead").challengeRating++;
    }

    level12(pc: PlayerCharacter, params: LevelingParams): void {
        pc.improveAbilityScores(params.abilityScoreImprovement);
    }

    level13(pc: PlayerCharacter, params: LevelingParams): void {
        this.applyClericSpellSlots(pc, 13); 
    }

    level14(pc: PlayerCharacter, params: LevelingParams): void {
        // divine strike improvement where applicable
        if(!["KNOWLEDGE", "LIGHT"].includes(this.clericDomain)) {
            pc.findScalingTraitByName("Divine Strike").dice = "2d8";
        }
        // destroy undead
        pc.findScalingTraitByName("Destroy Undead").challengeRating++;
    }

    level15(pc: PlayerCharacter, params: LevelingParams): void {
        this.applyClericSpellSlots(pc, 15);
    }

    level16(pc: PlayerCharacter, params: LevelingParams): void {
        pc.improveAbilityScores(params.abilityScoreImprovement);
    }

    level17(pc: PlayerCharacter, params: LevelingParams): void {
        this.applyClericSpellSlots(pc, 17);
        // destroy undead
        pc.findScalingTraitByName("Destroy Undead").challengeRating++;
        // divine domain
        ClericArchetype.archetypeHelper[this.clericDomain][17](pc, params);
    }

    level18(pc: PlayerCharacter, params: LevelingParams): void {
        this.applyClericSpellSlots(pc, 18);
        // channel divinity
        pc.findResourceTraitByName("Channel Divinity").resourceMax.value++;
    }

    level19(pc: PlayerCharacter, params: LevelingParams): void {
        this.applyClericSpellSlots(pc, 19);
        pc.improveAbilityScores(params.abilityScoreImprovement);
    }

    level20(pc: PlayerCharacter, params: LevelingParams): void {
        this.applyClericSpellSlots(pc, 20);
    }   
}