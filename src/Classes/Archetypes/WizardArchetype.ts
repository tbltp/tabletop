import { PlayerCharacter } from "../../Base/PlayerCharacter";
import { LevelingParams } from "../PlayerClass";
import { Archetype } from "../Archetypes";

export class WizardArchetype extends Archetype {
    static archetypeHelper = {
        ABJURATION: {
            "2": WizardArchetype.abjuration2,
            "6": WizardArchetype.abjuration6,
            "10": WizardArchetype.abjuration10,
            "14": WizardArchetype.abjuration14,
        },
        CONJURATION: {
            "2": WizardArchetype.conjuration2,
            "6": WizardArchetype.conjuration6,
            "10": WizardArchetype.conjuration10,
            "14": WizardArchetype.conjuration14,
        },
        DIVINATION: {
            "2": WizardArchetype.divination2,
            "6": WizardArchetype.divination6,
            "10": WizardArchetype.divination10,
            "14": WizardArchetype.divination14,
        },
        ENCHANTMENT: {
            "2": WizardArchetype.enchantment2,
            "6": WizardArchetype.enchantment6,
            "10": WizardArchetype.enchantment10,
            "14": WizardArchetype.enchantment14
        },
        EVOCATION: {
            "2": WizardArchetype.evocation2,
            "6": WizardArchetype.evocation6,
            "10": WizardArchetype.evocation10,
            "14": WizardArchetype.evocation14,
        },
        ILLUSION: {
            "2": WizardArchetype.illusion2,
            "6": WizardArchetype.illusion6,
            "10": WizardArchetype.illusion10,
            "14": WizardArchetype.illusion14,
        },
        NECROMANCY: {
            "2": WizardArchetype.necromancy2,
            "6": WizardArchetype.necromancy6,
            "10": WizardArchetype.necromancy10,
            "14": WizardArchetype.necromancy14,
        },
        TRANSMUTATION: {
            "2": WizardArchetype.transmutation2,
            "6": WizardArchetype.transmutation6,
            "10": WizardArchetype.transmutation10,
            "14": WizardArchetype.transmutation14,
        }
    };

    static getFeature(archetypeName: string, level: string, featureName: string) {
        return Archetype.getFeature("WIZARD", archetypeName, level, featureName);
    }

    static abjuration2(pc: PlayerCharacter, params: LevelingParams): void {
        pc.addFeatures(WizardArchetype.getFeature("ABJURATION", "2", "ABJURATION SAVANT"), WizardArchetype.getFeature("ABJURATION", "2", "ARCANE WARD"))
    }
    
    static abjuration6(pc: PlayerCharacter, params: LevelingParams): void {
        pc.addFeatures(WizardArchetype.getFeature("ABJURATION", "6", "PROJECTED WARD"))
    }

    static abjuration10(pc: PlayerCharacter, params: LevelingParams): void {
        pc.addFeatures(WizardArchetype.getFeature("ABJURATION", "10", "IMPROVED ABJURATION"))
    }

    static abjuration14(pc: PlayerCharacter, params: LevelingParams): void {
        pc.addFeatures(WizardArchetype.getFeature("ABJURATION", "14", "SPELL RESISTANCE"))
    }

    static conjuration2(pc: PlayerCharacter, params: LevelingParams): void {
        pc.addFeatures(WizardArchetype.getFeature("CONJURATION", "2", "CONJURATION SAVANT"), WizardArchetype.getFeature("CONJURATION", "2", "MINOR CONJURATION"))
    }
    
    static conjuration6(pc: PlayerCharacter, params: LevelingParams): void {
        pc.addFeatures(WizardArchetype.getFeature("CONJURATION", "6", "BENIGN TRANSPOSITION"))
    }

    static conjuration10(pc: PlayerCharacter, params: LevelingParams): void {
        pc.addFeatures(WizardArchetype.getFeature("CONJURATION", "10", "FOCUSED CONJURATION"))
    }

    static conjuration14(pc: PlayerCharacter, params: LevelingParams): void {
        pc.addFeatures(WizardArchetype.getFeature("CONJURATION", "14", "DURABLE SUMMONS"))
    }

    static divination2(pc: PlayerCharacter, params: LevelingParams): void {
        pc.addFeatures(WizardArchetype.getFeature("DIVINATION", "2", "DIVINATION SAVANT"), WizardArchetype.getFeature("DIVINATION", "2", "PORTENT"))
    }
    
    static divination6(pc: PlayerCharacter, params: LevelingParams): void {
        pc.addFeatures(WizardArchetype.getFeature("DIVINATION", "6", "EXPERT DIVINATION"))
    }

    static divination10(pc: PlayerCharacter, params: LevelingParams): void {
        pc.addFeatures(WizardArchetype.getFeature("DIVINATION", "10", "THE THIRD EYE"))
    }

