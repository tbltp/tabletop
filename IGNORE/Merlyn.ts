import { PlayerCharacter } from "../src/Base/PlayerCharacter";
import { MountainGnome } from "../src/Races/Gnome";
import { Cleric } from "../src/Classes/Cleric";
import { FolkHero } from "../src/Backgrounds/Background";
import { Jsonify } from "./Jsonify";

let pc: PlayerCharacter = new PlayerCharacter(14, 8, 13, 10, 15, 12);

const prace = new MountainGnome();
const pclass = new Cleric(
  ["persuasion", "insight"],
  ["MACE", "GREATCLUB"],
  ["LEATHER", "SHIELD"],
  {
    isNoInput: false,
    spellSelection: ["LIGHT", "MENDING", "SPARE THE DYING"],
    proficiencySelection: ["religion", "history"],
    archetypeSelection: [
      { archetype: "KNOWLEDGE", options: ["Sylvan", "Elvish"] },
    ],
  },
  "EXPLORER"
);
const pbackground = new FolkHero("Mason's tools", "TINKER'S TOOLS");

prace.apply(pc);
pclass.apply(pc);
pbackground.apply(pc);

Jsonify.dumpToJSON(pc, "Merlyn");
