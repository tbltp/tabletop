import { Race } from "../Race";
import { PlayerCharacter } from "../../Base/PlayerCharacter";
import * as traits from "./Gnome.json";
import * as languages from "../../../Assets/Languages.json";
import * as Spells from "../../../Assets/Spells.json";
import { ISpell, Spell } from "../../Base/Interfaces";

export abstract class Gnome extends Race {
  constructor(name: string) {
    super(
      name,
      "425 years", // Average Lifespan
      25, // Speed (Movement)
      "Small", // Size
      [languages["Common"], languages["Gnomish"]], // Languages
      [traits["DARKVISION"], traits["GNOME CUNNING"]], // Racial Traits
      [], // Weapon Proficiencies
      [], // Armor Proficiencies
      [] // Tool Proficiences
    );
  }
}