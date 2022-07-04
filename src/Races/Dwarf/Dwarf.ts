import { Race } from "../Race";
import { PlayerCharacter } from "../../Character/PlayerCharacter";
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
        traits["DWARVEN COMBAT TRAINING"]
      ], // Racial Traits
      ["Battleaxe", "Handaxe", "Light Hammer", "Warhammer"], // Weapon Proficiencies
      [], // Armor Proficiencies
      [toolProficiency] // Tool Proficiences
    );
  }

  abilityIncrease(pc: PlayerCharacter) {
    pc.abilityScores.constitution.update(2);
  }

  abilitiesAtLevels = {};
}




