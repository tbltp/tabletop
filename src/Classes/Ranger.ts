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
     */

	favoredEnemy: string;
	favoredTerrain: string;
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
		this.favoredEnemy = params.favoredEnemy;
		this.favoredTerrain = this.favoredTerrain;

		PlayerClass.pushCustomizedClassFeature(pc, "1", "RANGER", "FAVORED ENEMY", [params.favoredEnemy])
        PlayerClass.pushCustomizedClassFeature(pc, "1", "RANGER", "NATURAL EXPLORER", [params.favoredTerrain])
    }

    level2(pc: PlayerCharacter, params: LevelingParams): void {
        
    }

    level3(pc: PlayerCharacter, params: LevelingParams): void {
        
    }
    
    level4(pc: PlayerCharacter, params: LevelingParams): void {
       
    }

    level5(pc: PlayerCharacter, params: LevelingParams): void {
    
    }

    level6(pc: PlayerCharacter, params: LevelingParams): void {
       
    }

    level7(pc: PlayerCharacter, params: LevelingParams): void {
        
    }

    level8(pc: PlayerCharacter, params: LevelingParams): void {
        
    }

    level9(pc: PlayerCharacter, params: LevelingParams): void {
        
    }

    level10(pc: PlayerCharacter, params: LevelingParams): void {
        
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
        
    }

    level19(pc: PlayerCharacter, params: LevelingParams): void {
        
    }

    level20(pc: PlayerCharacter, params: LevelingParams): void {
        
    }
    
}

interface RangerParams extends LevelingParams {
	favoredEnemy?: string;
	favoredTerrain?: string;
}