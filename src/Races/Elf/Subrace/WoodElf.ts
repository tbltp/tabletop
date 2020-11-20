import { Elf } from "../Elf";
import { PlayerCharacter } from "../../../Base/PlayerCharacter";
import * as traits from "../Elf.json";
import * as languages from "../../../../Assets/Languages.json";
import * as Spells from "../../../../Assets/Spells.json";
import { ISpell, Spell } from "../../../Base/Interfaces";

export class WoodElf extends Elf {
    constructor(language: string) {
      super("Wood Elf");
      this.traits.push(traits["FLEET OF FOOT"], traits["MASK OF THE WILD"]);
      this.speed += 5;
      this.languages.push(languages[language]);
      this.weaponProficiencies.push(
        "Longsword",
        "Shortsword",
        "Shortbow",
        "Longbow"
      );
    }
  
    abilitiesAtLevels = {};
  
    abilityIncrease(pc: PlayerCharacter): void {
      pc.abilityScores.dexterity.update(2);
      pc.abilityScores.wisdom.update(1);
    }
  
    proficiencies(pc: PlayerCharacter): void {
      pc.skills["perception"].proficient = true;
    }
  }