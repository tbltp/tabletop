import { Acolyte } from "../Backgrounds/Acolyte";
import { Charlatan } from "../Backgrounds/Charlatan";
import { Criminal } from "../Backgrounds/Criminal";
import { Entertainer } from "../Backgrounds/Entertainer";
import { FolkHero } from "../Backgrounds/FolkHero";
import { GuildArtisan } from "../Backgrounds/GuildArtisan";
import { Hermit } from "../Backgrounds/Hermit";
import { Knight } from "../Backgrounds/Knight";
import { Noble } from "../Backgrounds/Noble";
import { Outlander } from "../Backgrounds/Outlander";
import { Pirate } from "../Backgrounds/Pirate";
import { Sage } from "../Backgrounds/Sage";
import { Sailor } from "../Backgrounds/Sailor";
import { Soldier } from "../Backgrounds/Soldier";
import { Urchin } from "../Backgrounds/Urchin";
import { Artificer } from "../Classes/Artificer/Artificer";
import { Barbarian } from "../Classes/Barbarian/Barbarian";
import { Bard } from "../Classes/Bard/Bard";
import { Cleric } from "../Classes/Cleric/Cleric";
import { Druid } from "../Classes/Druid/Druid";
import { Fighter } from "../Classes/Fighter/Fighter";
import { Monk } from "../Classes/Monk/Monk";
import { Paladin } from "../Classes/Paladin/Paladin";
import { Ranger } from "../Classes/Ranger/Ranger";
import { Rogue } from "../Classes/Rogue/Rogue";
import { Sorcerer } from "../Classes/Sorcerer/Sorcerer";
import { Warlock } from "../Classes/Warlock/Warlock";
import { Wizard } from "../Classes/Wizard/Wizard";
import { Actor } from "../Feats/Actor";
import { Alert } from "../Feats/Alert";
import { Athlete } from "../Feats/Athlete";
import { Charger } from "../Feats/Charger";
import { CrossbowExpert } from "../Feats/CrossbowExpert";
import { DefensiveDuelist } from "../Feats/DefensiveDuelist";
import { DualWielder } from "../Feats/DualWielder";
import { DungeonDelver } from "../Feats/DungeonDelver";
import { Durable } from "../Feats/Durable";
import { ElementalAdept } from "../Feats/ElementalAdept";
import { Grappler } from "../Feats/Grappler";
import { GreatWeaponMaster } from "../Feats/GreatWeaponMaster";
import { Healer } from "../Feats/Healer";
import { HeavilyArmored } from "../Feats/HeavilyArmored";
import { HeavyArmorMaster } from "../Feats/HeavyArmorMaster";
import { InspiringLeader } from "../Feats/InspiringLeader";
import { KeenMind } from "../Feats/KeenMind";
import { LightlyArmored } from "../Feats/LightlyArmored";
import { Linguist } from "../Feats/Linguist";
import { Lucky } from "../Feats/Lucky";
import { MageSlayer } from "../Feats/MageSlayer";
import { MagicInitiate } from "../Feats/MagicInitiate";
import { MartialAdept } from "../Feats/MartialAdept";
import { MediumArmorMaster } from "../Feats/MediumArmorMaster";
import { Mobile } from "../Feats/Mobile";
import { ModeratelyArmored } from "../Feats/ModeratelyArmored";
import { MountedCombatant } from "../Feats/MountedCombatant";
import { Observant } from "../Feats/Observant";
import { PolearmMaster } from "../Feats/PolearmMaster";
import { Resilient } from "../Feats/Resilient";
import { RitualCaster } from "../Feats/RitualCaster";
import { SavageAttacker } from "../Feats/SavageAttacker";
import { Sentinel } from "../Feats/Sentinel";
import { Sharpshooter } from "../Feats/Sharpshooter";
import { ShieldMaster } from "../Feats/ShieldMaster";
import { Skilled } from "../Feats/Skilled";
import { Skulker } from "../Feats/Skulker";
import { SpellSniper } from "../Feats/SpellSniper";
import { TavernBrawler } from "../Feats/TavernBrawler";
import { Tough } from "../Feats/Tough";
import { WarCaster } from "../Feats/WarCaster";
import { WeaponMaster } from "../Feats/WeaponMaster";
import { HillDwarf } from "../Races/Dwarf/Subrace/HillDwarf";
import { MountainDwarf } from "../Races/Dwarf/Subrace/MountainDwarf";
import { DarkElf } from "../Races/Elf/Subrace/DarkElf";
import { HighElf } from "../Races/Elf/Subrace/HighElf";
import { WoodElf } from "../Races/Elf/Subrace/WoodElf";
import { AirGenasi } from "../Races/Genasi/Subrace/AirGenasi";
import { EarthGenasi } from "../Races/Genasi/Subrace/EarthGenasi";
import { FireGenasi } from "../Races/Genasi/Subrace/FireGenasi";
import { WaterGenasi } from "../Races/Genasi/Subrace/WaterGenasi";
import { ForestGnome } from "../Races/Gnome/Subrace/ForestGnome";
import { MountainGnome } from "../Races/Gnome/Subrace/MountainGnome";
import { HalfElf } from "../Races/Half Elf/HalfElf";
import { HalfOrc } from "../Races/Half Orc/HalfOrc";
import { Lightfoot } from "../Races/Halfling/Subrace/Lightfoot";
import { Stout } from "../Races/Halfling/Subrace/Stout";
import { BaseHuman } from "../Races/Human/Subrace/BaseHuman";
import { VariantHuman } from "../Races/Human/Subrace/VariantHuman";
import { Tiefling } from "../Races/Tiefling/Tiefling";
import { Dragonborn } from "../Races/Dragonborn/Dragonborn";


