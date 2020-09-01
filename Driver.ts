import { Acolyte, Charlatan, Criminal, Entertainer, FolkHero, GuildArtisan, Hermit, Noble, Knight, Outlander, Sage, Sailor, Pirate, Soldier, Urchin } from './src/Backgrounds/Background';

import { HillDwarf, MountainDwarf } from './src/Races/Dwarf';
import { HighElf, WoodElf, DarkElf } from './src/Races/Elf';
import { Lightfoot, Stout } from './src/Races/Halfling';
import { ForestGnome, MountainGnome } from './src/Races/Gnome';
import { Dragonborn } from './src/Races/Dragonborn';
import { HalfElf } from './src/Races/HalfElf';
import { BaseHuman, VariantHuman } from './src/Races/Human';
import { HalfOrc } from './src/Races/HalfOrc';
import { Tiefling } from './src/Races/Tiefling';

import { PlayerCharacter } from './src/Base/PlayerCharacter';

import {MagicInitiate} from './src/Feats/Ez';

let pc: PlayerCharacter = new PlayerCharacter(10, 10, 10, 10, 10, 10);

let feat = new MagicInitiate("Wizard", ["MAGE ARMOR", "AID"], "BANE");
feat.apply(pc);

console.log(pc.spells);