import { PlayerCharacter } from "../../../Base/PlayerCharacter";
import { Human } from "../Human";
import { RaceParams } from "../../Race";


export class BaseHuman extends Human {
    constructor(params: RaceParams) {
      super("Human", params.language);
    }
  
    abilityIncrease(pc: PlayerCharacter): void {
      pc.abilityScores.strength.update(1);
      pc.abilityScores.dexterity.update(1);
      pc.abilityScores.constitution.update(1);
      pc.abilityScores.intelligence.update(1);
      pc.abilityScores.wisdom.update(1);
      pc.abilityScores.charisma.update(1);
    }
  
    proficiencies(pc: PlayerCharacter): void {
      return;
    }
  }