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

import { Barbarian } from './src/Classes/Barbarian';
import { Bard } from './src/Classes/Bard';
import { Cleric } from './src/Classes/Cleric';
import { Druid } from './src/Classes/Druid';
import { Fighter } from './src/Classes/Fighter';
import { Monk } from './src/Classes/Monk';
import { Paladin } from './src/Classes/Paladin';
import { Ranger } from './src/Classes/Ranger';
import { Rogue } from './src/Classes/Rogue';
import { Sorcerer } from './src/Classes/Sorcerer';
import { Warlock } from './src/Classes/Warlock';
import { Wizard } from './src/Classes/Wizard';

import { Acolyte, Charlatan, Criminal, Entertainer, FolkHero, GuildArtisan, Hermit, Noble, Knight, Outlander, Sage, Sailor, Pirate, Soldier, Urchin } from './src/Backgrounds/Background';

import { Alert, Athlete, Actor, Charger, CrossbowExpert, DefensiveDuelist, DualWielder, DungeonDelver, Durable, ElementalAdept, Grappler, GreatWeaponMaster, Healer, HeavilyArmored, HeavyArmorMaster, InspiringLeader, KeenMind, LightlyArmored, Linguist, Lucky, MageSlayer, MagicInitiate, MartialAdept, MediumArmorMaster, Mobile, ModeratelyArmored, MountedCombatant, Observant, PolearmMaster, Resilient, RitualCaster, SavageAttacker, Sentinel, Sharpshooter, ShieldMaster, Skilled, Skulker, SpellSniper, TavernBrawler, Tough, WarCaster, WeaponMaster } from './src/Feats/Feat';



let pc = new PlayerCharacter(10, 10, 10, 10, 10, 10);

let pclass = new Barbarian([], [], "");
pclass.apply(pc);

pclass.abilitiesAtLevels["2"](pc, {isNoInput: true});

pclass.abilitiesAtLevels["3"](pc, {isNoInput: false, archetypeSelection: [{archetype: "TOTEM WARRIOR", options: ["EAGLE"]}]});

console.log(pc.traits.features);