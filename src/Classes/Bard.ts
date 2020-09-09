import { PlayerClass, SpellSlotFactory, LevelingParams } from './PlayerClass';
import { PlayerCharacter } from '../Base/PlayerCharacter';
import { ResourceTrait, Trait } from '../Base/Interfaces';
import * as ClassTraits from '../../Assets/ClassTraits.json';

export class Bard extends PlayerClass {
    constructor(skillProficiencies: string[], weapons: string[], instrumentProficiencies: string[], equipmentPack: string, bardParams: LevelingParams) {
        super(
            "Bard",
            [], 
            skillProficiencies, 
            ["Simple", "Crossbow, hand", "Longsword", "Rapier", "Shortsword"], 
            ["Light"], 
            instrumentProficiencies,
            weapons, 
            [],
            [],
            [],
            bardParams,
            "d8",
            ["dexterity", "charisma"]
        );

        for(let level in this.abilitiesAtLevels) {
            
            const func: Function = this.abilitiesAtLevels[level];
            this.abilitiesAtLevels[level] = func.bind(this);
        }
    }

    // 8 + Constitution Modifier HP Max
    // DIPLOMAT'S PACK OR ENTERTAINER'S PACK, MUSICAL INSTRUMENT, LEATHER ARMOR AND DAGGER, MUSICAL INSTRUMENT.
    // RESOURCEMAX OF BARDIC INSPIRATION, BONUS FOR JACK OF ALL TRADES, CHANGE WITH LEVELS / ABILITY SCORE IMPROVEMENTS.

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

    pushBardFeatures(pc: PlayerCharacter, level: string) {
        this.pushClassFeatures(pc, level, "BARD");
    }

    level1(pc: PlayerCharacter, params: LevelingParams): void {
        pc.addSpells(params.spellSelection, "charisma");
        const level1Slots = SpellSlotFactory.getSpellSlots(1, 2);
        const bardicInspiration: ResourceTrait = {title: "Bardic Inspiration", description: "Number of times you can give Bardic Inspiration. Dice is Bardic Inspiration die.", resourceMax: 2, dice: '1d6'}; 
        pc.addResourceTraits(level1Slots, bardicInspiration);
        this.pushBardFeatures(pc, "1");  
    }

    level2(pc: PlayerCharacter, params: LevelingParams): void {
        pc.addSpells(params.spellSelection, "charisma");
        SpellSlotFactory.findPlayerSpellSlots(pc, 1).resourceMax++;
        const songOfRest: ResourceTrait = {title: "Song Of Rest", description: "Dice used for Song of Rest", resourceMax: Infinity, dice: '1d6'}; 
        pc.addResourceTraits(songOfRest);
        this.pushBardFeatures(pc, "2");

        for(let skill of Object.keys(pc.skills)){
            if(!pc.skills[skill].proficient)
            pc.skills[skill].bonus = Math.floor(pc.proficiencyBonus / 2);
        }
    }

    level3(pc: PlayerCharacter, params: LevelingParams): void {
        pc.addSpells(params.spellSelection, "charisma");
        pc.findResourceTraitByName("First Level Spell Slots").resourceMax++;
        pc.traits.resources.filter((resource) => resource.title == "First Level Spell Slots")[0].resourceMax++;
        pc.traits.resources.push( {title: "Second Level Spell Slots", description: "Number of second level spells you can cast", resourceMax: 2} )
        
        // ARCHETYPE, EXPERTISE - FIGURE OUT HOW TO TRACK CHOICES FOR EXPERTISE IN FEATURE.
    
    }
    
    level4(pc: PlayerCharacter, params: LevelingParams): void {
        pc.addSpells(params.spellSelection, "charisma");
        pc.traits.resources.filter((resource) => resource.title == "Second Level Spell Slots")[0].resourceMax++;        
        pc.improveAbilityScores(params.abilityScoreImprovement);
    }

    level5(pc: PlayerCharacter, params: LevelingParams): void {
        pc.addSpells(params.spellSelection, "charisma");
        pc.traits.resources.push( {title: "Third Level Spell Slots", description: "Number of third level spells you can cast", resourceMax: 2} )
        this.pushBardFeatures(pc, "5");
        pc.findTraitByName("resources", "Bardic Inspiration")[0].dice = "1d8"; // This gives us an error EZ.
    }

    level6(pc: PlayerCharacter, params: LevelingParams): void {
        pc.addSpells(params.spellSelection, "charisma");
        pc.traits.resources.filter((resource) => resource.title == "Third Level Spell Slots")[0].resourceMax++;
        // ARCHETYPE
        this.pushBardFeatures(pc, "6");
    }

