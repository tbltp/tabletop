import { Race } from "../Race";
import { PlayerCharacter } from "../../Character/PlayerCharacter";
import * as languages from "../../../Assets/Languages.json";

export abstract class Human extends Race {
  constructor(name: string, language: string) {
    super(
      name,
      "100 years", // Average Lifespan
      30, // Speed (Movement)
      "Medium", // Size
      [languages["Common"], languages[language]], // Languages
      [], // Racial Traits
      [], // Weapon Proficiencies
      [], // Armor Proficiencies
      [] // Tool Proficiences
    );
  }

  abilitiesAtLevels = {};
}

