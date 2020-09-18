import { PlayerClass, LevelingParams, SpellSlotFactory } from './PlayerClass';
import { PlayerCharacter } from '../Base/PlayerCharacter';
import { ResourceTrait } from '../Base/Interfaces';
import * as SpellList from '../../Assets/SpellList.json';
import { DruidArchetype } from './Archetypes';

export class Druid extends PlayerClass {

    constructor(skillProficiencies: string[], weapons: string[], armor: string[], druidParams: LevelingParams){ 
        super(
            "Druid",
            [],
            skillProficiencies, 
            ["Club", "Darts", "Javelin", "Mace", "Quarterstaff", "Scimitar", "Sickle", "Sling", "Spear"],
            ["Light", "Medium", "Shield"],
            ["Herbalism Kit"],
            weapons,
            [...armor, "LEATHER"],
            [],
            [],
            druidParams,
            "d8",
            8,
            ["intelligence", "wisdom"]
        );

        this.equipmentPack = "EXPLORER"

        for(let level in this.abilitiesAtLevels) {
            const func: Function = this.abilitiesAtLevels[level];
            this.abilitiesAtLevels[level] = func.bind(this);
        }
    }

    /** TODO
     * FIGURE OUT HOW TO REPRESENT NUMBER OF PREPARED SPELLS.
     * MISSING CLASS FEATURES AFTER LEVEL 1
     * MISSING CIRCLE OF LAND SPELLS, REPRESENTING CIRCLE OF LAND TERRAIN
     */

    druidCircle: string;

    
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

    pushDruidFeatures(pc: PlayerCharacter, level: string) {
        this.pushClassFeatures(pc, level, "DRUID");
    }

    level1(pc: PlayerCharacter, params: LevelingParams): void {
        pc.addSpells([...params.spellSelection, ...SpellList["Druid"]["1"]], "wisdom");
        this.pushDruidFeatures(pc, "1");
        const level1Slots: ResourceTrait = SpellSlotFactory.getSpellSlots(1, 2);
        pc.addResourceTraits(level1Slots); 
    }

    level2(pc: PlayerCharacter, params: LevelingParams): void {
        this.druidCircle = params.archetypeSelection[0].archetype;
        DruidArchetype.archetypeHelper[this.druidCircle]["2"](pc, params);

        this.pushDruidFeatures(pc, "2");
        pc.addResourceTraits({"title": "Wild Shape", "description": "Number of times you can Wild Shape", resourceMax: {value: 2}}) // ADD CHALLENGE RATING

        SpellSlotFactory.findPlayerSpellSlots(pc, 1).resourceMax.value++;
        
    }

    level3(pc: PlayerCharacter, params: LevelingParams): void {
        const level2Slots: ResourceTrait = SpellSlotFactory.getSpellSlots(2, 2);
        pc.addResourceTraits(level2Slots)
        SpellSlotFactory.findPlayerSpellSlots(pc, 1).resourceMax.value++;

        if(this.druidCircle == "LAND"){
            DruidArchetype.archetypeHelper[this.druidCircle]["3"](pc, params);
        }
    }
    
    level4(pc: PlayerCharacter, params: LevelingParams): void {
        SpellSlotFactory.findPlayerSpellSlots(pc, 2).resourceMax.value++;
        pc.addSpells(params.spellSelection, "wisdom");
        pc.improveAbilityScores(params.abilityScoreImprovement);
        // IMPROVE WILD SHAPE
    }

    level5(pc: PlayerCharacter, params: LevelingParams): void {
        const level3Slots: ResourceTrait = SpellSlotFactory.getSpellSlots(3, 2);
        pc.addResourceTraits(level3Slots);

        if(this.druidCircle == "LAND"){
            DruidArchetype.archetypeHelper[this.druidCircle]["5"](pc, params);
        }
    }

    level6(pc: PlayerCharacter, params: LevelingParams): void {
        SpellSlotFactory.findPlayerSpellSlots(pc, 3).resourceMax.value++;
        DruidArchetype.archetypeHelper[this.druidCircle]["6"](pc, params);
    }

    level7(pc: PlayerCharacter, params: LevelingParams): void {
        const level4Slots: ResourceTrait = SpellSlotFactory.getSpellSlots(4, 1);
        pc.addResourceTraits(level4Slots);

        if(this.druidCircle == "LAND"){
            DruidArchetype.archetypeHelper[this.druidCircle]["7"](pc, params);
        }
    }

    level8(pc: PlayerCharacter, params: LevelingParams): void {
        SpellSlotFactory.findPlayerSpellSlots(pc, 4).resourceMax.value++;
        pc.improveAbilityScores(params.abilityScoreImprovement);
        // IMPROVE WILD SHAPE
    }

    level9(pc: PlayerCharacter, params: LevelingParams): void {
        const level5Slots: ResourceTrait = SpellSlotFactory.getSpellSlots(5, 1);
        pc.addResourceTraits(level5Slots)
        SpellSlotFactory.findPlayerSpellSlots(pc, 4).resourceMax.value++;

        if(this.druidCircle == "LAND"){
            DruidArchetype.archetypeHelper[this.druidCircle]["9"](pc, params);
        }
    }

    level10(pc: PlayerCharacter, params: LevelingParams): void {
        SpellSlotFactory.findPlayerSpellSlots(pc, 5).resourceMax.value++;
        DruidArchetype.archetypeHelper[this.druidCircle]["10"](pc, params);
    }

    level11(pc: PlayerCharacter, params: LevelingParams): void {
        const level6Slots: ResourceTrait = SpellSlotFactory.getSpellSlots(6, 1);
        pc.addResourceTraits(level6Slots)
    }

    level12(pc: PlayerCharacter, params: LevelingParams): void {
        pc.improveAbilityScores(params.abilityScoreImprovement);
    }

    level13(pc: PlayerCharacter, params: LevelingParams): void {
        const level7Slots: ResourceTrait = SpellSlotFactory.getSpellSlots(7, 1);
        pc.addResourceTraits(level7Slots)
    }

    level14(pc: PlayerCharacter, params: LevelingParams): void {

    }

    level15(pc: PlayerCharacter, params: LevelingParams): void {
        const level8Slots: ResourceTrait = SpellSlotFactory.getSpellSlots(8, 1);
        pc.addResourceTraits(level8Slots)
    }

    level16(pc: PlayerCharacter, params: LevelingParams): void {
        pc.improveAbilityScores(params.abilityScoreImprovement);
    }

    level17(pc: PlayerCharacter, params: LevelingParams): void {
        const level9Slots: ResourceTrait = SpellSlotFactory.getSpellSlots(9, 1);
        pc.addResourceTraits(level9Slots)
    }

    level18(pc: PlayerCharacter, params: LevelingParams): void {
        SpellSlotFactory.findPlayerSpellSlots(pc, 5).resourceMax.value++;
        this.pushDruidFeatures(pc, "18");
    }

    level19(pc: PlayerCharacter, params: LevelingParams): void {
        SpellSlotFactory.findPlayerSpellSlots(pc, 6).resourceMax.value++;
        pc.improveAbilityScores(params.abilityScoreImprovement);
    }

    level20(pc: PlayerCharacter, params: LevelingParams): void {
        SpellSlotFactory.findPlayerSpellSlots(pc, 7).resourceMax.value++;
        this.pushDruidFeatures(pc, "20");
    }
    
}