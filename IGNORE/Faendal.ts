import { PlayerCharacter } from "../src/Base/PlayerCharacter";
import { WoodElf } from "../src/Races/Elf";
import { Ranger } from "../src/Classes/Ranger";
import { FolkHero } from "../src/Backgrounds/Background";
import { Jsonify } from "./Jsonify";

let pc: PlayerCharacter = new PlayerCharacter(8, 16, 14, 14, 15, 13);
const race = new WoodElf("Sylvan");
const pclass = new Ranger(
  ["Insight", "Perception", "Stealth"],
  ["DAGGER", "SPEAR"],
  ["LEATHER"],
  {
    isNoInput: false,
    favoredEnemy: "Enemies of Nature",
    favoredTerrain: "Forest",
  },
  "EXPLORER",
  false
);
const background = new FolkHero(
  "Leatherworker's Tools,",
  "LEATHERWORKER'S TOOLS"
);
race.apply(pc);
pclass.apply(pc);
background.apply(pc);

Jsonify.dumpToJSON(pc, "Faendal");
