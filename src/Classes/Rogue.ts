import { PlayerClass, LevelingParams, SpellSlotFactory } from './PlayerClass';
import { PlayerCharacter } from '../Base/PlayerCharacter';
import { ResourceTrait } from '../Base/Interfaces';
import * as SpellList from '../../Assets/SpellList.json';
import { PaladinArchetype, RogueArchetype } from './Archetypes';

export class Rogue extends PlayerClass {

    constructor(skillProficiencies: string[], weapons: string[], params: LevelingParams, equipmentPack: string){ 
        super(
            "Paladin",
            [],
            skillProficiencies, 
            ["Simple", "Crossbow, hand", "Longsword", "Rapier", "Shortsword"],
            ["Light"],
            ["Thieves' Tools"],
            [...weapons, "DAGGER", "DAGGER"],
            ["LEATHER"],
            [],
            ["THIEVES' TOOLS"],
            params,
            "d8",
            8,
            ["dexterity", "intelligence"]
        );

        this.equipmentPack = equipmentPack

        for(let level in this.abilitiesAtLevels) {
            const func: Function = this.abilitiesAtLevels[level];
            this.abilitiesAtLevels[level] = func.bind(this);
        }
    }

    /** TODO
     * 
     */

	roguishArchetype: string;

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

    pushRogueFeatures(pc: PlayerCharacter, level: number) {
        this.pushClassFeatures(pc, level, "ROGUE");
    }

    level1(pc: PlayerCharacter, params: LevelingParams): void {
        PlayerClass.pushCustomizedClassFeature(pc, 1, "ROGUE", "EXPERTISE", params.proficiencySelection)
        // Expertise
        for(const proficiency of params.proficiencySelection){
            pc.skills[proficiency].expertise = true;
        }
        // Sneak Attack
        pc.addScalingTraits({title: "Sneak Attack", description: "Dice used for Sneak Attack", dice: "1d6"});
        this.pushRogueFeatures(pc, 1);
    }

    level2(pc: PlayerCharacter, params: LevelingParams): void {
        this.pushRogueFeatures(pc, 2);
    }

    level3(pc: PlayerCharacter, params: LevelingParams): void {
        this.roguishArchetype = params.archetypeSelection[0].archetype;
        RogueArchetype.archetypeHelper[this.roguishArchetype][3](pc, params);

        pc.findScalingTraitByName("Sneak Attack").dice = "2d6";
    }
    
    level4(pc: PlayerCharacter, params: LevelingParams): void {
       pc.improveAbilityScores(params.abilityScoreImprovement);
    }

    level5(pc: PlayerCharacter, params: LevelingParams): void {
        this.pushRogueFeatures(pc, 5);
        pc.findScalingTraitByName("Sneak Attack").dice = "3d6";
    }

    level6(pc: PlayerCharacter, params: LevelingParams): void {
        pc.findFeatureTraitByName("EXPERTISE").choices.push(...params.proficiencySelection);

        // Expertise
        for(const proficiency of params.proficiencySelection){
            pc.skills[proficiency].expertise = true;
        }
    }

    level7(pc: PlayerCharacter, params: LevelingParams): void {
       this.pushRogueFeatures(pc, 7);
       pc.findScalingTraitByName("Sneak Attack").dice = "4d6";
    }

    level8(pc: PlayerCharacter, params: LevelingParams): void {
        pc.improveAbilityScores(params.abilityScoreImprovement);
    }

    level9(pc: PlayerCharacter, params: LevelingParams): void {
        pc.findScalingTraitByName("Sneak Attack").dice = "5d6";
        RogueArchetype.archetypeHelper[this.roguishArchetype][9](pc, params);
    }

    level10(pc: PlayerCharacter, params: LevelingParams): void {
        pc.improveAbilityScores(params.abilityScoreImprovement);
    }

    level11(pc: PlayerCharacter, params: LevelingParams): void {
        this.pushRogueFeatures(pc, 11);
        pc.findScalingTraitByName("Sneak Attack").dice = "6d6";
    }

    level12(pc: PlayerCharacter, params: LevelingParams): void {
        pc.improveAbilityScores(params.abilityScoreImprovement);
    }

    level13(pc: PlayerCharacter, params: LevelingParams): void {
        pc.findScalingTraitByName("Sneak Attack").dice = "7d6";
        RogueArchetype.archetypeHelper[this.roguishArchetype][13](pc, params);
    }

    level14(pc: PlayerCharacter, params: LevelingParams): void {
        this.pushRogueFeatures(pc, 14);
    }

    level15(pc: PlayerCharacter, params: LevelingParams): void {
        this.pushRogueFeatures(pc, 15);
        // Slippery Mind
        pc.abilityScores.wisdom.savingThrowProficiency = true;
        pc.findScalingTraitByName("Sneak Attack").dice = "8d6";
    }

    level16(pc: PlayerCharacter, params: LevelingParams): void {
        pc.improveAbilityScores(params.abilityScoreImprovement);
    }

    level17(pc: PlayerCharacter, params: LevelingParams): void {
        pc.findScalingTraitByName("Sneak Attack").dice = "9d6";
        RogueArchetype.archetypeHelper[this.roguishArchetype][17](pc, params);
    }

    level18(pc: PlayerCharacter, params: LevelingParams): void {
        this.pushRogueFeatures(pc, 18);
    }

    level19(pc: PlayerCharacter, params: LevelingParams): void {
        pc.improveAbilityScores(params.abilityScoreImprovement);
        pc.findScalingTraitByName("Sneak Attack").dice = "10d6";
    }

    level20(pc: PlayerCharacter, params: LevelingParams): void {
        this.pushRogueFeatures(pc, 20);
    }
    
}