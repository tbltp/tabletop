import { PlayerCharacter } from "Character/PlayerCharacter";
import { Feat, FeatParams } from "./Feat";

export class TavernBrawler extends Feat {
    constructor(featParams: FeatParams) {
      super("Tavern Brawler", featParams.abilityScore);
    }
  
    apply(pc: PlayerCharacter) {
      pc.abilityScores[this.abilityScore].update(1);
      pc.traits.weaponProficiencies.add("Unarmed Strike");
      pc.traits.weaponProficiencies.add("Improvised Weapons");
      super.apply(pc, [this.abilityScore]);
    }
  }