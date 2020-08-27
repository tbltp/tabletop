import { Acolyte, Charlatan, Criminal, Entertainer, FolkHero, GuildArtisan, Hermit, Noble, Knight, Outlander, Sage, Sailor, Pirate, Soldier, Urchin } from './Backgrounds/Background';

import { HillDwarf, MountainDwarf } from './Races/Dwarf';
import { HighElf, WoodElf, DarkElf } from './Races/Elf';
import { Lightfoot, Stout } from './Races/Halfling';
import { ForestGnome, MountainGnome } from './Races/Gnome';
import { Dragonborn } from './Races/Dragonborn';
import { HalfElf } from './Races/HalfElf';
import { BaseHuman, VariantHuman } from './Races/Human';
import { HalfOrc } from './Races/HalfOrc';
import { Tiefling } from './Races/Tiefling';
import { LightlyArmored } from './Feats/Ez';

import { PlayerCharacter } from './Base/PlayerCharacter';
import { Feat } from './Feats/Feat';

let a = new PlayerCharacter(10, 10, 10, 10, 10, 13);

let feat: Feat = new LightlyArmored('dexterity');
feat.apply(a);



console.log(a.abilityScores);
console.log(a.traits);
