import { PlayerCharacter } from "Base/PlayerCharacter";
import { Feat } from "./Feat";
import * as SpellcastingAbility from "../../Assets/SpellcastingAbility.json";

export class SpellSniper extends Feat {
    constructor(spellClass: string, cantrip: string) {
      super("Spell Sniper","",spellClass, [cantrip]);
    }
  
    apply(pc: PlayerCharacter) {
      if (!this.spellcasterPrereqCheck(pc)) {
        throw Error("Requirement Not Met: Spellcaster");
      }
  
      pc.pcHelper.addSpells(this.spells, SpellcastingAbility[this.spellClass]);
      super.apply(pc, [this.spellClass, ...this.spells]);
    }
  }