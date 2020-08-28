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
import { Observant } from './src/Feats/Ez';

import { PlayerCharacter } from './src/Base/PlayerCharacter';
import { Feat } from './src/Feats/Feat';

let pc1: PlayerCharacter = new PlayerCharacter(15, 15, 15, 15, 15, 15);

let ft: Feat = new Observant('intelligence'); 

console.log(pc1.passivePerception);
console.log(pc1.getSkillTotal('Perception'));
console.log(pc1.passiveInvestigation);
console.log(pc1.getSkillTotal('Investigation'));
console.log('-------------------------------------------------------------------------');
ft.apply(pc1);
console.log(pc1.passivePerception);
console.log(pc1.getSkillTotal('Perception'));
console.log(pc1.passiveInvestigation);
console.log(pc1.getSkillTotal('Investigation'));