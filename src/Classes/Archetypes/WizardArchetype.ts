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

    static abjuration2(pc: PlayerCharacter, params: LevelingParams): void {}
    
    static abjuration6(pc: PlayerCharacter, params: LevelingParams): void {}

    static abjuration10(pc: PlayerCharacter, params: LevelingParams): void {}

    static abjuration14(pc: PlayerCharacter, params: LevelingParams): void {}

    static conjuration2(pc: PlayerCharacter, params: LevelingParams): void {}
    
    static conjuration6(pc: PlayerCharacter, params: LevelingParams): void {}

    static conjuration10(pc: PlayerCharacter, params: LevelingParams): void {}

    static conjuration14(pc: PlayerCharacter, params: LevelingParams): void {}

    static divination2(pc: PlayerCharacter, params: LevelingParams): void {}
    
    static divination6(pc: PlayerCharacter, params: LevelingParams): void {}

    static divination10(pc: PlayerCharacter, params: LevelingParams): void {}

    static divination14(pc: PlayerCharacter, params: LevelingParams): void {}

    static enchantment2(pc: PlayerCharacter, params: LevelingParams): void {}
    
    static enchantment6(pc: PlayerCharacter, params: LevelingParams): void {}

    static enchantment10(pc: PlayerCharacter, params: LevelingParams): void {}

    static enchantment14(pc: PlayerCharacter, params: LevelingParams): void {}

    static evocation2(pc: PlayerCharacter, params: LevelingParams): void {}
    
    static evocation6(pc: PlayerCharacter, params: LevelingParams): void {}

    static evocation10(pc: PlayerCharacter, params: LevelingParams): void {}

    static evocation14(pc: PlayerCharacter, params: LevelingParams): void {}

    static illusion2(pc: PlayerCharacter, params: LevelingParams): void {}
    
    static illusion6(pc: PlayerCharacter, params: LevelingParams): void {}

    static illusion10(pc: PlayerCharacter, params: LevelingParams): void {}

    static illusion14(pc: PlayerCharacter, params: LevelingParams): void {}

    static necromancy2(pc: PlayerCharacter, params: LevelingParams): void {}
    
    static necromancy6(pc: PlayerCharacter, params: LevelingParams): void {}

    static necromancy10(pc: PlayerCharacter, params: LevelingParams): void {}

    static necromancy14(pc: PlayerCharacter, params: LevelingParams): void {}

    static transmutation2(pc: PlayerCharacter, params: LevelingParams): void {}
    
    static transmutation6(pc: PlayerCharacter, params: LevelingParams): void {}

    static transmutation10(pc: PlayerCharacter, params: LevelingParams): void {}

    static transmutation14(pc: PlayerCharacter, params: LevelingParams): void {}
}
