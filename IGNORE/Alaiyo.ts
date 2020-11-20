import { PlayerCharacter } from "../src/Base/PlayerCharacter";
import { Tiefling } from "../src/Races/Tiefling/Tiefling";
import { Charlatan } from "../src/Backgrounds/Background";
import { Bard } from "../src/Classes/Bard/Bard";
import { CharacterSheet } from "../src/Base/CharacterSheet";

import { Jsonify } from "./Jsonify";
import { Ranger } from "../src/Classes/Ranger/Ranger";

let pc: CharacterSheet = new CharacterSheet(
  "Alaiyo",
  new PlayerCharacter(14, 17, 10, 11, 15, 18),
  new Tiefling(),
  new Bard(
    false,
    ["persuasion", "insight", "history"],
    ["Drum", "Lyre", "Flute"],
    {
      isNoInput: false,
      spellSelection: [
        "MESSAGE",
        "VICIOUS MOCKERY",
        "HEALING WORD",
        "THUNDERWAVE",
        "ILLUSORY SCRIPT",
        "DISSONANT WHISPERS",
      ],
    },
    ["RAPIER"],
    "DRUM",
    "SCHOLAR",
  ),
  new Charlatan()
);


pc.levelUp(
  "Bard",
  1,
  {
  isNoInput: false,
  spellSelection: ["UNSEEN SERVANT"],
});

pc.levelUp(
  "Bard",
  1,
  {
  isNoInput: false,
  spellSelection: ["DETECT THOUGHTS"],
  proficiencySelection: ["history", "insight"],
  subclassSelection: { subclass: "VALOR" },
});

pc.multiClass(new Ranger(true, ["perception"], {isNoInput: false, favoredEnemy: "White People", favoredTerrain: "Cities"}));


Jsonify.dumpToJSON(pc.character, "Alaiyo");
