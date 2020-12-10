import { CharacterSheet} from "../src/Base/CharacterSheet";
import { PlayerCharacter } from "../src/Base/PlayerCharacter";

import { HalfElf } from "../src/Races/Half Elf/HalfElf";
import { Druid } from "../src/Classes/Druid/Druid";
import { Criminal } from "../src/Backgrounds/Criminal";

import { Jsonify } from "../src/Utilities/Jsonify";



let pc: CharacterSheet = new CharacterSheet(
  "Maple",
  new PlayerCharacter(8, 14, 12, 10, 15, 13),
  new HalfElf(
    "Elvish",
    ["wisdom", "charisma"],
    ["persuasion", "investigation"]
  ),
  new Druid(
    false,
    {
      isNoInput: false,
      spellSelections: {
        add: ["POISON SPRAY", "PRODUCE FLAME"]
      },
    },
    ["insight", "perception"], 
    ["SCIMITAR"], 
    ["SHIELD"]
  ),
  new Criminal("Playing Card Set")
)

pc.levelUp("Druid", 5, {isNoInput: false, subclassSelection: {subclass: "MOON"}});
pc.levelUp("Druid", 5, {isNoInput: true})
pc.levelUp("Druid", 5, {isNoInput: false, abilityScoreImprovement: [{"ability": "wisdom", "improvement": 2}], spellSelections: { add: ["RESISTANCE"]}});
pc.levelUp("Druid", 5, {isNoInput: true})

Jsonify.dumpToJSON(pc, "Maple");
