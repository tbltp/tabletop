import { PlayerCharacter } from "Base/PlayerCharacter";
import { Feat } from "./Feat";

export class Skilled extends Feat {
    constructor(skills: string[], tools: string[]) {
      super("Skilled","","",[],[],skills,tools);
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