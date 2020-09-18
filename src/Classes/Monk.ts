import { PlayerClass, LevelingParams, SpellSlotFactory } from './PlayerClass';
import { PlayerCharacter } from '../Base/PlayerCharacter';
import { ResourceTrait } from '../Base/Interfaces';
import * as Languages from '../../Assets/Languages.json';
import { RangerArchetype, MonkArchetype } from './Archetypes';

export class Monk extends PlayerClass {

    constructor(skillProficiencies: string[], weapons: string[], toolKitProficiency: string[], levelingParams: LevelingParams, equipmentPack: string){ 
        super(
            "Monk",
            [],
            skillProficiencies, 
            ["Simple", "Shortsword"],
            [],
            toolKitProficiency,
            [...weapons, "DART", "DART", "DART", "DART", "DART", "DART" , "DART", "DART", "DART", "DART"],
            [],
            [],
            [],
            levelingParams,
            "d8",
            8,
            ["strength", "dexterity"]
        );

        this.equipmentPack = equipmentPack

        for(let level in this.abilitiesAtLevels) {
            const func: Function = this.abilitiesAtLevels[level];
            this.abilitiesAtLevels[level] = func.bind(this);
        }
    }

    /** TODO
     * MONASTIC TRADITION IMPLEMENTATION
     * UNARMORED MOVEMENT (NEED LIST OF SPEEDS IN PC)
     * MARTIAL ARTS DIE SCALING TRAIT
     */

	monasticTradition: string;

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

    pushMonkFeatures(pc: PlayerCharacter, level: string) {
        this.pushClassFeatures(pc, level, "MONK");
    }

    level1(pc: PlayerCharacter, params: LevelingParams): void {
        this.pushMonkFeatures(pc, "1");
        pc.armorClasses.push({ name: "Unarmored Defense", base: 0, modifier: {value: 1}, bonus: {value: 0}}) // TWO STATS

    }

    level2(pc: PlayerCharacter, params: LevelingParams): void {
        this.pushMonkFeatures(pc, "2");
        // ADD 10 TO SPEED FOR UNARMORED MOVEMENT
        pc.traits.resources.push( { title: "Ki Points", description: "Number of times you can use Ki Abilities", resourceMax: {value: 2} } )
    }

    level3(pc: PlayerCharacter, params: LevelingParams): void {
        this.monasticTradition = params.archetypeSelection[0].archetype
        this.pushMonkFeatures(pc, "3")
        pc.findResourceTraitByName("Ki Points").resourceMax.value++

        MonkArchetype.archetypeHelper[this.monasticTradition]["3"](pc, params);
    }
    
    level4(pc: PlayerCharacter, params: LevelingParams): void {
        this.pushMonkFeatures(pc, "4")
        pc.findResourceTraitByName("Ki Points").resourceMax.value++
        pc.improveAbilityScores(params.abilityScoreImprovement);
    }

    level5(pc: PlayerCharacter, params: LevelingParams): void {
        this.pushMonkFeatures(pc, "5")
        pc.findResourceTraitByName("Ki Points").resourceMax.value++
    }

    level6(pc: PlayerCharacter, params: LevelingParams): void {
        this.pushMonkFeatures(pc, "6")
        pc.findResourceTraitByName("Ki Points").resourceMax.value++

        MonkArchetype.archetypeHelper[this.monasticTradition]["6"](pc, params);
    }

    level7(pc: PlayerCharacter, params: LevelingParams): void {
        this.pushMonkFeatures(pc, "7")
        pc.findResourceTraitByName("Ki Points").resourceMax.value++
    }

    level8(pc: PlayerCharacter, params: LevelingParams): void {
        this.pushMonkFeatures(pc, "8")
        pc.findResourceTraitByName("Ki Points").resourceMax.value++
        pc.improveAbilityScores(params.abilityScoreImprovement);
    }

    level9(pc: PlayerCharacter, params: LevelingParams): void {
        this.pushMonkFeatures(pc, "9")
        pc.findResourceTraitByName("Ki Points").resourceMax.value++
    }

    level10(pc: PlayerCharacter, params: LevelingParams): void {
        this.pushMonkFeatures(pc, "10")
        pc.findResourceTraitByName("Ki Points").resourceMax.value++
    }

    level11(pc: PlayerCharacter, params: LevelingParams): void {
        this.pushMonkFeatures(pc, "11")
        pc.findResourceTraitByName("Ki Points").resourceMax.value++

        MonkArchetype.archetypeHelper[this.monasticTradition]["11"](pc, params);
    }

    level12(pc: PlayerCharacter, params: LevelingParams): void {
        this.pushMonkFeatures(pc, "12")
        pc.findResourceTraitByName("Ki Points").resourceMax.value++
        pc.improveAbilityScores(params.abilityScoreImprovement);
    }

    level13(pc: PlayerCharacter, params: LevelingParams): void {
        this.pushMonkFeatures(pc, "13")
        pc.findResourceTraitByName("Ki Points").resourceMax.value++
 
        // TONGUE OF SUN AND MOON
        for(const language of Object.keys(Languages)) {
            pc.traits.languages.push(Languages[language]);
        }
    }

    level14(pc: PlayerCharacter, params: LevelingParams): void {
        this.pushMonkFeatures(pc, "14")
        pc.findResourceTraitByName("Ki Points").resourceMax.value++

        // Diamond Soul
        for(const ability of Object.keys(pc.abilityScores)){
            pc.abilityScores[ability].savingThrowProficiency = true;
        }
    }

    level15(pc: PlayerCharacter, params: LevelingParams): void {
        this.pushMonkFeatures(pc, "15")
        pc.findResourceTraitByName("Ki Points").resourceMax.value++
    }

    level16(pc: PlayerCharacter, params: LevelingParams): void {
        pc.findResourceTraitByName("Ki Points").resourceMax.value++
        pc.improveAbilityScores(params.abilityScoreImprovement);
    }

    level17(pc: PlayerCharacter, params: LevelingParams): void {
        pc.findResourceTraitByName("Ki Points").resourceMax.value++
        MonkArchetype.archetypeHelper[this.monasticTradition]["17"](pc, params);
    }

    level18(pc: PlayerCharacter, params: LevelingParams): void {
        this.pushMonkFeatures(pc, "18")
        pc.findResourceTraitByName("Ki Points").resourceMax.value++    
    }

    level19(pc: PlayerCharacter, params: LevelingParams): void {
        pc.findResourceTraitByName("Ki Points").resourceMax.value++
        pc.improveAbilityScores(params.abilityScoreImprovement);
    }

    level20(pc: PlayerCharacter, params: LevelingParams): void {
        this.pushMonkFeatures(pc, "20")
        pc.findResourceTraitByName("Ki Points").resourceMax.value++
    }   
}