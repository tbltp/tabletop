import { PlayerCharacter } from "Character/PlayerCharacter";
import { Feat, FeatParams } from "./Feat";
import * as SpellcastingAbility from "../../Assets/SpellcastingAbility.json";

export class SpellSniper extends Feat {
    constructor(featParams: FeatParams) {
      super("Spell Sniper", "", featParams.spellClass, featParams.spells)
    }
  
    apply(pc: PlayerCharacter) {
      // if (!this.spellcasterPrereqCheck(pc)) {
      //   throw Error("Requirement Not Met: Spellcaster");
      // }
  
      pc.pcHelper.addSpells(this.spells, SpellcastingAbility[this.spellClass]);
      super.apply(pc, [this.spellClass, ...this.spells]);
    }
  }