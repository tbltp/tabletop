import { PlayerCharacter } from "Base/PlayerCharacter";
import { Feat } from "./Feat";
import * as SpellcastingAbility from "../../Assets/SpellcastingAbility.json";

export class MagicInitiate extends Feat {
    constructor(spellClass: string, cantrips: string[], firstLevelSpell: string) {
      super("Magic Initiate","",spellClass, [...cantrips, firstLevelSpell]);
    }
  
  
    public apply(pc: PlayerCharacter) {
  
      pc.pcHelper.addSpells(this.spells, SpellcastingAbility[this.spellClass]);
      super.apply(pc, [this.spellClass, ...this.spells]); //TODO: put spells in spell added instead, when that's fixed
    }
  }
  6