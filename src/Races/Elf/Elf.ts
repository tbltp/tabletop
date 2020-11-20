import { Race } from "../Race";
import { PlayerCharacter } from "../../Base/PlayerCharacter";
import * as traits from "./Elf.json";
import * as languages from "../../../Assets/Languages.json";
import * as Spells from "../../../Assets/Spells.json";
import { ISpell, Spell } from "../../Base/Interfaces";

export abstract class Elf extends Race {
  constructor(name: string) {
    super(
      name,
      "750 years", // Average Lifespan
      30, // Speed (Movement)
      "Medium", // Size
      [languages["Common"], languages["Elvish"]], // Languages
      [
        traits["DARKVISION"],
        traits["KEEN SENSES"],
        traits["FEY ANCESTRY"],
        traits["TRANCE"],
      ], // Racial Traits
      [], // Weapon Proficiencies
      [], // Armor Proficiencies
      [] // Tool Proficiences
    );
  }
}