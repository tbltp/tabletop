import { PlayerClass, LevelingParams } from './PlayerClass';
import { PlayerCharacter } from '../Base/PlayerCharacter';
import {ISpell, Spell} from '../Base/Interfaces';
import * as ClassTraits from '../../Assets/ClassTraits.json';
import * as Spells from '../../Assets/Spells.json';
import { ClericArchetype, DruidArchetype } from './Archetypes';

export class Druid extends PlayerClass {

    constructor(skillProficiencies: string[], weapons: string[], druidParams: LevelingParams, equipmentPack: string){ 
        super(
            "Cleric",
            [],
            skillProficiencies, 
            ["Greatclub", "Handclub", "Darts", "Javelin", "Mace", "Quarterstaff", "Scimitar", "Sickle", "Sling", "Spear"],
            ["Light", "Medium", "Shield"],
            ["Herbalism Kit"],
            [],
            [],
            [],
            [],
            druidParams,
            "d8",
            ["Intelligence", "Wisdom"]
        );
    }

    /** TODO
     * ADD SPELL SLOTS
     * FIGURE OUT HOW TO REPRESENT NUMBER OF PREPARED SPELLS.
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

    /** TODO:
     * 
     */

    pushDruidFeatures(pc: PlayerCharacter, level: string) {
        this.pushClassFeatures(pc, level, "DRUID");
    }

    level1(pc: PlayerCharacter, params: LevelingParams): void {
        pc.addSpells(params.spellSelection, "wisdom");
        this.pushDruidFeatures(pc, "1");
        // SPELL SLOTS
    }

    level2(pc: PlayerCharacter, params: LevelingParams): void {
        this.druidCircle = params.archetypeSelection[0].archetype;
        DruidArchetype.archetypeHelper[this.druidCircle]["2"](pc, params);

        this.pushDruidFeatures(pc, "2");
        pc.addResourceTraits({"title": "Wild Shape", "description": "", resourceMax: 2}) // ADD CHALLENGE RATING
        // SPELL SLOTS
    }

    level3(pc: PlayerCharacter, params: LevelingParams): void {
        // SPELL SLOTS
        if(this.druidCircle == "LAND"){
            DruidArchetype.archetypeHelper[this.druidCircle]["3"](pc, params);
        }
    }
    
    level4(pc: PlayerCharacter, params: LevelingParams): void {
        pc.improveAbilityScores(params.abilityScoreImprovement);
        // IMPROVE WILD SHAPE
    }

    level5(pc: PlayerCharacter, params: LevelingParams): void {
        if(this.druidCircle == "LAND"){
            DruidArchetype.archetypeHelper[this.druidCircle]["5"](pc, params);
        }
    }

    level6(pc: PlayerCharacter, params: LevelingParams): void {
        DruidArchetype.archetypeHelper[this.druidCircle]["9"](pc, params);
    }

    level7(pc: PlayerCharacter, params: LevelingParams): void {
        if(this.druidCircle == "LAND"){
            DruidArchetype.archetypeHelper[this.druidCircle]["7"](pc, params);
        }
    }

    level8(pc: PlayerCharacter, params: LevelingParams): void {
        pc.improveAbilityScores(params.abilityScoreImprovement);
        // IMPROVE WILD SHAPE
    }

    level9(pc: PlayerCharacter, params: LevelingParams): void {
        if(this.druidCircle == "LAND"){
            DruidArchetype.archetypeHelper[this.druidCircle]["9"](pc, params);
        }
    }

    level10(pc: PlayerCharacter, params: LevelingParams): void {
        DruidArchetype.archetypeHelper[this.druidCircle]["9"](pc, params);
    }

    level11(pc: PlayerCharacter, params: LevelingParams): void {

    }

    level12(pc: PlayerCharacter, params: LevelingParams): void {
        pc.improveAbilityScores(params.abilityScoreImprovement);
    }

    level13(pc: PlayerCharacter, params: LevelingParams): void {
        
    }

    level14(pc: PlayerCharacter, params: LevelingParams): void {

    }

    level15(pc: PlayerCharacter, params: LevelingParams): void {
       
    }

    level16(pc: PlayerCharacter, params: LevelingParams): void {
        pc.improveAbilityScores(params.abilityScoreImprovement);
    }

    level17(pc: PlayerCharacter, params: LevelingParams): void {

    }

    level18(pc: PlayerCharacter, params: LevelingParams): void {
        this.pushDruidFeatures(pc, "18");
    }

    level19(pc: PlayerCharacter, params: LevelingParams): void {
        pc.improveAbilityScores(params.abilityScoreImprovement);
    }

    level20(pc: PlayerCharacter, params: LevelingParams): void {
        this.pushDruidFeatures(pc, "20");
    }
    
}