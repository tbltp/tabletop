import { CharacterSheet } from "../src/Base/CharacterSheet";
import { PlayerCharacter } from "../src/Base/PlayerCharacter";

import { WoodElf } from "../src/Races/Elf/Elf";
import { Ranger } from "../src/Classes/Ranger/Ranger";
import { FolkHero } from "../src/Backgrounds/Background";

import { Jsonify } from "./Jsonify";

let pc: CharacterSheet = new CharacterSheet(
  new PlayerCharacter(8, 16, 14, 14, 15, 13),
  new WoodElf("Sylvan"),
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
  new FolkHero(
    "Leatherworker's Tools,",
    "LEATHERWORKER'S TOOLS"
  )
);


pc.levelUp("Ranger", {isNoInput: false, fightingStyle: ["ARCHERY"], spellSelection: ["HAIL OF THORNS", "HUNTER'S MARK"]});
pc.levelUp("Ranger", {isNoInput: false, subclassSelection: { subclass: "HUNTER", options: ["HORDE BREAKER"] }, spellSelection: ["CURE WOUNDS"]});
pc.levelUp("Ranger", {isNoInput: false, abilityScoreImprovement: [{"ability": "dexterity", "improvement": 2}]});
pc.levelUp("Ranger", {isNoInput: false, spellSelection: ["SPIKE GROWTH"]})

Jsonify.dumpToJSON(pc.character, "Faendal");
