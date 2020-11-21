import { Race } from "../Race";
import { PlayerCharacter } from "../../Base/PlayerCharacter";
import * as traits from "./Dwarf.json";
import * as languages from "../../../Assets/Languages.json";

export abstract class Dwarf extends Race {
  constructor(name: string, toolProficiency: string) {
    super(
      name,
      "350 years", // Average Lifespan
      25, // Speed (Movement)
      "Medium", // Size
      [languages["Common"], languages["Dwarvish"]], // Languages
      [
        traits["DARKVISION"],
        traits["DWARVEN RESILIENCE"],
        traits["STONECUNNING"],
      ], // Racial Traits
      ["Battleaxe", "Handaxe", "Light Hammer", "Warhammer"], // Weapon Proficiencies
      [], // Armor Proficiencies
      [toolProficiency] // Tool Proficiences
    );
  }

  abilitiesAtLevels = {};
}




