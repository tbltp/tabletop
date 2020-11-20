import { Elf } from "../Elf";
import { PlayerCharacter } from "../../../Base/PlayerCharacter";
import * as traits from "../Elf.json";
import * as languages from "../../../../Assets/Languages.json";
import * as Spells from "../../../../Assets/Spells.json";
import { ISpell, Spell } from "../../../Base/Interfaces";


export class HighElf extends Elf {
    constructor(cantrip: string, language: string) {
      super("High Elf");
      this.traits.push(
        {
          title: "Cantrip",
          description: `You know one cantrip of your choice from the wizard spell list. Intelligence is your spellcasting ability for it - ${cantrip}`,
        },
        {
          title: "Extra Language",
          description: `You can speak, read, and write one extra language of your choice. - ${language}`,
        }
      );
      this.weaponProficiencies.push(
        "Longsword",
        "Shortsword",
        "Shortbow",
        "Longbow"
      );
      this.languages.push(languages[language]);
      this.cantrip = cantrip;
    }
  
    cantrip: string;
    abilitiesAtLevels = {
      "1": this.level1,
    };
  
    level1(pc: PlayerCharacter) {
      const ispell: ISpell = Spells[this.cantrip];
      const spell: Spell = { ...ispell, spellcastingAbility: "Intelligence" };
      pc.spells["0"].push(spell);
    }
  
    abilityIncrease(pc: PlayerCharacter): void {
      pc.abilityScores.dexterity.update(2);
      pc.abilityScores.intelligence.update(1);
    }
  
    proficiencies(pc: PlayerCharacter): void {
      pc.skills["perception"].proficient = true;
    }
  }