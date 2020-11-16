import { CharacterSheet} from "../src/Base/CharacterSheet";
import { PlayerCharacter } from "../src/Base/PlayerCharacter";

import { HalfElf } from "../src/Races/Half Elf/HalfElf";
import { Druid } from "../src/Classes/Druid/Druid";
import { Criminal } from "../src/Backgrounds/Background";

import { Jsonify } from "./Jsonify";



let pc: CharacterSheet = new CharacterSheet(
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
        spellSelection: ["POISON SPRAY", "PRODUCE FLAME"],
      },
      ["insight", "perception"], 
      ["SCIMITAR"], 
      ["SHIELD"]
    ),
    new Criminal("Playing Card Set")
)

pc.levelUp("Druid", {isNoInput: false, subclassSelection: {subclass: "MOON"}});
pc.levelUp("Druid", {isNoInput: true})
pc.levelUp("Druid", {isNoInput: false, abilityScoreImprovement: [{"ability": "wisdom", "improvement": 2}], spellSelection: ["RESISTANCE"]});
pc.levelUp("Druid", {isNoInput: true})

Jsonify.dumpToJSON(pc.character, "Maple");
