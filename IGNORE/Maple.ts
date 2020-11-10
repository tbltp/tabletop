import { PlayerCharacter } from "../src/Base/PlayerCharacter";
import { HalfElf } from "../src/Races/HalfElf";
import { Druid } from "../src/Classes/Druid/Druid";
import { Criminal } from "../src/Backgrounds/Background";
import { Jsonify } from "./Jsonify";

let pc: PlayerCharacter = new PlayerCharacter(8, 14, 12, 10, 15, 13);

const prace = new HalfElf(
  "Elvish",
  ["wisdom", "charisma"],
  ["persuasion", "investigation"]
);
const pclass = new Druid(["insight", "perception"], ["SCIMITAR"], ["SHIELD"], {
  isNoInput: false,
  spellSelection: ["POISON SPRAY", "PRODUCE FLAME"],
});
const pbackground = new Criminal("Playing Card Set");

prace.apply(pc);
pclass.apply(pc);
pbackground.apply(pc);

pclass.abilitiesAtLevels["2"](pc, {isNoInput: false, archetypeSelection: [{archetype: "MOON"}]})
pclass.abilitiesAtLevels["3"](pc, {isNoInput: true})
pclass.abilitiesAtLevels["4"](pc, {isNoInput: false, abilityScoreImprovement: [{"ability": "wisdom", "improvement": 2}], spellSelection: ["RESISTANCE"]});


Jsonify.dumpToJSON(pc, "Maple");
