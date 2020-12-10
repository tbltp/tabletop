import { PlayerCharacter } from "Base/PlayerCharacter";
import { Feat } from "./Feat";
import * as SpellcastingAbility from "../../Assets/SpellcastingAbility.json";

export class RitualCaster extends Feat {
    // TODO: THIS IS VERY COMPLEX - NOT DONE
    constructor(spellClass: string, spells: string[]) {
      super("Ritual Caster","",spellClass, spells);
    }
  
    apply(pc: PlayerCharacter) {
  
      pc.pcHelper.addSpells(this.spells, SpellcastingAbility[this.spellClass]);
      super.apply(pc, [this.spellClass, ...this.spells]);
    }
  }
  