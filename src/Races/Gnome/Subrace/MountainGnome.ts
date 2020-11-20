import { PlayerCharacter } from "Base/PlayerCharacter";
import { Gnome } from "../Gnome";
import * as GnomeRacialTraits from "../Gnome.json";

export class MountainGnome extends Gnome {
    constructor() {
      super("Mountain Gnome");
      this.traits.push(GnomeRacialTraits["ARTIFICER'S LORE"], GnomeRacialTraits["TINKER"]);
      this.toolProficiencies.push("Tinker's Tools");
    }
  
    abilitiesAtLevels = {};
  
    abilityIncrease(pc: PlayerCharacter): void {
      pc.abilityScores.intelligence.update(2);
      pc.abilityScores.constitution.update(1);
    }
  
    proficiencies(pc: PlayerCharacter): void {
      return;
    }
  }
  