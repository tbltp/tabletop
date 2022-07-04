import { Race } from "../Race";
import { PlayerCharacter } from "../../Character/PlayerCharacter";
import * as traits from "./HalfOrc.json";
import * as languages from "../../../Assets/Languages.json";

export class HalfOrc extends Race {
  constructor() {
    super(
      "Half-Orc",
      "75 years", // Average Lifespan
      30, // Speed (Movement)
      "Medium", // Size
      [languages["Common"], languages["Orc"]], // Languages
      [
        traits["DARKVISION"],
        traits["MENACING"],
        traits["RELENTLESS ENDURANCE"],
        traits["SAVAGE ATTACKS"],
      ], // Racial Traits
      [], // Weapon Proficiencies
      [], // Armor Proficiencies
      [] // Tool Proficiences
    );
  }

  abilitiesAtLevels = {};

  abilityIncrease(pc: PlayerCharacter): void {
    pc.abilityScores.strength.update(2);
    pc.abilityScores.constitution.update(1);
  }

  proficiencies(pc: PlayerCharacter): void {
    pc.skills["intimidation"].proficient = true;
  }
}
