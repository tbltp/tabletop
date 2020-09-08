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
import { Barbarian } from './src/Classes/Barbarian';
import { PlayerClass } from './src/Classes/PlayerClass';



const pc = new PlayerCharacter(12,12,12,12,12,12);
const bclass = new Barbarian([], [], "");

bclass.apply(pc);
bclass.abilitiesAtLevels[3](pc, {
    isNoInput: false,
    archetypeSelection: [{
        archetype: 'TOTEM WARRIOR',
        options: ['BEAR']
    }]
});

console.log(pc.traits.features);

