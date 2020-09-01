import { PlayerCharacter } from './src/Base/PlayerCharacter';

import { HillDwarf, MountainDwarf } from './src/Races/Dwarf';
import { HighElf, WoodElf, DarkElf } from './src/Races/Elf';
import { Lightfoot, Stout } from './src/Races/Halfling';
import { ForestGnome, MountainGnome } from './src/Races/Gnome';
import { Dragonborn } from './src/Races/Dragonborn';
import { HalfElf } from './src/Races/HalfElf';
import { BaseHuman, VariantHuman } from './src/Races/Human';
import { HalfOrc } from './src/Races/HalfOrc';
import { Tiefling } from './src/Races/Tiefling';

import { Acolyte, Charlatan, Criminal, Entertainer, FolkHero, GuildArtisan, Hermit, Noble, Knight, Outlander, Sage, Sailor, Pirate, Soldier, Urchin } from './src/Backgrounds/Background';

import { Alert, Athlete, Actor, Charger, CrossbowExpert, DefensiveDuelist, DualWielder, DungeonDelver, Durable, ElementalAdept, Grappler, GreatWeaponMaster, Healer, HeavilyArmored, HeavyArmorMaster, InspiringLeader, KeenMind, LightlyArmored, Linguist, Lucky, MageSlayer, MagicInitiate, MartialAdept, MediumArmorMaster, Mobile, ModeratelyArmored, MountedCombatant, Observant, PolearmMaster, Resilient, RitualCaster, SavageAttacker, Sentinel, Sharpshooter, ShieldMaster, Skilled, Skulker, SpellSniper, TavernBrawler, Tough, WarCaster, WeaponMaster } from './src/Feats/Feat';

let pc: PlayerCharacter = new PlayerCharacter(10, 10, 10, 10, 10, 10);

console.log(pc);