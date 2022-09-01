import { PlayerCharacter } from "Character/PlayerCharacter";
import { Feat, FeatParams } from "./Feat";
import * as Languages from "../../Assets/Languages.json";

export class Linguist extends Feat {
    constructor(featParams: FeatParams) {
      super("Linguist","","",[],featParams.languages);
    }
  
    public apply(pc: PlayerCharacter) {
      pc.abilityScores["intelligence"].update(1);
      for (let lang of this.languages) {
        pc.traits.languages.add(Languages[lang]);
      }
      super.apply(pc, [...this.languages])
    }
  }