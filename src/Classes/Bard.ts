import { PlayerClass, SpellSlotFactory, LevelingParams } from './PlayerClass';
import { PlayerCharacter } from '../Base/PlayerCharacter';
import { ResourceTrait, ScalingTrait } from '../Base/Interfaces';
import { BardArchetype } from './Archetypes';
import * as SpellCastingAbility from '../../Assets/SpellCastingAbility.json'; 

export class Bard extends PlayerClass {
    constructor(skillProficiencies: string[], weapons: string[], instrumentProficiencies: string[], instrument: string, equipmentPack: string, bardParams: LevelingParams) {
        super(
            "Bard",
            [], 
            skillProficiencies, 
            ["Simple", "Crossbow, hand", "Longsword", "Rapier", "Shortsword"], 
            ["Light"], 
            instrumentProficiencies,
            [...weapons, "DAGGER"], 
            ["LEATHER"],
            [],
            [instrument],
            bardParams,
            "d8",
            8,
            ["dexterity", "charisma"]
        );

        this.equipmentPack = equipmentPack;


        for(let level in this.abilitiesAtLevels) {
            const func: Function = this.abilitiesAtLevels[level];
            this.abilitiesAtLevels[level] = func.bind(this);
        }
    }

    // 8 + Constitution Modifier HP Max
    // DIPLOMAT'S PACK OR ENTERTAINER'S PACK, MUSICAL INSTRUMENT,-
    // RESOURCEMAX OF BARDIC INSPIRATION, BONUS FOR JACK OF ALL TRADES, CHANGE WITH LEVELS / ABILITY SCORE IMPROVEMENTS.
    // What should happen if a bard switches out a magical secret spell

