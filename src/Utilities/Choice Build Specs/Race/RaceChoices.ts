import * as DragonbornChoices from './Dragonborn.json'
import * as HillDwarfChoices from './HillDwarf.json'
import * as MountainDwarfChoices from './MountainDwarf.json'
import * as HighElfChoices from './HighElf.json'
import * as HalfElfChoices from './HalfElf.json'
import * as BaseHumanChoices from './BaseHuman.json'
import * as VariantHumanChoices from './VariantHuman.json'

const NONE = {}

export const RaceChoices = {
    Dragonborn: DragonbornChoices,
    "Hill Dwarf": HillDwarfChoices,
    "Mountain Dwarf": MountainDwarfChoices,
    "Dark Elf": NONE,
    "High Elf": HighElfChoices,
    "Wood Elf": NONE,
    "Air Genasi": NONE,
    "Fire Genasi": NONE,
    "Earth Genasi": NONE,
    "Water Genasi": NONE,
    "Foreset Gnome": NONE,
    "Mountain Gnome": NONE,
    "Half Elf": HalfElfChoices,
    "Half Orc": NONE,
    "Lightfoot Halfling": NONE,
    "Stout Halfling": NONE,
    "Base Human": BaseHumanChoices,
    "Variant Human": VariantHumanChoices,
    Tiefling: NONE
}