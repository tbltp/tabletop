import { PlayerClass, LevelingParams } from './PlayerClass';
import { PlayerCharacter } from '../Base/PlayerCharacter';
import { ResourceTrait, ScalingTrait } from '../Base/Interfaces';
import * as SpellList from '../../Assets/SpellList.json';
import * as SpellcastingAbility from '../../Assets/SpellcastingAbility.json';
import { DruidArchetype } from './Archetypes';
import { SpellSlotFactory } from './SpellSlotFactory';

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
     */

    druidCircle: string = "";
    terrain?: string | null = null; 
    
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

    private pushDruidFeatures(pc: PlayerCharacter, level: number) {
        this.pushClassFeatures(pc, level, "DRUID");
    }

    private handleDruidSpellSelections(pc: PlayerCharacter, params: LevelingParams) {
        this.handleSpellSelections(pc, params, SpellcastingAbility["DRUID"]);
    }

    private applyDruidSpellSlots(pc: PlayerCharacter, level: number) {
        SpellSlotFactory.applySpellSlotsAtLevel(pc, level, "PRIMARY");
    }

    level1(pc: PlayerCharacter, params: LevelingParams): void {
        pc.addSpells([...params.spellSelection, ...SpellList["Druid"][1]], SpellcastingAbility["DRUID"]);
        this.applyDruidSpellSlots(pc, 1);
        this.pushDruidFeatures(pc, 1);
        let druidPreparedSpells = {title: "Druid", level: this.level, modifier: pc.abilityScores.wisdom.modifier};
        (pc.preparedSpells) ? pc.preparedSpells.push(druidPreparedSpells) : pc.preparedSpells = [druidPreparedSpells];
    }

    level2(pc: PlayerCharacter, params: LevelingParams): void {
        this.applyDruidSpellSlots(pc, 2);
        // druid circle
        this.druidCircle = params.archetypeSelection[0].archetype;
        DruidArchetype.archetypeHelper[this.druidCircle][2](pc, params);
        // terrain selection
        if(this.druidCircle == "LAND") {
            this.terrain = params.archetypeSelection[0].options[0];
        }
        // wild shape
        const wildShapeRes: ResourceTrait = {title: "Wild Shape", description: "Number of times you can Wild Shape", resourceMax: {value: 2}};
        const wildShapeScale: ScalingTrait = {title: "Wild Shape", description: "Max challenge rating of beasts you can Wild Shape into (No flying or swimming speed).", challengeRating: .25 };
        pc.addResourceTraits(wildShapeRes); 
        pc.addScalingTraits(wildShapeScale);

        this.pushDruidFeatures(pc, 2);
    }

    level3(pc: PlayerCharacter, params: LevelingParams): void {
        this.applyDruidSpellSlots(pc, 3);
        // terrain spells
        if(this.druidCircle == "LAND"){
            DruidArchetype.archetypeHelper[this.druidCircle][3]
            DruidArchetype.getTerrainSpells(pc, this.terrain, "3");
        }
    }
    
    level4(pc: PlayerCharacter, params: LevelingParams): void {
        this.handleDruidSpellSelections(pc, params);
        this.applyDruidSpellSlots(pc, 4);
        pc.improveAbilityScores(params.abilityScoreImprovement);
        // wild shape
        const wildShapeScale: ScalingTrait = pc.findScalingTraitByName("Wild Shape");
        wildShapeScale.challengeRating = .5;
        wildShapeScale.description = "Max challenge rating of beasts you can Wild Shape into (No flying speed).";
    }

    level5(pc: PlayerCharacter, params: LevelingParams): void {
        this.applyDruidSpellSlots(pc, 5);
        // terrain spells
        if(this.druidCircle == "LAND"){
            DruidArchetype.getTerrainSpells(pc, this.terrain, "5");
        }
    }

    level6(pc: PlayerCharacter, params: LevelingParams): void {
        this.applyDruidSpellSlots(pc, 6);
        // druid circle
        DruidArchetype.archetypeHelper[this.druidCircle][6](pc, params);
    }

    level7(pc: PlayerCharacter, params: LevelingParams): void {
        this.applyDruidSpellSlots(pc, 7);
        // terrain spells
        if(this.druidCircle == "LAND"){
            DruidArchetype.getTerrainSpells(pc, this.terrain, "7");
        }
    }

    level8(pc: PlayerCharacter, params: LevelingParams): void {
        this.applyDruidSpellSlots(pc, 8);
        pc.improveAbilityScores(params.abilityScoreImprovement);
        // wild shape
        const wildShapeScale: ScalingTrait = pc.findScalingTraitByName("Wild Shape");
        wildShapeScale.challengeRating = 1;
        wildShapeScale.description = "Max challenge rating of beasts you can Wild Shape into.";
    }

    level9(pc: PlayerCharacter, params: LevelingParams): void {
        this.applyDruidSpellSlots(pc, 9);
        // terrain spells
        if(this.druidCircle == "LAND"){
            DruidArchetype.getTerrainSpells(pc, this.terrain, "9");
        }
    }

    level10(pc: PlayerCharacter, params: LevelingParams): void {
        this.applyDruidSpellSlots(pc, 10);
        // druid circle
        DruidArchetype.archetypeHelper[this.druidCircle][10](pc, params);
    }

    level11(pc: PlayerCharacter, params: LevelingParams): void {
        this.applyDruidSpellSlots(pc, 11);
    }

    level12(pc: PlayerCharacter, params: LevelingParams): void {
        pc.improveAbilityScores(params.abilityScoreImprovement);
    }

    level13(pc: PlayerCharacter, params: LevelingParams): void {
        this.applyDruidSpellSlots(pc, 13);
    }

    level14(pc: PlayerCharacter, params: LevelingParams): void {
        // druid circle
        DruidArchetype.archetypeHelper[this.druidCircle][14](pc, params);
    }

    level15(pc: PlayerCharacter, params: LevelingParams): void {
        this.applyDruidSpellSlots(pc, 15);
    }

    level16(pc: PlayerCharacter, params: LevelingParams): void {
        pc.improveAbilityScores(params.abilityScoreImprovement);
    }

    level17(pc: PlayerCharacter, params: LevelingParams): void {
        this.applyDruidSpellSlots(pc, 17);
    }

    level18(pc: PlayerCharacter, params: LevelingParams): void {
        this.applyDruidSpellSlots(pc, 18);
    }

    level19(pc: PlayerCharacter, params: LevelingParams): void {
        this.applyDruidSpellSlots(pc, 19);
        pc.improveAbilityScores(params.abilityScoreImprovement);
    }

    level20(pc: PlayerCharacter, params: LevelingParams): void {
        this.applyDruidSpellSlots(pc, 20);
        // archdruid
        pc.findResourceTraitByName("Wild Shape").resourceMax.value = Infinity;
        this.pushDruidFeatures(pc, 20);
    }
    
}