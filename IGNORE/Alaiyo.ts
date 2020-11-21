import { PlayerCharacter } from "../src/Base/PlayerCharacter";
import { Tiefling } from "../src/Races/Tiefling/Tiefling";
import { Charlatan } from "../src/Backgrounds/Background";
import { Bard } from "../src/Classes/Bard/Bard";
import { CharacterSheet } from "../src/Base/CharacterSheet";

import { Jsonify } from "../src/Utilities/Jsonify";
import { Ranger } from "../src/Classes/Ranger/Ranger";
import { Barbarian } from "../src/Classes/Barbarian/Barbarian";

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

//pc.multiClass(new Barbarian(true));


Jsonify.dumpToJSON(pc, "Alaiyo");

let newsheet: CharacterSheet = Jsonify.dumpFromLocal(`./IGNORE/Alaiyo.json`);
newsheet.levelUp("Ranger", 10, {isNoInput: false, spellSelection: ["AID"], fightingStyle: ["ARCHERY"]});

Jsonify.dumpToJSON(newsheet, "Alaiyo");
