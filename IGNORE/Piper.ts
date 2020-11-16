import { PlayerCharacter } from "../src/Base/PlayerCharacter";
import { WaterGenasi } from "../src/Races/Genasi/Genasi";
import { Sage } from "../src/Backgrounds/Background";
import { Monk } from "../src/Classes/Monk/Monk";

import { Jsonify } from "./Jsonify";

let pc: PlayerCharacter = new PlayerCharacter(13, 16, 11, 10, 13, 11);
const race = new WaterGenasi();
const background = new Sage(["Gnomish", "Elvish"]);
const pclass = new Monk(
  false,
  {isNoInput: true},
  ["acrobatics", "insight"],
  ["QUARTERSTAFF"],
  [],
  "EXPLORER"
);
race.apply(pc);
background.apply(pc);
pclass.apply(pc);

pclass.abilitiesAtLevels["2"](pc, {isNoInput: true});
pclass.abilitiesAtLevels["3"](pc, {isNoInput: false, subclassSelection: {subclass: "OPEN HAND"}});
race.abilitiesAtLevels["3"](pc);

Jsonify.dumpToJSON(pc, "Piper");