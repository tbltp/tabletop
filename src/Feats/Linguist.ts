import { PlayerCharacter } from "Base/PlayerCharacter";
import { Feat } from "./Feat";
import * as Languages from "../../Assets/Languages.json";

export class Linguist extends Feat {
    constructor(languages: string[]) {
      super("Linguist");
    }
  
  
    public apply(pc: PlayerCharacter) {
      pc.abilityScores["intelligence"].update(1);
      for (let lang of this.languages) {
        pc.traits.languages.push(Languages[lang]);
      }
      super.apply(pc, [...this.languages])
    }
  }