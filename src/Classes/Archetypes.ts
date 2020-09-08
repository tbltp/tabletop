import { PlayerCharacter } from "../Base/PlayerCharacter";
import { levelingParams } from "./PlayerClass";
import * as Archetypes from "../../Assets/Archetypes.json";
import * as Spells from "../../Assets/Spells.json";

abstract class Archetype {
    abstract archetypeHelper: {[key: string]: (pc: PlayerCharacter, params: levelingParams) => void }= {}
}

export class BarbarianArchetype {
    static archetypeHelper = {
        "BERSERKER3": BarbarianArchetype.berseker3,
        "TOTEM WARRIOR3": BarbarianArchetype.totemWarrior3
    }
    
    static berseker3(pc: PlayerCharacter, params: levelingParams) {
        pc.traits.features.push(Archetypes["BARBARIAN"]["BERSERKER"]["features"]["3"]["FRENZY"]); 
    }

    static totemWarrior3(pc: PlayerCharacter, params: levelingParams){
        const beastSense = {...Spells["BEAST SENSE"], spellcastingAbility: "None"};
        pc.spells["2"].push(beastSense);
    
        const speakWithAnimals = {...Spells["SPEAK WITH ANIMALS"], spellcastingAbility: "None"};
        pc.spells["1"].push(speakWithAnimals);

        pc.traits.features.push(Archetypes["BARBARIAN"]["TOTEM WARRIOR"]["features"]["3"]["SPIRIT SEEKER"], Archetypes["BARBARIAN"]["TOTEM WARRIOR"]["features"]["3"][params.archetypeSelection[0].options[0]])
    }
}