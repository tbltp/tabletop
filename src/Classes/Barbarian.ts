import { PlayerClass, levelingParams } from './PlayerClass';
import { ResourceTrait, Trait } from '../Base/Interfaces';
import { PlayerCharacter } from '../Base/PlayerCharacter';
import * as ClassTraits from '../../Assets/ClassTraits.json';
import * as Archetypes from '../../Assets/Archetypes.json';
import * as Spells from '../../Assets/Spells.json';
import { BarbarianArchetype } from './Archetypes';

export class Barbarian extends PlayerClass {
    constructor(skillProficiencies: string[], weapons: string[], equipmentPack: string) {
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
    }
    /** TODO
     * Inventory is not done yet: FOUR JAVELINS, EXPLORER'S PACK
     * 12 + Constitution Modifier HP Max
     * UNARMORED DEFENSE and FAST MOVEMENT depends on equipped armor.
     * EXTRA ATTACK should be represented in action economy.
     * Primal Path LVL 10
     */

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

    primalPath: string;


    level1(pc: PlayerCharacter, params: levelingParams): void {
        con
        this.features.push(ClassTraits["RAGE"], ClassTraits["UNARMORED DEFENSE"]);
        pc.traits.features.push(ClassTraits["RAGE"], ClassTraits["UNARMORED DEFENSE"]);
        const rage: ResourceTrait = {title: "Rage", description: "Number of times you can go into a Rage.", resourceMax: 2, bonus: '+2'}; 
        pc.traits.resources.push(rage);
    }

    level2(pc: PlayerCharacter, params: levelingParams): void {
        //this.features.push(ClassTraits["RECKLESS ATTACK"], ClassTraits["DANGER SENSE"]);
        pc.traits.features.push(ClassTraits["RECKLESS ATTACK"], ClassTraits["DANGER SENSE"]);
    }

    level3(pc: PlayerCharacter, params: levelingParams): void {
        this.primalPath = params.archetypeSelection[0].archetype;
        BarbarianArchetype.archetypeHelper[`${this.primalPath}3`](pc, params);
        pc.findResourceTraitByName('resources', 'Rage')[0].resourceMax++;
    }
    
    level4(pc: PlayerCharacter, params: levelingParams): void {
        for(const ability of params.abilityScoreImprovement) { pc.abilityScores[ability.ability].update(ability.improvement); } 
    }

    level5(pc: PlayerCharacter, params: levelingParams): void {
        this.features.push(ClassTraits["EXTRA ATTACK"], ClassTraits["FAST MOVEMENT"]);
        pc.traits.features.push(ClassTraits["EXTRA ATTACK"], ClassTraits["FAST MOVEMENT"]);
    }
    level6(pc: PlayerCharacter, params: levelingParams): void {
        if(this.primalPath === "BERSERKER") {
            pc.traits.features.filter(resource => resource.title == this.primalPath)[0].description += `\n MINDLESS RAGE: ${Archetypes["BARBARIAN"]["BERSERKER"].features["MINDLESS RAGE"].description}`
        }
        else if(this.primalPath === "TOTEM WARRIOR"){ 
            pc.traits.features.filter(resource => resource.title == this.primalPath)[0].description += `\n ${params.archetypeSelection[0].options[0]}: Archetypes["BARBARIAN"]["TOTEM WARRIOR"].features[${params.archetypeSelection[0].options[0]}].description`
        }
        pc.findResourceTraitByName('resources', 'Rage')[0].resourceMax++;
    }

    level7(pc: PlayerCharacter, params: levelingParams): void {
        this.features.push(ClassTraits["FERAL INSTINCT"]);
        pc.traits.features.push(ClassTraits["FERAL INSTINCT"]);
    }

    level8(pc: PlayerCharacter, params: levelingParams): void {
        for(const ability of params.abilityScoreImprovement) { pc.abilityScores[ability.ability].update(ability.improvement); }
    }

    level9(pc: PlayerCharacter, params: levelingParams): void {
        this.features.push(ClassTraits["BRUTAL CRITICAL"]);
        pc.traits.features.push(ClassTraits["BRUTAL CRITICAL"]);
        pc.traits.resources.push(
            {title: "Brutal Critical", "description": "Number of extra damage dice on a critical hit.", resourceMax: Infinity, dice: "1dx"}
        )
        pc.findResourceTraitByName('resources', 'Rage')[0].bonus = "+3";
    }

    level10(pc: PlayerCharacter, params: levelingParams): void {
        // PATH FEATURE    
    }

    level11(pc: PlayerCharacter, params: levelingParams): void {
        this.features.push(ClassTraits["RELENTLESS RAGE"]);
        pc.traits.features.push(ClassTraits["RELENTLESS RAGE"]);
    }

    level12(pc: PlayerCharacter, params: levelingParams): void {
        for(const ability of params.abilityScoreImprovement) { pc.abilityScores[ability.ability].update(ability.improvement); }
        pc.findResourceTraitByName('resources', 'Rage')[0].resourceMax++;
    }

    level13(pc: PlayerCharacter, params: levelingParams): void {
        pc.traits.resources.filter(resource => resource.title == "Brutal Critical")[0].dice = "2dx";
        pc.traits.features.push( {title: "Brutal Critical (Level 13)", description: "You now roll 2 additional damage dice on critical hits."} )    
    }

    level14(pc: PlayerCharacter, params: levelingParams): void {
        // PATH FEATURE    
    }

    level15(pc: PlayerCharacter, params: levelingParams): void {
        this.features.push(ClassTraits["PERSISTENT RAGE"]);
        pc.traits.features.push(ClassTraits["PERSISTENT RAGE"]);
    }

    level16(pc: PlayerCharacter, params: levelingParams): void {
        for(const ability of params.abilityScoreImprovement) { pc.abilityScores[ability.ability].update(ability.improvement); }
        pc.findResourceTraitByName('resources', 'Rage')[0].bonus = "+4";
    }

    level17(pc: PlayerCharacter, params: levelingParams): void {
        pc.traits.resources.filter(resource => resource.title == "Brutal Critical")[0].dice = "3dx";
        pc.traits.features.push( {title: "Brutal Critical (Level 17)", description: "You now roll 3 additional damage dice on critical hits."} )
        pc.findResourceTraitByName('resources', 'Rage')[0].resourceMax++;
    }

    level18(pc: PlayerCharacter, params: levelingParams): void {
        this.features.push(ClassTraits["INDOMITABLE MIGHT"]);
        pc.traits.features.push(ClassTraits["IMDOMITABLE MIGHT"]);
    }

    level19(pc: PlayerCharacter, params: levelingParams): void {
        for(const ability of params.abilityScoreImprovement) { pc.abilityScores[ability.ability].update(ability.improvement); }
        pc.traits.resources[2].resourceMax++;
    }

    level20(pc: PlayerCharacter, params: levelingParams): void {
        this.features.push(ClassTraits["PRIMAL CHAMPION"]);
        pc.traits.features.push(ClassTraits["PRIMAL CHAMPION"]);
        pc.findResourceTraitByName('resources', 'Rage')[0].resourceMax = Infinity; 
    }
    
}

