import { PlayerClass, LevelingParams, SpellSlotFactory } from './PlayerClass';
import { PlayerCharacter } from '../Base/PlayerCharacter';
import { ResourceTrait } from '../Base/Interfaces';
import { ClericArchetype } from './Archetypes';
import * as SpellList from '../../Assets/SpellList.json'

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

    clericDomain: string;
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

    pushClericFeatures(pc: PlayerCharacter, level: string) {
        this.pushClassFeatures(pc, level, "CLERIC");
    }

    level1(pc: PlayerCharacter, params: LevelingParams): void {
        pc.addSpells([...params.spellSelection, ...SpellList["Cleric"]["1"]], "wisdom");
        const level1Slots: ResourceTrait = SpellSlotFactory.getSpellSlots(1, 2);
        pc.addResourceTraits(level1Slots);
        // cleric domain
        this.clericDomain = params.archetypeSelection[0].archetype;
        ClericArchetype.archetypeHelper[this.clericDomain]["1"](pc, params);
    }

    level2(pc: PlayerCharacter, params: LevelingParams): void {
        SpellSlotFactory.findPlayerSpellSlots(pc, 1).resourceMax.value++;
        // channel divinity
        const channelDivinity: ResourceTrait = {title: "Channel Divinity", description: "Number of times you can use a Channel Divinity ability.", resourceMax: {value: 1} }; 
        pc.addResourceTraits(channelDivinity);
        // cleric domain
        ClericArchetype.archetypeHelper[this.clericDomain]["2"](pc, params);
        this.pushClericFeatures(pc, "2");
    }

    level3(pc: PlayerCharacter, params: LevelingParams): void {
        SpellSlotFactory.findPlayerSpellSlots(pc, 1).resourceMax.value++;
        const level2Slots: ResourceTrait = SpellSlotFactory.getSpellSlots(2, 2);
        pc.addResourceTraits(level2Slots);
    }
    
    level4(pc: PlayerCharacter, params: LevelingParams): void {
        pc.addSpells(params.spellSelection, "wisdom");
        SpellSlotFactory.findPlayerSpellSlots(pc, 2).resourceMax.value++;
        pc.improveAbilityScores(params.abilityScoreImprovement);
    }

    level5(pc: PlayerCharacter, params: LevelingParams): void {
        const level3Slots: ResourceTrait = SpellSlotFactory.getSpellSlots(3, 2);
        pc.addResourceTraits(level3Slots);
        this.pushClericFeatures(pc, "5");
        //  Need to figure out how to track destroy undead CR - 1/2 (y)
    }

    level6(pc: PlayerCharacter, params: LevelingParams): void {
        pc.findResourceTraitByName("Channel Divinity").resourceMax.value++;
        ClericArchetype.archetypeHelper[this.clericDomain]["6"](pc, params);
    }

    level7(pc: PlayerCharacter, params: LevelingParams): void {
        
    }

    level8(pc: PlayerCharacter, params: LevelingParams): void {
        pc.improveAbilityScores(params.abilityScoreImprovement);
        // Update Destroy Undead -  CR 1
        ClericArchetype.archetypeHelper[this.clericDomain]["8"](pc, params);
    }

    level9(pc: PlayerCharacter, params: LevelingParams): void {
        
    }

    level10(pc: PlayerCharacter, params: LevelingParams): void {
        pc.addSpells(params.spellSelection, "wisdom");
    }

    level11(pc: PlayerCharacter, params: LevelingParams): void {
        // Update Destroy Undead - CR 2
    }

    level12(pc: PlayerCharacter, params: LevelingParams): void {
        pc.improveAbilityScores(params.abilityScoreImprovement);

    }

    level13(pc: PlayerCharacter, params: LevelingParams): void {
        
    }

    level14(pc: PlayerCharacter, params: LevelingParams): void {
        // Update Destroy Undead - CR 3
    }

    level15(pc: PlayerCharacter, params: LevelingParams): void {
       
    }

    level16(pc: PlayerCharacter, params: LevelingParams): void {
        pc.improveAbilityScores(params.abilityScoreImprovement);
    }

    level17(pc: PlayerCharacter, params: LevelingParams): void {
        // Update Destroy Undead - CR 4
        ClericArchetype.archetypeHelper[this.clericDomain]["17"](pc, params);
    }

    level18(pc: PlayerCharacter, params: LevelingParams): void {
        pc.findResourceTraitByName("Channel Divinity").resourceMax.value++;
    }

    level19(pc: PlayerCharacter, params: LevelingParams): void {
        pc.improveAbilityScores(params.abilityScoreImprovement);
    }

    level20(pc: PlayerCharacter, params: LevelingParams): void {
        this.pushClericFeatures(pc, "20");
    }
    
}