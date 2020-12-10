import { CharacterSheet } from "../src/Base/CharacterSheet";
import { PlayerCharacter } from "../src/Base/PlayerCharacter";

import { WoodElf } from "../src/Races/Elf/Subrace/WoodElf";
import { Ranger } from "../src/Classes/Ranger/Ranger";
import { FolkHero } from "../src/Backgrounds/FolkHero";

import { Jsonify } from "../src/Utilities/Jsonify";

let pc: CharacterSheet = new CharacterSheet(
  "Faendal",
  new PlayerCharacter(8, 16, 14, 14, 15, 13),
  new WoodElf(),
  new Ranger(
    false,
    ["insight", "perception", "stealth"],
    {
      isNoInput: false,
      favoredEnemy: "Enemies of Nature",
      favoredTerrain: "Forest",
    },
    ["DAGGER", "SPEAR"],
    ["LEATHER"],
    "EXPLORER"
  ),
  new FolkHero("Leatherworker's Tools,", "LEATHERWORKER'S TOOLS")
);

pc.levelUp("Ranger", 8, {
  isNoInput: false,
  fightingStyle: ["ARCHERY"],
  spellSelections: { add: ["HAIL OF THORNS", "HUNTER'S MARK"] },
});
pc.levelUp("Ranger", 8, {
  isNoInput: false,
  subclassSelection: { subclass: "HUNTER", options: ["HORDE BREAKER"] },
  spellSelections: { add: ["CURE WOUNDS"] },
});
pc.levelUp("Ranger", 8, {
  isNoInput: false,
  abilityScoreImprovement: [{ ability: "dexterity", improvement: 2 }],
});
pc.levelUp("Ranger", 9, {
  isNoInput: false,
  spellSelections: { add: ["SPIKE GROWTH"] },
});

Jsonify.dumpToJSON(pc, "Faendal");
