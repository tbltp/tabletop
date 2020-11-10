import { Subclass } from "../../Subclass";
import { Abjuration } from "./Abjuration/Abjuration";
import { Conjuration } from "./Conjuration/Conjuration";
import { Divination } from "./Divination/Divination";
import { Enchantment } from "./Enchantment/Enchantment";
import { Evocation } from "./Evocation/Evocation";
import { Illusion } from "./Illusion/Illusion";
import { Necromancy } from "./Necromancy/Necromancy";
import { Transmutation } from "./Transmutation/Transmutation";

export class WizardSubclass extends Subclass {
    static subclassDictionary = {
        ABJURATION: {
            "2": Abjuration.abjuration2,
            "6": Abjuration.abjuration6,
            "10": Abjuration.abjuration10,
            "14": Abjuration.abjuration14,
        },
        CONJURATION: {
            "2": Conjuration.conjuration2,
            "6": Conjuration.conjuration6,
            "10": Conjuration.conjuration10,
            "14": Conjuration.conjuration14,
        },
        DIVINATION: {
            "2": Divination.divination2,
            "6": Divination.divination6,
            "10": Divination.divination10,
            "14": Divination.divination14,
        },
        ENCHANTMENT: {
            "2": Enchantment.enchantment2,
            "6": Enchantment.enchantment6,
            "10": Enchantment.enchantment10,
            "14": Enchantment.enchantment14
        },
        EVOCATION: {
            "2": Evocation.evocation2,
            "6": Evocation.evocation6,
            "10": Evocation.evocation10,
            "14": Evocation.evocation14,
        },
        ILLUSION: {
            "2": Illusion.illusion2,
            "6": Illusion.illusion6,
            "10": Illusion.illusion10,
            "14": Illusion.illusion14,
        },
        NECROMANCY: {
            "2": Necromancy.necromancy2,
            "6": Necromancy.necromancy6,
            "10": Necromancy.necromancy10,
            "14": Necromancy.necromancy14,
        },
        TRANSMUTATION: {
            "2": Transmutation.transmutation2,
            "6": Transmutation.transmutation6,
            "10": Transmutation.transmutation10,
            "14": Transmutation.transmutation14,
        }
    };
}