    level7(pc: PlayerCharacter, params: LevelingParams): void {
        pc.addSpells(params.spellSelection, "charisma");
        pc.traits.resources.push( {title: "Fourth Level Spell Slots", description: "Number of fourth level spells you can cast", resourceMax: 1} )
    }

    level8(pc: PlayerCharacter, params: LevelingParams): void {
        pc.addSpells(params.spellSelection, "charisma");
        pc.traits.resources.filter((resource) => resource.title == "Fourth Level Spell Slots")[0].resourceMax++;
        pc.improveAbilityScores(params.abilityScoreImprovement);
    }

    level9(pc: PlayerCharacter, params: LevelingParams): void {
        pc.addSpells(params.spellSelection, "charisma");
        pc.traits.resources.filter((resource) => resource.title == "Fourth Level Spell Slots")[0].resourceMax++;
        pc.traits.resources.push( {title: "Fifth Level Spell Slots", description: "Number of fifth level spells you can cast", resourceMax: 1} )
        pc.findTraitByName("resources", "Song of Rest")[0].dice = "1d8"; // once again, ERROR, EZRA
    }

    level10(pc: PlayerCharacter, params: LevelingParams): void {
        pc.addSpells(params.spellSelection, "charisma"); // THIS INCLUDES MAGICAL SECRETS - NOTE FOR FRONTEND
        pc.traits.resources.filter((resource) => resource.title == "Fifth Level Spell Slots")[0].resourceMax++;
        this.pushBardFeatures(pc, "10");
        pc.findTraitByName("resources", "Bardic Inspiration")[0].dice = "1d10"; // once again, ERROR, EZRA
    }

    level11(pc: PlayerCharacter, params: LevelingParams): void {
        pc.addSpells(params.spellSelection, "charisma");
        pc.traits.resources.push( {title: "Sixth Level Spell Slots", description: "Number of sixth level spells you can cast", resourceMax: 1} )
    }

    level12(pc: PlayerCharacter, params: LevelingParams): void {
        pc.improveAbilityScores(params.abilityScoreImprovement);
    }

    level13(pc: PlayerCharacter, params: LevelingParams): void {
        pc.addSpells(params.spellSelection, "charisma");
        pc.traits.resources.push( {title: "Seventh Level Spell Slots", description: "Number of seventh level spells you can cast", resourceMax: 1} )
        pc.findTraitByName("resources", "Song of Rest")[0].dice = "1d10"; // once again, ERROR, EZRA
    }

    level14(pc: PlayerCharacter, params: LevelingParams): void {
        pc.addSpells(params.spellSelection, "charisma"); // MAGICAL SECRETS
        // ARCHETYPE  
    }

    level15(pc: PlayerCharacter, params: LevelingParams): void {
        pc.addSpells(params.spellSelection, "charisma");
        pc.traits.resources.push( {title: "Eighth Level Spell Slots", description: "Number of eighth level spells you can cast", resourceMax: 1} )
        pc.findTraitByName("resources", "Bardic Inspiration")[0].dice = "1d12"; // once again, ERROR, EZRA
    }

    level16(pc: PlayerCharacter, params: LevelingParams): void {
        pc.improveAbilityScores(params.abilityScoreImprovement);
    }

    level17(pc: PlayerCharacter, params: LevelingParams): void {
        pc.addSpells(params.spellSelection, "charisma");
        pc.traits.resources.push( {title: "Ninth Level Spell Slots", description: "Number of ninth level spells you can cast", resourceMax: 1} )
        pc.findTraitByName("resources", "Song of Rest")[0].dice = "1d12"; // once again, ERROR, EZRA
    }

    level18(pc: PlayerCharacter, params: LevelingParams): void {
        pc.addSpells(params.spellSelection, "charisma"); // MAGICAL SECRETS
        pc.traits.resources.filter((resource) => resource.title == "Fifth Level Spell Slots")[0].resourceMax++;
    }

    level19(pc: PlayerCharacter, params: LevelingParams): void {
        pc.traits.resources.filter((resource) => resource.title == "Sixth Level Spell Slots")[0].resourceMax++;
        pc.improveAbilityScores(params.abilityScoreImprovement);
    }

    level20(pc: PlayerCharacter, params: LevelingParams): void {
        pc.traits.resources.filter((resource) => resource.title == "Seventh Level Spell Slots")[0].resourceMax++;
        this.pushBardFeatures(pc, "20");
    }
    
}

