import { ISpell, Spell } from "../../../Base/Interfaces";
import { PlayerCharacter } from "../../../Base/PlayerCharacter";
import { Gnome } from "../Gnome";
import * as GnomeRacialTraits from "../Gnome.json";
import * as Spells from '../../../../Assets/Spells.json';

export class ForestGnome extends Gnome {
    constructor() {
      super("Forest Gnome");
      this.traits.push(
        GnomeRacialTraits["NATURAL ILLUSIONIST"],
        GnomeRacialTraits["SPEAK WITH SMALL BEASTS"]
      );
    }
  
    abilitiesAtLevels = {
      "1": this.level1,
    };
  
    level1(pc: PlayerCharacter) {
      const ispell: ISpell = Spells["MINOR ILLUSION"];
      const spell: Spell = { ...ispell, spellcastingAbility: "intelligence" };
      pc.spells["0"].push(spell);
    }
  
    abilityIncrease(pc: PlayerCharacter): void {
      pc.abilityScores.intelligence.update(2);
      pc.abilityScores.dexterity.update(1);
    }
  
    proficiencies(pc: PlayerCharacter): void {
      return;
    }
  }