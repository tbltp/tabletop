import { PlayerCharacter } from "./src/Base/PlayerCharacter";

import { HillDwarf, MountainDwarf } from "./src/Races/Dwarf";
import { HighElf, WoodElf, DarkElf } from "./src/Races/Elf";
import { Lightfoot, Stout } from "./src/Races/Halfling";
import { ForestGnome, MountainGnome } from "./src/Races/Gnome";
import { Dragonborn } from "./src/Races/Dragonborn";
import { HalfElf } from "./src/Races/HalfElf";
import { BaseHuman, VariantHuman } from "./src/Races/Human";
import { HalfOrc } from "./src/Races/HalfOrc";
import { Tiefling } from "./src/Races/Tiefling";

import {
  Acolyte,
  Charlatan,
  Criminal,
  Entertainer,
  FolkHero,
  GuildArtisan,
  Hermit,
  Noble,
  Knight,
  Outlander,
  Sage,
  Sailor,
  Pirate,
  Soldier,
  Urchin,
} from "./src/Backgrounds/Background";

import {
  Alert,
  Athlete,
  Actor,
  Charger,
  CrossbowExpert,
  DefensiveDuelist,
  DualWielder,
  DungeonDelver,
  Durable,
  ElementalAdept,
  Grappler,
  GreatWeaponMaster,
  Healer,
  HeavilyArmored,
  HeavyArmorMaster,
  InspiringLeader,
  KeenMind,
  LightlyArmored,
  Linguist,
  Lucky,
  MageSlayer,
  MagicInitiate,
  MartialAdept,
  MediumArmorMaster,
  Mobile,
  ModeratelyArmored,
  MountedCombatant,
  Observant,
  PolearmMaster,
  Resilient,
  RitualCaster,
  SavageAttacker,
  Sentinel,
  Sharpshooter,
  ShieldMaster,
  Skilled,
  Skulker,
  SpellSniper,
  TavernBrawler,
  Tough,
  WarCaster,
  WeaponMaster,
} from "./src/Feats/Feat";
import { Barbarian } from "./src/Classes/Barbarian/Barbarian";
import { Bard } from "./src/Classes/Bard/Bard";
import { PlayerClass } from "./src/Classes/PlayerClass";

const pc = new PlayerCharacter(12, 12, 12, 12, 12, 12);
const bdclass = new Bard([], [], [], "", "ENTERTAINER", {
  isNoInput: false,
  spellSelection: [
    "VICIOUS MOCKERY",
    "DANCING LIGHTS",
    "CHARM PERSON",
    "BANE",
    "HEALING WORD",
    "THUNDERWAVE",
  ],
});

const bardArgs = [
  {
    isNoInput: false,
    spellSelection: [
      "VICIOUS MOCKERY",
      "DANCING LIGHTS",
      "CHARM PERSON",
      "BANE",
      "HEALING WORD",
      "THUNDERWAVE",
    ],
  },
  {
    isNoInput: false,
    spellSelection: ["SLEEP"],
  },
  {
    isNoInput: false,
    spellSelection: ["INVISIBILITY"],
    spellReplacements: {
      "HEALING WORD": "CURE WOUNDS",
    },
    proficiencySelection: ["Persuasion", "Performance"],
    archetypeSelection: [
      {
        archetype: "LORE",
      },
    ],
  },
];

bdclass.apply(pc);
for (let i = 2; i <= bardArgs.length; i++) {
  bdclass.abilitiesAtLevels[i](pc, bardArgs[i - 1]);
}
console.log(pc.proficiency);
console.log(pc.skills);
pc.proficiency.levelUp(15);
console.log(pc.proficiency);
console.log(pc.skills);
