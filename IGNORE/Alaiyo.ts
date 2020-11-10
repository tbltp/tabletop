import { PlayerCharacter } from "../src/Base/PlayerCharacter";
import { Tiefling } from "../src/Races/Tiefling";
import { Charlatan } from "../src/Backgrounds/Background";
import { Bard } from "../src/Classes/Bard/Bard";

import { Jsonify } from "./Jsonify";

let pc: PlayerCharacter = new PlayerCharacter(14, 17, 10, 11, 15, 18);
const race = new Tiefling();
const background = new Charlatan();
const bard = new Bard(
  ["persuasion", "insight", "history"],
  ["RAPIER"],
  ["Drum", "Lyre", "Flute"],
  "DRUM",
  "SCHOLAR",
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
  }
);

race.apply(pc);
background.apply(pc);
bard.apply(pc);
bard.abilitiesAtLevels[2](pc, {
  isNoInput: false,
  spellSelection: ["UNSEEN SERVANT"],
});
bard.abilitiesAtLevels[3](pc, {
  isNoInput: false,
  spellSelection: ["DETECT THOUGHTS"],
  proficiencySelection: ["history", "insight"],
  archetypeSelection: [{ archetype: "VALOR" }],
});
race.abilitiesAtLevels["3"](pc);

Jsonify.dumpToJSON(pc, "Alaiyo");
