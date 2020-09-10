import { PlayerCharacter } from "../Base/PlayerCharacter";
import { LevelingParams } from "./PlayerClass";
import { Trait } from "../Base/Interfaces";
import * as Archetypes from "../../Assets/Archetypes.json";
import * as Spells from "../../Assets/Spells.json";
import { Barbarian } from "./Barbarian";

abstract class Archetype {
    
    static archetypeHelper: {[key1: string]: {[key2: string]: (pc: PlayerCharacter, params: LevelingParams) => void }} = {};

    static getFeature(className: string, archetypeName: string, level: string, featureName: string) {
        return Archetypes[className][archetypeName]["features"][level][featureName];
    }
}

export class BarbarianArchetype extends Archetype {

    static archetypeHelper = {
        "BERSERKER": {
            "3": BarbarianArchetype.berserker3,
            "6": BarbarianArchetype.berserker6,
            "10": BarbarianArchetype.berserker10,
            "14": BarbarianArchetype.berserker14
        }, 
        "TOTEM WARRIOR":{
            "3": BarbarianArchetype.totemWarrior3, 
            "6": BarbarianArchetype.totemWarrior6,
            "10": BarbarianArchetype.totemWarrior10,
            "14": BarbarianArchetype.totemWarrior14
        } 
    }

    static getFeature(archetypeName: string, level: string, featureName: string) {
        return Archetype.getFeature("BARBARIAN", archetypeName, level, featureName);
    }
    
    static berserker3(pc: PlayerCharacter, params: LevelingParams) {
        pc.addFeatures(BarbarianArchetype.getFeature("BERSERKER", "3", "FRENZY"));
    }

    static berserker6(pc: PlayerCharacter, params: LevelingParams) {
        pc.addFeatures(BarbarianArchetype.getFeature("BERSERKER", "6", "MINDLESS RAGE"));
    }

    static berserker10(pc: PlayerCharacter, params: LevelingParams) {
        pc.addFeatures(BarbarianArchetype.getFeature("BERSERKER", "10", "INTIMIDATING PRESENCE"));
    }

    static berserker14(pc: PlayerCharacter, params: LevelingParams) {
        pc.addFeatures(BarbarianArchetype.getFeature("BERSERKER", "14", "RETALIATION"));
    }

    static totemWarrior3(pc: PlayerCharacter, params: LevelingParams){

        pc.addSpells(["BEAST SENSE", "SPEAK WITH ANIMALS"], "None");
        pc.addFeatures(
            BarbarianArchetype.getFeature("TOTEM WARRIOR", "3", "SPIRIT SEEKER"),
            BarbarianArchetype.getFeature("TOTEM WARRIOR", "3", params.archetypeSelection[0].options[0])
        );
    }

    static totemWarrior6(pc: PlayerCharacter, params: LevelingParams) {
        pc.addFeatures(BarbarianArchetype.getFeature("TOTEM WARRIOR", "6", params.archetypeSelection[0].options[0]));
    }

    static totemWarrior10(pc: PlayerCharacter, params: LevelingParams) {
        pc.addSpells(["COMMUNE WITH NATURE"], "None");
        pc.addFeatures(BarbarianArchetype.getFeature("TOTEM WARRIOR", "10", "SPIRIT WALKER"));
    }
    
    static totemWarrior14(pc: PlayerCharacter, params: LevelingParams) {
        pc.addFeatures(BarbarianArchetype.getFeature("TOTEM WARRIOR", "14", params.archetypeSelection[0].options[0]));
    }
}

export class BardArchetype extends Archetype {
    
    static archetypeHelper = {
        "LORE": {
            "3": BardArchetype.lore3,
            "6": BardArchetype.lore6,
            "14": BardArchetype.lore14
        }, 
        "VALOR":{
            "3": BardArchetype.valor3, 
            "6": BardArchetype.valor6,
            "14": BardArchetype.valor14
        } 
    }

    static getFeature(archetypeName: string, level: string, featureName: string) {
        return Archetype.getFeature("BARD", archetypeName, level, featureName);
    }
    
    static lore3(pc: PlayerCharacter, params: LevelingParams) {
        pc.addFeatures(BardArchetype.getFeature("LORE", "3", "CUTTING WORDS"));
    }

    static lore6(pc: PlayerCharacter, params: LevelingParams) {
        const lore6Trait: Trait = { 
            ...BardArchetype.getFeature("LORE", "6", "ADDITIONAL MAGICAL SECRETS"), 
            choices: params.archetypeSelection[0].options
        };
        pc.addSpells(params.archetypeSelection[0].options, "charisma")
        pc.addFeatures(lore6Trait);
    }

    static lore14(pc: PlayerCharacter, params: LevelingParams) {
        pc.addFeatures(BardArchetype.getFeature("LORE", "14", "PEERLESS SKILL"));
    }

    static valor3(pc: PlayerCharacter, params: LevelingParams) {
        pc.addFeatures(BardArchetype.getFeature("VALOR", "3", "COMBAT INSPIRATION"));
    }

    static valor6(pc: PlayerCharacter, params: LevelingParams) {
        pc.addFeatures(BardArchetype.getFeature("VALOR", "6", "EXTRA ATTACK"));
    }

    static valor14(pc: PlayerCharacter, params: LevelingParams) {
        pc.addFeatures(BardArchetype.getFeature("VALOR", "14", "BATTLE MAGIC"));
    }
}