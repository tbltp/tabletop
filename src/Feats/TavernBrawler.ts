import { PlayerCharacter } from "Base/PlayerCharacter";
import { Feat } from "./Feat";

export class TavernBrawler extends Feat {
    constructor(abilityScore: string) {
      super("Tavern Brawler", abilityScore);
    }
  
    apply(pc: PlayerCharacter) {
      pc.abilityScores[this.abilityScore].update(1);
      pc.traits.weaponProficiencies.push("Unarmed Strike", "Improvised Weapons");
      super.apply(pc, [this.abilityScore]);
    }
  }