    static divination14(pc: PlayerCharacter, params: LevelingParams): void {
        pc.addFeatures(WizardArchetype.getFeature("DIVINATION", "14", "GREATER PORTENT"))
    }

    static enchantment2(pc: PlayerCharacter, params: LevelingParams): void {
        pc.addFeatures(WizardArchetype.getFeature("ENCHANTMENT", "2", "ENCHANTMENT SAVANT"), WizardArchetype.getFeature("ENCHANTMENT", "2", "HYPNOTIC GAZE"))
    }
    
    static enchantment6(pc: PlayerCharacter, params: LevelingParams): void {
        pc.addFeatures(WizardArchetype.getFeature("ENCHANTMENT", "6", "INSTINCTIVE CHARM"))
    }

    static enchantment10(pc: PlayerCharacter, params: LevelingParams): void {
        pc.addFeatures(WizardArchetype.getFeature("ENCHANTMENT", "10", "SPLIT ENCHANTMENT"))
    }

    static enchantment14(pc: PlayerCharacter, params: LevelingParams): void {
        pc.addFeatures(WizardArchetype.getFeature("ENCHANTMENT", "14", "ALTER MEMORIES"))
    }

    static evocation2(pc: PlayerCharacter, params: LevelingParams): void {
        pc.addFeatures(WizardArchetype.getFeature("EVOCATION", "2", "EVOCATION SAVANT"), WizardArchetype.getFeature("EVOCATION", "2", "SCULPT SPELLS"))

    }
    
    static evocation6(pc: PlayerCharacter, params: LevelingParams): void {
        pc.addFeatures(WizardArchetype.getFeature("EVOCATION", "6", "POTENT CANTRIP"))
    }

    static evocation10(pc: PlayerCharacter, params: LevelingParams): void {
        pc.addFeatures(WizardArchetype.getFeature("EVOCATION", "10", "EMPOWERERD EVOCATION"))
    }

    static evocation14(pc: PlayerCharacter, params: LevelingParams): void {
        pc.addFeatures(WizardArchetype.getFeature("EVOCATION", "14", "OVERCHANNEL"))
    }

    static illusion2(pc: PlayerCharacter, params: LevelingParams): void {
        pc.addFeatures(WizardArchetype.getFeature("ILLUSION", "2", "ILLUSION SAVANT"), WizardArchetype.getFeature("ILLUSION", "2", "IMPROVED MINOR ILLUSION"))
    }
    
    static illusion6(pc: PlayerCharacter, params: LevelingParams): void {
        pc.addFeatures(WizardArchetype.getFeature("ILLUSION", "6", "MALLEABLE ILLUSIONS"))
    }

    static illusion10(pc: PlayerCharacter, params: LevelingParams): void {
        pc.addFeatures(WizardArchetype.getFeature("ILLUSION", "10", "ILLUSORY SELF"))
    }

    static illusion14(pc: PlayerCharacter, params: LevelingParams): void {
        pc.addFeatures(WizardArchetype.getFeature("ILLUSION", "14", "ILLUSORY REALITY"))
    }

    static necromancy2(pc: PlayerCharacter, params: LevelingParams): void {
        pc.addFeatures(WizardArchetype.getFeature("NECROMANCY", "2", "NECROMANCY SAVANT"), WizardArchetype.getFeature("NECROMANCY", "2", "GRIM HARVEST"))
    }
    
    static necromancy6(pc: PlayerCharacter, params: LevelingParams): void {
        pc.addFeatures(WizardArchetype.getFeature("NECROMANCY", "6", "UNDEAD THRALLS"))
    }

    static necromancy10(pc: PlayerCharacter, params: LevelingParams): void {
        pc.addFeatures(WizardArchetype.getFeature("NECROMANCY", "10", "INJURED TO UNDEATH"))
    }

    static necromancy14(pc: PlayerCharacter, params: LevelingParams): void {
        pc.addFeatures(WizardArchetype.getFeature("NECROMANCY", "14", "COMMAND UNDEAD"))
    }

    static transmutation2(pc: PlayerCharacter, params: LevelingParams): void {
        pc.addFeatures(WizardArchetype.getFeature("TRANSMUTATION", "2", "TRANSMUTATION SAVANT"), WizardArchetype.getFeature("NECROMANCY", "2", "MINOR ALCHEMY"))
    }
    
    static transmutation6(pc: PlayerCharacter, params: LevelingParams): void {
        pc.addFeatures(WizardArchetype.getFeature("TRANSMUTATION", "6", "TRANSMUTER'S STONE"))
    }

    static transmutation10(pc: PlayerCharacter, params: LevelingParams): void {
        pc.addFeatures(WizardArchetype.getFeature("TRANSMUTATION", "10", "SHAPECHANGER"))
    }

    static transmutation14(pc: PlayerCharacter, params: LevelingParams): void {
        pc.addFeatures(WizardArchetype.getFeature("TRANSMUTATION", "14", "MASTER TRANSMUTER"))
    }
}
