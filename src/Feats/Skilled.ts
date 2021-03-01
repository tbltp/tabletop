import { PlayerCharacter } from "Base/PlayerCharacter";
import { Feat, FeatParams } from "./Feat";

export class Skilled extends Feat {
    constructor(featParams: FeatParams) {
      super("Skilled","","",[],[],featParams.skills, featParams.tools);
    }
  
    apply(pc: PlayerCharacter) {
      for (let s of this.skills) {
        pc.skills[s].proficient = true;
      }
  
      for (let t of this.tools) {
        pc.traits.toolProficiencies.add(t);
      }
  
      super.apply(pc, [...this.skills, ...this.tools]);
    }
  }