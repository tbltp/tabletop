import { Race } from "../Race";
import { PlayerCharacter } from "../../Character/PlayerCharacter";
import * as traits from "./Halfling.json";
import * as languages from "../../../Assets/Languages.json";

export abstract class Halfling extends Race {
  constructor(name: string) {
    super(
      name,
      "150 years", // Average Lifespan
      25, // Speed (Movement)
      "Small", // Size
      [languages["Common"], languages["Halfling"]], // Languages
      [traits["LUCKY"], traits["BRAVE"], traits["HALFLING NIMBLENESS"]], // Racial Traits
      [], // Weapon Proficiencies
      [], // Armor Proficiencies
      [] // Tool Proficiences
    );
  }

  abilitiesAtLevels = {};
}
