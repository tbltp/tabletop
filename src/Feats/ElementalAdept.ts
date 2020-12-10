import { Trait } from "Base/Interfaces";
import { PlayerCharacter } from "Base/PlayerCharacter";
import { Feat } from "./Feat";

export class ElementalAdept extends Feat {
    constructor(element: string) {
      super("Elemental Adept","","",[],[],[],[],[],element);
    }
  
    apply(pc: PlayerCharacter) {
      if(!this.spellcasterPrereqCheck(pc)) {
        throw Error("Requirement Not Met: Spellcasting");
      }
  
      super.apply(pc, [this.element]);
    }
  }