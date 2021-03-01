import { PlayerCharacter } from "../../../Base/PlayerCharacter";
import * as Traits from "../Genasi.json";
import { Genasi } from "../Genasi";

export class EarthGenasi extends Genasi {
    constructor() {
      super("Earth Genasi", [
        Traits["EARTH WALK"],
        Traits["MERGE WITH STONE"]
      ]);
    }
  
    abilityIncrease(pc: PlayerCharacter): void {
      super.abilityIncrease(pc);
      pc.abilityScores.strength.update(1);
    }
  
    proficiencies(pc: PlayerCharacter): void {
      return;
    }

    abilitiesAtLevels = {
      "1": this.level1
    };

    level1(pc: PlayerCharacter) {
      pc.pcHelper.addSpells(["PASS WITHOUT TRACE"], "constitution", Traits["MERGE WITH STONE"]);
    }
  }