import { PlayerCharacter } from "../../../Base/PlayerCharacter";
import { Human } from "../Human";
import { RaceParams } from "../../Race";


export class VariantHuman extends Human {
    constructor(params: RaceParams) {
      super("Variant Human", params.language);
      this.traits.push(
        {
          title: "Extra Language",
          description: `You can speak, read, and write one extra language of your chotce. - ${params.language}`,
        },
        {
          title: "Proficiency",
          description: `You gain proficiency in a skill of your choice . - ${params.skillProficiencies[0]}`,
        }
      );
  
      this.chosenAbilityScores = params.abilityScores;
      this.chosenProficiency = params.skillProficiencies[0];
    }
  
    chosenAbilityScores: string[];
    chosenProficiency: string;
  
    abilityIncrease(pc: PlayerCharacter): void {
      pc.abilityScores[this.chosenAbilityScores[0]].update(1);
      pc.abilityScores[this.chosenAbilityScores[1]].update(1);
    }
  
    proficiencies(pc: PlayerCharacter): void {
      pc.skills[this.chosenProficiency].proficient = true;
    }
  }
  