import { PlayerCharacter } from "Base/PlayerCharacter";
import { Feat, FeatParams } from "./Feat";

export class Tough extends Feat {
    constructor(_featParams: FeatParams) {
      super("Tough");
    }
    
    abilitiesAtLevels = {
      "1": this.plusTwoHealth,
      "2": this.plusTwoHealth,
      "3": this.plusTwoHealth,
      "4": this.plusTwoHealth,
      "5": this.plusTwoHealth,
      "6": this.plusTwoHealth,
      "7": this.plusTwoHealth,
      "8": this.plusTwoHealth,
      "9": this.plusTwoHealth,
      "10": this.plusTwoHealth,
      "11": this.plusTwoHealth,
      "12": this.plusTwoHealth,
      "13": this.plusTwoHealth,
      "14": this.plusTwoHealth,
      "15": this.plusTwoHealth,
      "16": this.plusTwoHealth,
      "17": this.plusTwoHealth,
      "18": this.plusTwoHealth,
      "19": this.plusTwoHealth,
      "20": this.plusTwoHealth,
    };
  
    plusTwoHealth(pc: PlayerCharacter) {
      pc.baseStats["hpMax"].bonus.value += 2;
    }
  
    apply(pc: PlayerCharacter) {
      pc.baseStats["hpMax"].bonus.value += 2 * pc.level;
      super.apply(pc);
    }
  }