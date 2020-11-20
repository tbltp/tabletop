import { PlayerCharacter } from "../src/Base/PlayerCharacter";
import { FireGenasi } from "../src/Races/Genasi/Subrace/FireGenasi";
import { Sage } from "../src/Backgrounds/Background";
import { Barbarian } from "../src/Classes/Barbarian/Barbarian";
import { CharacterSheet } from "../src/Base/CharacterSheet";

import { Jsonify } from "./Jsonify";

let pc = new CharacterSheet(
  "Bunsen",
  new PlayerCharacter(18, 15, 15, 14, 6, 17),
  new FireGenasi(),
  new Barbarian(
    false,
    ["athletics", "nature"],
    ["GREATAXE", "HANDAXE", "HANDAXE"]
  ),
  new Sage(["Gnomish", "Elvish"])
)

pc.levelUp("Barbarian", {isNoInput: true});
pc.levelUp("Barbarian", {isNoInput: false, subclassSelection: {subclass: "BERSERKER"}});
pc.levelUp("Barbarian", {isNoInput: false, abilityScoreImprovement: [{"ability": "dexterity", "improvement": 1}, {"ability": "constitution", "improvement": 1}]});
pc.levelUp("Barbarian", {isNoInput: true});

Jsonify.dumpToJSON(pc.character, "Bunsen");
