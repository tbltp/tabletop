import { PlayerCharacter } from "../src/Base/PlayerCharacter";
import { FireGenasi } from "../src/Races/Genasi/Subrace/FireGenasi";
import { Sage } from "../src/Backgrounds/Background";
import { Barbarian } from "../src/Classes/Barbarian/Barbarian";
import { CharacterSheet } from "../src/Base/CharacterSheet";

import { Jsonify } from "../src/Utilities/Jsonify";

let sheet = new CharacterSheet(
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

sheet.levelUp("Barbarian", 11, {isNoInput: true});
sheet.levelUp("Barbarian", 12, {isNoInput: false, subclassSelection: {subclass: "BERSERKER"}});
sheet.levelUp("Barbarian", 12, {isNoInput: false, abilityScoreImprovement: [{"ability": "dexterity", "improvement": 1}, {"ability": "constitution", "improvement": 1}]});
sheet.levelUp("Barbarian", 12, {isNoInput: true});

Jsonify.dumpToJSON(sheet, "Bunsen")
let newsheet: CharacterSheet = Jsonify.dumpFromLocal(`./IGNORE/Bunsen.json`);
newsheet.levelUp("Barbarian", 11, {isNoInput: true});
Jsonify.dumpToJSON(newsheet, "NewBunsen");

