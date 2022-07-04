import { Race, RaceParams } from "../Race";
import { PlayerCharacter } from "../../Character/PlayerCharacter";
import * as traits from "./HalfElf.json";
import * as languages from "../../../Assets/Languages.json";

export class HalfElf extends Race {
  constructor(
    params: RaceParams
  ) {
    super(
      "Half-Elf",
      "180 years", // Average Lifespan
      30, // Speed (Movement)
      "Medium", // Size
      [languages["Common"], languages[params.language]], // Languages
      [traits["DARKVISION"], traits["FEY ANCESTRY"]], // Racial Traits
      [], // Weapon Proficiencies
      [], // Armor Proficiencies
      [] // Tool Proficiences
    );
    this.chosenAbilityScores = params.abilityScores;
    this.chosenProficiencies = params.skillProficiencies;
    this.traits.push(
      {
        title: "Skill Versatility",
        description: `You gain proficiency in two skills of your choice. - ${params.skillProficiencies[0]}, ${params.skillProficiencies[1]}`,
      },
      {
        title: "Extra Language",
        description: `You can speak, read, and write one extra language of your chotce. - ${params.language}`,
      }
    );
  }

  abilitiesAtLevels = {};
  chosenAbilityScores: string[];
  chosenProficiencies: string[];

  abilityIncrease(pc: PlayerCharacter): void {
    pc.abilityScores.charisma.update(2);
    pc.abilityScores[this.chosenAbilityScores[0]].update(1);
    pc.abilityScores[this.chosenAbilityScores[1]].update(1);
  }

  proficiencies(pc: PlayerCharacter): void {
    pc.skills[this.chosenProficiencies[0]].proficient = true;
    pc.skills[this.chosenProficiencies[1]].proficient = true;
  }
}
