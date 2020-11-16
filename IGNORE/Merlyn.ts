import { CharacterSheet } from "../src/Base/CharacterSheet";
import { PlayerCharacter } from "../src/Base/PlayerCharacter";
import { MountainGnome } from "../src/Races/Gnome/Gnome";
import { Cleric } from "../src/Classes/Cleric/Cleric";
import { FolkHero } from "../src/Backgrounds/Background";
import { Jsonify } from "./Jsonify";

let pc: CharacterSheet = new CharacterSheet(
  new PlayerCharacter(14, 8, 13, 10, 15, 12),
  new MountainGnome(),
  new Cleric(
    false,
    {
      isNoInput: false,
      spellSelection: ["LIGHT", "MENDING", "SPARE THE DYING"],
      proficiencySelection: ["religion", "history"],
      subclassSelection: { subclass: "KNOWLEDGE", options: ["Sylvan", "Elvish"] },
    },
    ["persuasion", "insight"],
    ["MACE", "GREATCLUB"],
    ["LEATHER", "SHIELD"],
    "EXPLORER"
  ),
  new FolkHero("Mason's tools", "TINKER'S TOOLS")
)

pc.levelUp("Cleric", {isNoInput: true});
pc.levelUp("Cleric", {isNoInput: true});
pc.levelUp("Cleric", {isNoInput: false, abilityScoreImprovement: [{"ability": "wisdom", "improvement": 2}], spellSelection: ["RESISTANCE"]});
pc.levelUp("Cleric", {isNoInput: true});

Jsonify.dumpToJSON(pc.character, "Merlyn");
