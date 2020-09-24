import { PlayerClass, LevelingParams, SpellSlotFactory } from './PlayerClass';
import { PlayerCharacter } from '../Base/PlayerCharacter';
import { ResourceTrait } from '../Base/Interfaces';
import * as SpellList from '../../Assets/SpellList.json';
import { PaladinArchetype } from './Archetypes';

export class Warlock extends PlayerClass {

    constructor(skillProficiencies: string[], weapons: string[], params: LevelingParams, equipmentPack: string){ 
        super(
            "Paladin",
            [],
            skillProficiencies, 
            ["Simple"],
            ["Light"],
            [],
            [...weapons, "DAGGER", "DAGGER"],
            ["LEATHER"],
            [],
            [],
            params,
            "d8",
            8,
            ["wisdom", "charisma"]
        );

        this.equipmentPack = equipmentPack

        for(let level in this.abilitiesAtLevels) {
            const func: Function = this.abilitiesAtLevels[level];
            this.abilitiesAtLevels[level] = func.bind(this);
        }
    }

    /** TODO
     * ARCANE FOCUS / COMPONENT POUCH
     */

	paladinOath: string;

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

    pushPaladinFeatures(pc: PlayerCharacter, level: number) {
        this.pushClassFeatures(pc, level, "WARLOCK");
    }

    level1(pc: PlayerCharacter, params: LevelingParams): void {
        
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
        
    }

    level13(pc: PlayerCharacter, params: LevelingParams): void {
        
    }

    level14(pc: PlayerCharacter, params: LevelingParams): void {
        
    }

    level15(pc: PlayerCharacter, params: LevelingParams): void {
        
    }

    level16(pc: PlayerCharacter, params: LevelingParams): void {
        
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