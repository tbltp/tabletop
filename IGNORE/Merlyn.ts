import { CharacterSheet } from "../src/Base/CharacterSheet";
import { PlayerCharacter } from "../src/Base/PlayerCharacter";
import { MountainGnome } from "../src/Races/Gnome/Subrace/MountainGnome";
import { Cleric } from "../src/Classes/Cleric/Cleric";
import { FolkHero } from "../src/Backgrounds/Background";
import { Jsonify } from "../src/Utilities/Jsonify";

let pc: CharacterSheet = new CharacterSheet(
  "Merlyn",
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

pc.levelUp("Cleric", 4, {isNoInput: true});
pc.levelUp("Cleric", 5, {isNoInput: true});
pc.levelUp("Cleric", 5, {isNoInput: false, abilityScoreImprovement: [{"ability": "wisdom", "improvement": 2}], spellSelection: ["RESISTANCE"]});
pc.levelUp("Cleric", 5, {isNoInput: true});

Jsonify.dumpToJSON(pc, "Merlyn");
