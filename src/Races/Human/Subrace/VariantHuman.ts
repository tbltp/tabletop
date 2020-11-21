import { PlayerCharacter } from "../../../Base/PlayerCharacter";
import { Human } from "../Human";

export class VariantHuman extends Human {
    constructor(language: string, proficiency: string, abilityScores: string[]) {
      super("Variant Human", language);
      this.traits.push(
        {
          title: "Extra Language",
          description: `You can speak, read, and write one extra language of your chotce. - ${language}`,
        },
        {
          title: "Proficiency",
          description: `You gain proficiency in a skill of your choice . - ${proficiency}`,
        }
      );
  
      this.chosenAbilityScores = abilityScores;
      this.chosenProficiency = proficiency;
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
  