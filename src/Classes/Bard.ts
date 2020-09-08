import { PlayerClass, LevelingParams } from './PlayerClass';
import { PlayerCharacter } from '../Base/PlayerCharacter';
import * as ClassTraits from '../../Assets/ClassTraits.json';

export class Bard extends PlayerClass {
    constructor(skillProficiencies: string[], weapons: string[], instrumentProficiencies: string[], equipmentPack: string, bardParams: LevelingParams) {
        super(
            "Barbarian",
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
    }

    features = [];
    // 8 + Constitution Modifier HP Max
    // DIPLOMAT'S PACK OR ENTERTAINER'S PACK, MUSICAL INSTRUMENT, LEATHER ARMOR AND DAGGER, MUSICAL INSTRUMENT.
    
    // BONUSTRAIT: BARDIC INSPIRATION
    // BONUSTRAIT: SONG OF REST
    //

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

    level1(pc: PlayerCharacter, params: LevelingParams): void {
        PlayerClass.addSpells(pc, params.spellSelection, "charisma");
        pc.traits.resources.push( {title: "First Level Spell Slots", description: "Number of first level spells you can cast", resourceMax: 2} )
        // 
    }

    level2(pc: PlayerCharacter, params: LevelingParams): void {
        PlayerClass.addSpells(pc, params.spellSelection, "charisma");
        pc.traits.resources.filter((resource) => resource.title == "First Level Spell Slots")[0].resourceMax++;
    }

    level3(pc: PlayerCharacter, params: LevelingParams): void {
        PlayerClass.addSpells(pc, params.spellSelection, "charisma");
        pc.traits.resources.filter((resource) => resource.title == "First Level Spell Slots")[0].resourceMax++;
        pc.traits.resources.push( {title: "Second Level Spell Slots", description: "Number of second level spells you can cast", resourceMax: 2} )
    }
    
    level4(pc: PlayerCharacter, params: LevelingParams): void {
        PlayerClass.addSpells(pc, params.spellSelection, "charisma");
        pc.traits.resources.filter((resource) => resource.title == "Second Level Spell Slots")[0].resourceMax++;        
    }

    level5(pc: PlayerCharacter, params: LevelingParams): void {
        PlayerClass.addSpells(pc, params.spellSelection, "charisma");
        pc.traits.resources.push( {title: "Third Level Spell Slots", description: "Number of third level spells you can cast", resourceMax: 2} )
    }

    level6(pc: PlayerCharacter, params: LevelingParams): void {
        PlayerClass.addSpells(pc, params.spellSelection, "charisma");
        pc.traits.resources.filter((resource) => resource.title == "Third Level Spell Slots")[0].resourceMax++;
    }

    level7(pc: PlayerCharacter, params: LevelingParams): void {
        PlayerClass.addSpells(pc, params.spellSelection, "charisma");
        pc.traits.resources.push( {title: "Fourth Level Spell Slots", description: "Number of fourth level spells you can cast", resourceMax: 1} )
    }

    level8(pc: PlayerCharacter, params: LevelingParams): void {
        PlayerClass.addSpells(pc, params.spellSelection, "charisma");
        pc.traits.resources.filter((resource) => resource.title == "Fourth Level Spell Slots")[0].resourceMax++;
    }

    level9(pc: PlayerCharacter, params: LevelingParams): void {
        PlayerClass.addSpells(pc, params.spellSelection, "charisma");
        pc.traits.resources.filter((resource) => resource.title == "Fourth Level Spell Slots")[0].resourceMax++;
        pc.traits.resources.push( {title: "Fifth Level Spell Slots", description: "Number of fifth level spells you can cast", resourceMax: 1} )
    }

    level10(pc: PlayerCharacter, params: LevelingParams): void {
        PlayerClass.addSpells(pc, params.spellSelection, "charisma");
        pc.traits.resources.filter((resource) => resource.title == "Fifth Level Spell Slots")[0].resourceMax++;
    }

    level11(pc: PlayerCharacter, params: LevelingParams): void {
        PlayerClass.addSpells(pc, params.spellSelection, "charisma");
        pc.traits.resources.push( {title: "Sixth Level Spell Slots", description: "Number of sixth level spells you can cast", resourceMax: 1} )
    }

    level12(pc: PlayerCharacter, params: LevelingParams): void {
    }

    level13(pc: PlayerCharacter, params: LevelingParams): void {
        PlayerClass.addSpells(pc, params.spellSelection, "charisma");
        pc.traits.resources.push( {title: "Seventh Level Spell Slots", description: "Number of seventh level spells you can cast", resourceMax: 1} )
    }

    level14(pc: PlayerCharacter, params: LevelingParams): void {
        PlayerClass.addSpells(pc, params.spellSelection, "charisma");   
    }

    level15(pc: PlayerCharacter, params: LevelingParams): void {
        PlayerClass.addSpells(pc, params.spellSelection, "charisma");
        pc.traits.resources.push( {title: "Eighth Level Spell Slots", description: "Number of eighth level spells you can cast", resourceMax: 1} )
    }

    level16(pc: PlayerCharacter, params: LevelingParams): void {
    }

    level17(pc: PlayerCharacter, params: LevelingParams): void {
        PlayerClass.addSpells(pc, params.spellSelection, "charisma");
        pc.traits.resources.push( {title: "Ninth Level Spell Slots", description: "Number of ninth level spells you can cast", resourceMax: 1} )
    }

    level18(pc: PlayerCharacter, params: LevelingParams): void {
        pc.traits.resources.filter((resource) => resource.title == "Fifth Level Spell Slots")[0].resourceMax++;
    }

    level19(pc: PlayerCharacter, params: LevelingParams): void {
        pc.traits.resources.filter((resource) => resource.title == "Sixth Level Spell Slots")[0].resourceMax++;
    }

    level20(pc: PlayerCharacter, params: LevelingParams): void {
        pc.traits.resources.filter((resource) => resource.title == "Seventh Level Spell Slots")[0].resourceMax++;
    }
    
}

