import { PlayerCharacter } from "Base/PlayerCharacter";
import { Feat, FeatParams } from "./Feat";
import * as SpellcastingAbility from "../../Assets/SpellcastingAbility.json";

export class RitualCaster extends Feat {
    // TODO: THIS IS VERY COMPLEX - NOT DONE
    constructor(featParams: FeatParams) {
      super("Ritual Caster", "", featParams.spellClass, featParams.spells);
    }
  
    apply(pc: PlayerCharacter) {
  
      pc.pcHelper.addSpells(this.spells, SpellcastingAbility[this.spellClass]);
      super.apply(pc, [this.spellClass, ...this.spells]);
    }
  }
  