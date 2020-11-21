import { Race } from "../Race";
import { PlayerCharacter } from "../../Base/PlayerCharacter";
import * as traits from "./Tiefling.json";
import * as languages from "../../../Assets/Languages.json";
import * as Spells from "../../../Assets/Spells.json";
import { ISpell, Spell } from "../../Base/Interfaces";

export class Tiefling extends Race {
  constructor() {
    super(
      "Tiefling",
      "100 years", // Average Lifespan
      30, // Speed (Movement)
      "Medium", // Size
      [languages["Common"], languages["Infernal"]], // Languages
      [
        traits["DARKVISION"],
        traits["HELLISH RESISTANCE"],
        traits["INFERNAL LEGACY"],
      ], // Racial Traits
      [], // Weapon Proficiencies
      [], // Armor Proficiencies
      [] // Tool Proficiences
    );
  }

  abilitiesAtLevels = {
    "1": this.level1,
    "3": this.level3,
    "5": this.level5,
  };

  level1(pc: PlayerCharacter) {
    let ispell: ISpell = Spells["THAUMATURGY"];
    const spell = { ...ispell, spellcastingAbility: "charisma" };
    pc.spells["0"].push(spell);
  }

  level3(pc: PlayerCharacter) {
    let ispell: ISpell = Spells["HELLISH REBUKE"];
    const spell = { ...ispell, spellcastingAbility: "charisma" };
    pc.spells["1"].push(spell);
  }

  level5(pc: PlayerCharacter) {
    let ispell: ISpell = Spells["DARKNESS"];
    const spell = { ...ispell, spellcastingAbility: "charisma" };
    pc.spells["2"].push(spell);
  }

  abilityIncrease(pc: PlayerCharacter): void {
    pc.abilityScores.charisma.update(2);
    pc.abilityScores.intelligence.update(1);
  }

  proficiencies(pc: PlayerCharacter): void {
    return;
  }
}

export class DSTiefling extends Tiefling {
  constructor(){
    super()
  }
}
