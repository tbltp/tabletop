import { Trait } from "Character/Interfaces";
import { PlayerCharacter } from "Character/PlayerCharacter";
import { Feat, FeatParams } from "./Feat";

export class ElementalAdept extends Feat {
    constructor(featParams: FeatParams) {
      super("Elemental Adept","","",[],[],[],[],[],featParams.element);
    }
  
    apply(pc: PlayerCharacter) {
      // if(!this.spellcasterPrereqCheck(pc)) {
      //   throw Error("Requirement Not Met: Spellcasting");
      // }
  
      super.apply(pc, [this.element]);
    }
  }