import { Race } from "../Race";
import { PlayerCharacter } from "../../Character/PlayerCharacter";
import * as Traits from "./Genasi.json";
import * as languages from "../../../Assets/Languages.json";
import { Trait } from "../../Character/Interfaces";

export abstract class Genasi extends Race {
  constructor(name: string, racialTraits: Trait[]) {
    super(
      name,
      "120 years", // Average Lifespan
      30, // Speed (Movement)
      "Medium", // Size
      [languages["Common"], languages["Primordial"]], // Languages
      racialTraits, // Racial Traits
      [], // Weapon Proficiencies
      [], // Armor Proficiencies
      [] // Tool Proficiences
    );
  }

  abilityIncrease(pc: PlayerCharacter) {
    pc.abilityScores.constitution.update(2);
  }

  abilitiesAtLevels = {};
}