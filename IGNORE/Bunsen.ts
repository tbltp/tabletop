import { PlayerCharacter } from "../src/Base/PlayerCharacter";
import { FireGenasi } from "../src/Races/Genasi";
import { Sage } from "../src/Backgrounds/Background";
import { Barbarian } from "../src/Classes/Barbarian";

import { Jsonify } from "./Jsonify";

let pc: PlayerCharacter = new PlayerCharacter(18, 15, 15, 14, 6, 17);
const race = new FireGenasi();
const background = new Sage(["Gnomish", "Elvish"]);
const pclass = new Barbarian(
  ["athletics", "nature"],
  ["GREATAXE", "HANDAXE", "HANDAXE"]
);
race.apply(pc);
background.apply(pc);
pclass.apply(pc);

pclass.abilitiesAtLevels["2"](pc, {isNoInput: true});

Jsonify.dumpToJSON(pc, "Bunsen");
