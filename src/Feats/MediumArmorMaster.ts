import { PlayerCharacter } from "Character/PlayerCharacter";
import { Feat, FeatParams } from "./Feat";

export class MediumArmorMaster extends Feat {

    constructor(_featParams: FeatParams) {
      super("Medium Armor Master");
    }
  
    //is affected by new armor and changing dexterity - LATER ISSUE, SIMILAR TO FIGHTING STYLE IMPROVEMENTS ON NEW WEAPONS (not modelled)
    apply(pc: PlayerCharacter) {
      if(pc.abilityScores.dexterity.score < 16) { return; }

      let elligibleACs = pc.armorClasses.filter(armorClass => {
        pc.inventory.armor.find(armor => armor.name === armorClass.name).armorType === "Medium"
      })

      elligibleACs.forEach(AC => AC.bonus.value++);

    }
  }