export const raceDict = {
  Dragonborn: Dragonborn,
  "Hill Dwarf": HillDwarf,
  "Mountain Dwarf": MountainDwarf,
  "Dark Elf": DarkElf,
  "High Elf": HighElf,
  "Wood Elf": WoodElf,
  "Air Genasi": AirGenasi,
  "Earth Genasi": EarthGenasi,
  "Fire Genasi": FireGenasi,
  "Water Genasi": WaterGenasi,
  "Forest Gnome": ForestGnome,
  "Mountain Gnome": MountainGnome,
  "Half Elf": HalfElf,
  "Half Orc": HalfOrc,
  "Lightfoot Halfling": Lightfoot,
  "Stout Halfling": Stout,
  "Base Human": BaseHuman,
  "Variant Human": VariantHuman,
  Tiefling: Tiefling,
};

export const classDict = {
  Artificer: Artificer,
  Barbarian: Barbarian,
  Bard: Bard,
  Cleric: Cleric,
  Druid: Druid,
  Fighter: Fighter,
  Monk: Monk,
  Paladin: Paladin,
  Ranger: Ranger,
  Rogue: Rogue,
  Sorcerer: Sorcerer,
  Warlock: Warlock,
  Wizard: Wizard,
};

export const bgDict = {
  Acolyte: Acolyte,
  Charlatan: Charlatan,
  Criminal: Criminal,
  Entertainer: Entertainer,
  "Folk Hero": FolkHero,
  "Guild Artisan": GuildArtisan,
  Hermit: Hermit,
  Knight: Knight,
  Noble: Noble,
  Outlander: Outlander,
  Pirate: Pirate,
  Sage: Sage,
  Sailor: Sailor,
  Soldier: Soldier,
  Urchin: Urchin,
};

export const featDict = {
  Actor: Actor,
  Alert: Alert,
  Athlete: Athlete,
  Charger: Charger,
  "Crossbow Expert": CrossbowExpert,
  "Defensive Duelist": DefensiveDuelist,
  "Dual Wielder": DualWielder,
  "Dungeon Delver": DungeonDelver,
  Durable: Durable,
  "Elemental Adept": ElementalAdept,
  Grappler: Grappler,
  "Great Weapon Master": GreatWeaponMaster,
  Healer: Healer,
  "Heavily Armored": HeavilyArmored,
  "Heavy Armor Master": HeavyArmorMaster,
  "Inspiring Leader": InspiringLeader,
  "Keen Mind": KeenMind,
  "Lightly Armored": LightlyArmored,
  Linguist: Linguist,
  Lucky: Lucky,
  "Mage Slayer": MageSlayer,
  "Magic Initiate": MagicInitiate,
  "Martial Adept": MartialAdept,
  "Medium Armor Master": MediumArmorMaster,
  Mobile: Mobile,
  "Moderately Armored": ModeratelyArmored,
  "Mounted Combatant": MountedCombatant,
  Observant: Observant,
  "Polearm Master": PolearmMaster,
  Resilient: Resilient,
  "Ritual Caster": RitualCaster,
  "Savage Attacker": SavageAttacker,
  Sentinel: Sentinel,
  Sharpshooter: Sharpshooter,
  "Shield Master": ShieldMaster,
  Skilled: Skilled,
  Skulker: Skulker,
  "Spell Sniper": SpellSniper,
  "Tavern Brawler": TavernBrawler,
  Tough: Tough,
  "War Caster": WarCaster,
  "Weapon Master": WeaponMaster,
};