    bardCollege: string = "";

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
    };

    private pushBardFeaturesWithChoices(pc: PlayerCharacter, level: number, choices: string[]) {

    }

    private pushBardFeatures(pc: PlayerCharacter, level: number) {
        this.pushClassFeatures(pc, level, "BARD");
    }

    private handleBardSpellSelections(pc: PlayerCharacter, params: LevelingParams) {
        this.handleSpellSelections(pc, params, SpellCastingAbility["BARD"]);
    }

    private applyBardSpellSlots(pc: PlayerCharacter, level: number) {
        SpellSlotFactory.applySpellSlotsAtLevel(pc, level, "PRIMARY");
    }

    level1(pc: PlayerCharacter, params: LevelingParams): void {
        // spell additions at most levels, replacements can be done at every level
        this.handleBardSpellSelections(pc, params);
        this.applyBardSpellSlots(pc, 1);
        // bardic inspiration
        const bardicInspiration: ResourceTrait = {title: "Bardic Inspiration", description: "Number of times you can give Bardic Inspiration per long rest. Dice is Bardic Inspiration die.", resourceMax: pc.abilityScores.charisma.modifier, dice: '1d6'}; 
        this.pushBardFeatures(pc, 1);  
    }

    level2(pc: PlayerCharacter, params: LevelingParams): void {
        this.handleBardSpellSelections(pc, params);
        // song of rest
        const songOfRest: ScalingTrait = {title: "Song of Rest", description: "Dice used for Song of Rest.", dice: '1d6'}; 
        pc.addScalingTraits(songOfRest);
        // jack of all trades
        for(let skill of Object.keys(pc.skills)){
            if(!pc.skills[skill].proficient) {
                pc.skills[skill].bonus = pc.proficiency.halfBonus;
            }
        }
        this.applyBardSpellSlots(pc, 2);
    }

    level3(pc: PlayerCharacter, params: LevelingParams): void {
        this.handleBardSpellSelections(pc, params);
        this.applyBardSpellSlots(pc, 3)
        // college
        this.bardCollege = params.archetypeSelection[0].archetype;
        BardArchetype.archetypeHelper[this.bardCollege][3](pc, params);
        // expertise
        for(let skill of params.proficiencySelection) {
            pc.skills[skill].expertise = true;
        }
        PlayerClass.pushCustomizedClassFeature(pc, 3, "BARD", "EXPERTISE", params.proficiencySelection);
    }
    
    level4(pc: PlayerCharacter, params: LevelingParams): void {
        this.handleBardSpellSelections(pc, params);
        this.applyBardSpellSlots(pc, 4);
        pc.improveAbilityScores(params.abilityScoreImprovement);
    }

    level5(pc: PlayerCharacter, params: LevelingParams): void {
        this.handleBardSpellSelections(pc, params);
        this.applyBardSpellSlots(pc, 5);
        // bardic inspiration
        pc.findResourceTraitByName("Bardic Inspiration").dice = "1d8";
        this.pushBardFeatures(pc, 5);
    }

    level6(pc: PlayerCharacter, params: LevelingParams): void {
        this.handleBardSpellSelections(pc, params);
        this.applyBardSpellSlots(pc, 6);
        // college
        BardArchetype.archetypeHelper[this.bardCollege][6](pc, params);
        this.pushBardFeatures(pc, 6);
    }

    level7(pc: PlayerCharacter, params: LevelingParams): void {
        this.handleBardSpellSelections(pc, params);
        this.applyBardSpellSlots(pc, 7);
    }

    level8(pc: PlayerCharacter, params: LevelingParams): void {
        this.handleBardSpellSelections(pc, params);
        this.applyBardSpellSlots(pc, 8);
        pc.improveAbilityScores(params.abilityScoreImprovement);
    }

    level9(pc: PlayerCharacter, params: LevelingParams): void {
        this.handleBardSpellSelections(pc, params);
        this.applyBardSpellSlots(pc, 9);
        // song of rest
        pc.findScalingTraitByName("Song of Rest").dice = "1d8";
    }

    level10(pc: PlayerCharacter, params: BardLevelingParams): void {
        this.handleBardSpellSelections(pc, params);
        this.applyBardSpellSlots(pc, 10);
        // expertise
        for(let skill of params.proficiencySelection) {
            pc.skills[skill].expertise = true;
        }
        pc.findFeatureTraitByName("Expertise").choices.push(...params.proficiencySelection);
        // bardic inspiration
        pc.findResourceTraitByName("Bardic Inspiration").dice = "1d10";
        // magical secrets
        pc.addSpells(params.magicalSecretsSpellSelection, SpellCastingAbility["BARD"]);
        PlayerClass.pushCustomizedClassFeature(pc, 10, "BARD", "MAGICAL SECRETS", params.magicalSecretsSpellSelection);
    }

    level11(pc: PlayerCharacter, params: LevelingParams): void {
        this.handleBardSpellSelections(pc, params);
        this.applyBardSpellSlots(pc, 11);
    }

    level12(pc: PlayerCharacter, params: LevelingParams): void {
        this.handleBardSpellSelections(pc, params);
        pc.improveAbilityScores(params.abilityScoreImprovement);
    }

    level13(pc: PlayerCharacter, params: LevelingParams): void {
        this.handleBardSpellSelections(pc, params);
        this.applyBardSpellSlots(pc, 13);
        // song of rest
        pc.findScalingTraitByName("Song of Rest").dice = "1d10";
    }

    level14(pc: PlayerCharacter, params: BardLevelingParams): void {
        this.handleBardSpellSelections(pc, params);
        // magical secrets
        pc.addSpells(params.magicalSecretsSpellSelection, SpellCastingAbility["BARD"]);
        pc.findFeatureTraitByName("Magical Secrets").choices.push(...params.magicalSecretsSpellSelection);
        // college
        BardArchetype.archetypeHelper[this.bardCollege][14](pc, params);
    }

    level15(pc: PlayerCharacter, params: LevelingParams): void {
        this.handleBardSpellSelections(pc, params);
        this.applyBardSpellSlots(pc, 15);
        // bardic inspiration
        pc.findResourceTraitByName("Bardic Inspiration").dice = "1d12";
    }

    level16(pc: PlayerCharacter, params: LevelingParams): void {
        this.handleBardSpellSelections(pc, params);
        pc.improveAbilityScores(params.abilityScoreImprovement);
    }

    level17(pc: PlayerCharacter, params: LevelingParams): void {
        this.handleBardSpellSelections(pc, params);
        this.applyBardSpellSlots(pc, 17);
        // song of rest
        pc.findScalingTraitByName("Song of Rest").dice = "1d12";
    }

    level18(pc: PlayerCharacter, params: BardLevelingParams): void {
        this.handleBardSpellSelections(pc, params);
        this.applyBardSpellSlots(pc, 18);
        // magical secrets
        pc.addSpells(params.magicalSecretsSpellSelection, SpellCastingAbility["BARD"]);
        pc.findFeatureTraitByName("Magical Secrets").choices.push(...params.magicalSecretsSpellSelection);
    }

    level19(pc: PlayerCharacter, params: LevelingParams): void {
        this.handleBardSpellSelections(pc, params);
        this.applyBardSpellSlots(pc, 19);
        pc.improveAbilityScores(params.abilityScoreImprovement);
    }

    level20(pc: PlayerCharacter, params: LevelingParams): void {
        this.handleBardSpellSelections(pc, params);
        this.applyBardSpellSlots(pc, 20);
    }
}

export interface BardLevelingParams extends LevelingParams {
    magicalSecretsSpellSelection?: string[]
};
