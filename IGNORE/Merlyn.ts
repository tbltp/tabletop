import { PlayerCharacter } from "../src/Base/PlayerCharacter";
import { MountainGnome } from "../src/Races/Gnome";
import { Cleric } from "../src/Classes/Cleric/Cleric";
import { FolkHero } from "../src/Backgrounds/Background";
import { Jsonify } from "./Jsonify";

let pc: PlayerCharacter = new PlayerCharacter(14, 8, 13, 10, 15, 12);

const prace = new MountainGnome();
const pclass = new Cleric(
  false,
  {
    isNoInput: false,
    spellSelection: ["LIGHT", "MENDING", "SPARE THE DYING"],
    proficiencySelection: ["religion", "history"],
    archetypeSelection: [
      { archetype: "KNOWLEDGE", options: ["Sylvan", "Elvish"] },
    ],
  },
  ["persuasion", "insight"],
  ["MACE", "GREATCLUB"],
  ["LEATHER", "SHIELD"],
  "EXPLORER"
);
const pbackground = new FolkHero("Mason's tools", "TINKER'S TOOLS");

prace.apply(pc);
pclass.apply(pc);
pbackground.apply(pc);

pclass.abilitiesAtLevels["2"](pc, {isNoInput: true});
pclass.abilitiesAtLevels["3"](pc, {isNoInput: true});
pclass.abilitiesAtLevels["4"](pc, {isNoInput: false, abilityScoreImprovement: [{"ability": "wisdom", "improvement": 2}], spellSelection: ["RESISTANCE"]});

Jsonify.dumpToJSON(pc, "Merlyn");
