import { PlayerCharacter } from "Character/PlayerCharacter";
import { Feat, FeatParams } from "./Feat";
import * as SpellcastingAbility from "../../Assets/SpellcastingAbility.json";

export class MagicInitiate extends Feat {
    constructor(featParams: FeatParams) {
      super("Magic Initiate","",featParams.spellClass, featParams.spells); 
    }
  
  
    public apply(pc: PlayerCharacter) {
  
      pc.pcHelper.addSpells(this.spells, SpellcastingAbility[this.spellClass]);
      super.apply(pc, [this.spellClass, ...this.spells]); //TODO: put spells in spell added instead, when that's fixed
    }
  }
  