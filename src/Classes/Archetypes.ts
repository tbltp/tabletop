import { PlayerCharacter } from "../Base/PlayerCharacter";
import { levelingParams } from "./PlayerClass";
import * as Archetypes from "../../Assets/Archetypes.json";
import * as Spells from "../../Assets/Spells.json";

abstract class Archetype {
    abstract archetypeHelper: {[key: string]: (pc: PlayerCharacter, params: levelingParams) => void }= {}

    getArchetypeFeature(className: string, archetypeName: string, level: string, featureName: string) {
        return Archetypes[className][archetypeName]["features"][level][featureName];
    }
}

export class BarbarianArchetype extends Archetype {
    static archetypeHelper = {
        "BERSERKER": {
            "3": BarbarianArchetype.berserker3,
            "6": BarbarianArchetype.berserker6,
            "10": BarbarianArchetype.berserker10
        }, 
        "TOTEM WARRIOR":{
            "3": BarbarianArchetype.totemWarrior3, 
            "6": BarbarianArchetype.totemWarrior6,
            "10": BarbarianArchetype.totemWarrior10,
            "14": BarbarianArchetype.totemWarrior14
        } 
    }
    
    static berserker3(pc: PlayerCharacter, params: levelingParams) {
        pc.traits.features.push(Archetype.getArchetypeFeature("BARBARIAN", "BERSERKER", "3", "FRENZY"));
    }

    static berserker6(pc: PlayerCharacter, params: levelingParams) {
        pc.traits.features.push(Archetype.getArchetypeFeature("BARBARIAN", "BERSERKER", "6", "MINDLESS RAGE"));
    }

    static berseker10(pc: PlayerCharacter, params: levelingParams) {
        pc.traits.features.push(Archetype.getArchetypeFeature("BARBARIAN", "BERSERKER", "10", "INTIMIDATING PRESENCE"));
    }

    static totemWarrior3(pc: PlayerCharacter, params: levelingParams){
        const beastSense = {...Spells["BEAST SENSE"], spellcastingAbility: "None"};
        pc.spells["2"].push(beastSense);

        const speakWithAnimals = {...Spells["SPEAK WITH ANIMALS"], spellcastingAbility: "None"};
        pc.spells["1"].push(speakWithAnimals);

        pc.traits.features.push(
            Archetype.getArchetypeFeature()
        )
        pc.traits.features.push(Archetypes["BARBARIAN"]["TOTEM WARRIOR"]["features"]["3"]["SPIRIT SEEKER"], Archetypes["BARBARIAN"]["TOTEM WARRIOR"]["features"]["3"][params.archetypeSelection[0].options[0]])
    }

    static totemWarrior6(pc: PlayerCharacter, params: levelingParams) {

    }
}