import { PlayerClass, LevelingParams } from './PlayerClass';
import { ResourceTrait, Trait } from '../Base/Interfaces';
import { PlayerCharacter } from '../Base/PlayerCharacter';
import * as ClassTraits from '../../Assets/ClassTraits.json';
import { BarbarianArchetype } from './Archetypes';

export class Barbarian extends PlayerClass {
    constructor(skillProficiencies: string[], weapons: string[]) {
        super(
            "Barbarian",
            [], 
            skillProficiencies, 
            ["Simple", "Martial"], 
            ["Light", "Medium", "Shield"], 
            [],
            weapons, 
            [],
            [],
            [],
            {isNoInput: true},
            "d12",
            ["strength", "constitution"]
        );

        for(let level in this.abilitiesAtLevels) {
            
            const func: Function = this.abilitiesAtLevels[level];
            this.abilitiesAtLevels[level] = func.bind(this);
        }

    }
    /** TODO
     * Version control on rage and brutal critical (what level are they currently?)
     * Set the new maximum of 24 on str/con ability scores for lvl 20
     * Inventory is not done yet: FOUR JAVELINS, EXPLORER'S PACK
     * 12 + Constitution Modifier HP Max
     * UNARMORED DEFENSE and FAST MOVEMENT depends on equipped armor.
     * EXTRA ATTACK should be represented in action economy.
     */

    primalPath: string;
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
        "20": this.level20
    }
    
    pushBarbarianFeatures(pc: PlayerCharacter, level: string) {
        this.pushClassFeatures(pc, level, "BARBARIAN");
    }

    level1(pc: PlayerCharacter, params: LevelingParams): void {
        this.pushBarbarianFeatures(pc, "1");
        const rage: ResourceTrait = {title: "Rage", description: "Number of times you can go into a Rage.  Bonus applies to attack damage while in a rage.", resourceMax: 2, bonus: '+2'}; 
        pc.addResourceTraits(rage);
    }

    level2(pc: PlayerCharacter, params: LevelingParams): void {
        this.pushBarbarianFeatures(pc, "2");
    }

    level3(pc: PlayerCharacter, params: LevelingParams): void {
        this.primalPath = params.archetypeSelection[0].archetype;
        BarbarianArchetype.archetypeHelper[this.primalPath][3](pc, params);
        pc.findResourceTraitByName('Rage').resourceMax++;
    }
    
    level4(pc: PlayerCharacter, params: LevelingParams): void {
        pc.improveAbilityScores(params.abilityScoreImprovement);
    }

    level5(pc: PlayerCharacter, params: LevelingParams): void {
        this.pushBarbarianFeatures(pc, "5");
    }

    level6(pc: PlayerCharacter, params: LevelingParams): void {
        BarbarianArchetype.archetypeHelper[this.primalPath][6](pc, params);
        pc.findResourceTraitByName('Rage').resourceMax++;
    }

    level7(pc: PlayerCharacter, params: LevelingParams): void {
        this.pushBarbarianFeatures(pc, "7");
    }

    level8(pc: PlayerCharacter, params: LevelingParams): void {
        pc.improveAbilityScores(params.abilityScoreImprovement);
    }

    level9(pc: PlayerCharacter, params: LevelingParams): void {
        this.pushBarbarianFeatures(pc, "9");
        const brutalCritical: ResourceTrait = {title: "Brutal Critical", "description": "Number of extra damage dice on a critical hit.", resourceMax: Infinity, dice: "1dx"};
        pc.addResourceTraits(brutalCritical);
        pc.findResourceTraitByName('Rage').bonus = "+3";
    }

    level10(pc: PlayerCharacter, params: LevelingParams): void {
        BarbarianArchetype.archetypeHelper[this.primalPath][10](pc, params);
    }

    level11(pc: PlayerCharacter, params: LevelingParams): void {
        this.pushBarbarianFeatures(pc, '11');
    }

    level12(pc: PlayerCharacter, params: LevelingParams): void {
        pc.improveAbilityScores(params.abilityScoreImprovement);
        pc.findResourceTraitByName('Rage').resourceMax++;
    }

    level13(pc: PlayerCharacter, params: LevelingParams): void {
        pc.findResourceTraitByName('Brutal Critical').dice = "2dx";
        //pc.traits.features.push( {title: "Brutal Critical (Level 13)", description: "You now roll 2 additional damage dice on critical hits."} )    
        //^I'd prefer to not add more features with the same name if the functionality is unchanged
    }

    level14(pc: PlayerCharacter, params: LevelingParams): void {
        BarbarianArchetype.archetypeHelper[this.primalPath][14](pc, params);
    }

    level15(pc: PlayerCharacter, params: LevelingParams): void {
        this.pushBarbarianFeatures(pc, '15');
    }

    level16(pc: PlayerCharacter, params: LevelingParams): void {
        pc.improveAbilityScores(params.abilityScoreImprovement);
        pc.findResourceTraitByName('Rage').bonus = "+4";
    }

    level17(pc: PlayerCharacter, params: LevelingParams): void {
        pc.findResourceTraitByName('Brutal Critical').dice = "3dx";
        //pc.traits.features.push( {title: "Brutal Critical (Level 17)", description: "You now roll 3 additional damage dice on critical hits."} )
        pc.findResourceTraitByName('Rage').resourceMax++;
    }

    level18(pc: PlayerCharacter, params: LevelingParams): void {
        this.pushBarbarianFeatures(pc, '18');
    }

    level19(pc: PlayerCharacter, params: LevelingParams): void {
        pc.improveAbilityScores(params.abilityScoreImprovement);
    }

    level20(pc: PlayerCharacter, params: LevelingParams): void {
        this.pushBarbarianFeatures(pc, '20');
        pc.improveAbilityScores([
            {
                ability: 'strength',
                improvement: 4
            },
            {
                ability: 'constitution',
                improvement: 4
            },
        ]);
        //How to set new maximum of ability scores??
        pc.findResourceTraitByName('Rage').resourceMax = Infinity;
    }
    
}
