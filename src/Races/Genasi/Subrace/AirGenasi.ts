import { PlayerCharacter } from "../../../Character/PlayerCharacter";
import * as Traits from "../Genasi.json";
import { Genasi } from "../Genasi";

export class AirGenasi extends Genasi {
    constructor() {
      super("Air Genasi", [
        Traits["UNENDING BREATH"],
        Traits["MINGLE WITH THE WIND"]
      ]);
    }
  
    abilityIncrease(pc: PlayerCharacter): void {
      super.abilityIncrease(pc);
      pc.abilityScores.dexterity.update(1);
    }
  
    proficiencies(pc: PlayerCharacter): void {
      return;
    }

    abilitiesAtLevels = {
      "1": this.level1
    };

    level1(pc: PlayerCharacter) {
      pc.pcHelper.addSpells(["LEVITATE"], "constitution", Traits["MINGLE WITH THE WIND"]);
    }
  }