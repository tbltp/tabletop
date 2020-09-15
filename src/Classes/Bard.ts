import { PlayerClass, SpellSlotFactory, LevelingParams } from './PlayerClass';
import { PlayerCharacter } from '../Base/PlayerCharacter';
import { ResourceTrait, ScalingTrait } from '../Base/Interfaces';
import { BardArchetype } from './Archetypes';

export class Bard extends PlayerClass {
    constructor(skillProficiencies: string[], weapons: string[], instrumentProficiencies: string[], instrument: string, equipmentPack: string, bardParams: BardLevelingParams) {
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
    // DIPLOMAT'S PACK OR ENTERTAINER'S PACK, MUSICAL INSTRUMENT, LEATHER ARMOR AND DAGGER, MUSICAL INSTRUMENT.
    // RESOURCEMAX OF BARDIC INSPIRATION, BONUS FOR JACK OF ALL TRADES, CHANGE WITH LEVELS / ABILITY SCORE IMPROVEMENTS.
    // What should happen if a bard switches out a magical secret spell

    bardCollege: string;
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

    pushBardFeaturesWithChoices(pc: PlayerCharacter, level: string, choices: string[]) {

    }

    pushBardFeatures(pc: PlayerCharacter, level: string) {
        this.pushClassFeatures(pc, level, "BARD");
    }

    level1(pc: PlayerCharacter, params: BardLevelingParams): void {
        pc.addSpells(params.spellSelection, "charisma");
        const level1Slots: ResourceTrait = SpellSlotFactory.getSpellSlots(1, 2);
        const bardicInspiration: ResourceTrait = {title: "Bardic Inspiration", description: "Number of times you can give Bardic Inspiration. Dice is Bardic Inspiration die.", resourceMax: pc.abilityScores.charisma.modifier, dice: '1d6'}; 
        pc.addResourceTraits(level1Slots, bardicInspiration);
        this.pushBardFeatures(pc, "1");  
    }

    level2(pc: PlayerCharacter, params: BardLevelingParams): void {
        pc.replaceSpells(params.spellReplacements, "charisma");
        pc.addSpells(params.spellSelection, "charisma");
        const songOfRest: ScalingTrait = {title: "Song Of Rest", description: "Dice used for Song of Rest", dice: '1d6'}; 
        pc.addResourceTraits(songOfRest);
        
        // Jack of All Trades
        for(let skill of Object.keys(pc.skills)){
            if(!pc.skills[skill].proficient) {
                pc.skills[skill].bonus = pc.proficiency.halfBonus;
            }
        }
        SpellSlotFactory.findPlayerSpellSlots(pc, 1).resourceMax.value++;
        this.pushBardFeatures(pc, "2");

    }

    level3(pc: PlayerCharacter, params: BardLevelingParams): void {
        pc.replaceSpells(params.spellReplacements, "charisma");
        pc.addSpells(params.spellSelection, "charisma");
        const level2Slots: ResourceTrait = SpellSlotFactory.getSpellSlots(2, 2);
        pc.addResourceTraits(level2Slots);
        SpellSlotFactory.findPlayerSpellSlots(pc, 1).resourceMax.value++;
        // college
        this.bardCollege = params.archetypeSelection[0].archetype;
        BardArchetype.archetypeHelper[this.bardCollege][3](pc, params);
        // expertise
        for(let skill of params.proficiencySelection) {
            pc.skills[skill].expertise = true;
        }
        PlayerClass.pushCustomizedClassFeature(pc, "3", "BARD", "EXPERTISE", params.proficiencySelection);
    }
    
    level4(pc: PlayerCharacter, params: BardLevelingParams): void {
        pc.replaceSpells(params.spellReplacements, "charisma");
        pc.addSpells(params.spellSelection, "charisma");
        pc.improveAbilityScores(params.abilityScoreImprovement);
        SpellSlotFactory.findPlayerSpellSlots(pc, 2).resourceMax.value++;
    }

    level5(pc: PlayerCharacter, params: BardLevelingParams): void {
        pc.replaceSpells(params.spellReplacements, "charisma");
        pc.addSpells(params.spellSelection, "charisma");
        const level3Slots: ResourceTrait = SpellSlotFactory.getSpellSlots(3, 2);
        pc.addResourceTraits(level3Slots);
        pc.findResourceTraitByName("Bardic Inspiration")[0].dice = "1d8";
        this.pushBardFeatures(pc, "5");
    }

    level6(pc: PlayerCharacter, params: BardLevelingParams): void {
        pc.replaceSpells(params.spellReplacements, "charisma");
        pc.addSpells(params.spellSelection, "charisma");
        // college
        BardArchetype.archetypeHelper[this.bardCollege][6](pc, params);
        SpellSlotFactory.findPlayerSpellSlots(pc, 3).resourceMax.value++;
        this.pushBardFeatures(pc, "6");
    }

    level7(pc: PlayerCharacter, params: BardLevelingParams): void {
        pc.replaceSpells(params.spellReplacements, "charisma");
        pc.addSpells(params.spellSelection, "charisma");
        const level4Slots: ResourceTrait = SpellSlotFactory.getSpellSlots(4, 1)
        pc.addResourceTraits(level4Slots);
    }

    level8(pc: PlayerCharacter, params: BardLevelingParams): void {
        pc.replaceSpells(params.spellReplacements, "charisma");
        pc.addSpells(params.spellSelection, "charisma");
        pc.improveAbilityScores(params.abilityScoreImprovement);
        SpellSlotFactory.findPlayerSpellSlots(pc, 4).resourceMax.value++;
    }

    level9(pc: PlayerCharacter, params: BardLevelingParams): void {
        pc.replaceSpells(params.spellReplacements, "charisma");
        pc.addSpells(params.spellSelection, "charisma");
        const level5Slots: ResourceTrait = SpellSlotFactory.getSpellSlots(5, 1);
        pc.addResourceTraits(level5Slots);
        SpellSlotFactory.findPlayerSpellSlots(pc, 4).resourceMax.value++;
        pc.findScalingTraitByName("Song of Rest").dice = "1d8";
    }

    level10(pc: PlayerCharacter, params: BardLevelingParams): void {
        pc.replaceSpells(params.spellReplacements, "charisma");
        pc.addSpells(params.spellSelection, "charisma"); 
        // expertise
        for(let skill of params.proficiencySelection) {
            pc.skills[skill].expertise = true;
        }
        pc.findFeatureTraitByName("Expertise").choices.push(...params.proficiencySelection);
        SpellSlotFactory.findPlayerSpellSlots(pc, 5).resourceMax.value++;
        pc.findResourceTraitByName("Bardic Inspiration").dice = "1d10";
        // magical secrets
        pc.addSpells(params.magicalSecretsSpellSelection, "charisma");
        PlayerClass.pushCustomizedClassFeature(pc, "10", "BARD", "MAGICAL SECRETS", params.magicalSecretsSpellSelection);
    }

    level11(pc: PlayerCharacter, params: BardLevelingParams): void {
        pc.replaceSpells(params.spellReplacements, "charisma");
        pc.addSpells(params.spellSelection, "charisma");
        const level6Slots: ResourceTrait = SpellSlotFactory.getSpellSlots(6, 1);
        pc.addResourceTraits(level6Slots);
    }

    level12(pc: PlayerCharacter, params: BardLevelingParams): void {
        pc.improveAbilityScores(params.abilityScoreImprovement);
    }

    level13(pc: PlayerCharacter, params: BardLevelingParams): void {
        pc.replaceSpells(params.spellReplacements, "charisma");
        pc.addSpells(params.spellSelection, "charisma");
        const level7Slots: ResourceTrait = SpellSlotFactory.getSpellSlots(7, 1);
        pc.addResourceTraits(level7Slots);
        pc.findScalingTraitByName("Song of Rest").dice = "1d10";
    }

    level14(pc: PlayerCharacter, params: BardLevelingParams): void {
        pc.replaceSpells(params.spellReplacements, "charisma");
        pc.addSpells(params.spellSelection, "charisma"); 
        // magical secrets
        pc.addSpells(params.magicalSecretsSpellSelection, "charisma");
        pc.findFeatureTraitByName("Magical Secrets").choices.push(...params.magicalSecretsSpellSelection);
        // college
        BardArchetype.archetypeHelper[this.bardCollege][14](pc, params);
    }

    level15(pc: PlayerCharacter, params: BardLevelingParams): void {
        pc.replaceSpells(params.spellReplacements, "charisma");
        pc.addSpells(params.spellSelection, "charisma");
        const level8Slots: ResourceTrait = SpellSlotFactory.getSpellSlots(8, 1);
        pc.addResourceTraits(level8Slots);
        pc.findResourceTraitByName("Bardic Inspiration").dice = "1d12";
    }

    level16(pc: PlayerCharacter, params: BardLevelingParams): void {
        pc.improveAbilityScores(params.abilityScoreImprovement);
    }

    level17(pc: PlayerCharacter, params: BardLevelingParams): void {
        pc.replaceSpells(params.spellReplacements, "charisma");
        pc.addSpells(params.spellSelection, "charisma");
        const level9Slots: ResourceTrait = SpellSlotFactory.getSpellSlots(9, 1);
        pc.addResourceTraits(level9Slots);
        pc.findScalingTraitByName("Song of Rest").dice = "1d12";
    }

    level18(pc: PlayerCharacter, params: BardLevelingParams): void {
        pc.replaceSpells(params.spellReplacements, "charisma");
        pc.addSpells(params.spellSelection, "charisma"); 
        // magical secrets
        pc.addSpells(params.magicalSecretsSpellSelection, "charisma");
        pc.findFeatureTraitByName("Magical Secrets").choices.push(...params.magicalSecretsSpellSelection);
        SpellSlotFactory.findPlayerSpellSlots(pc, 5).resourceMax.value++;
    }

    level19(pc: PlayerCharacter, params: BardLevelingParams): void {
        pc.improveAbilityScores(params.abilityScoreImprovement);
        SpellSlotFactory.findPlayerSpellSlots(pc, 6).resourceMax.value++;
    }

    level20(pc: PlayerCharacter, params: BardLevelingParams): void {
        SpellSlotFactory.findPlayerSpellSlots(pc, 7).resourceMax.value++;
        this.pushBardFeatures(pc, "20");
    }
    
}

export interface BardLevelingParams extends LevelingParams {
    magicalSecretsSpellSelection?: string[]
};
