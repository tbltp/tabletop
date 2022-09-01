import * as Spells from "../../../../Assets/Spells.json";
import * as languages from "../../../../Assets/Languages.json";
import * as traits from "../Elf.json";

import { ISpell, Spell } from "../../../Character/Interfaces";

import { Elf } from "../Elf";
import { PlayerCharacter } from "../../../Character/PlayerCharacter";
import { RaceParams } from "../../Race";

export class HighElf extends Elf {
    constructor(params: RaceParams) {
      super("High Elf");
      this.traits.push(
        {
          title: "Cantrip",
          description: `You know one cantrip of your choice from the wizard spell list. Intelligence is your spellcasting ability for it - ${params.cantrip}`,
        },
        {
          title: "Extra Language",
          description: `You can speak, read, and write one extra language of your choice. - ${params.language}`,
        }
      );
      this.weaponProficiencies.push(
        "Longsword",
        "Shortsword",
        "Shortbow",
        "Longbow"
      );
      this.languages.push(languages[params.language]);
      this.cantrip = params.cantrip;
    }
  
    cantrip: string;
    abilitiesAtLevels = {
      "1": this.level1,
    };
  
    level1(pc: PlayerCharacter) {
      pc.pcHelper.addSpells([this.cantrip], "Intelligence")  // Add source.
    }
  
    abilityIncrease(pc: PlayerCharacter): void {
      pc.abilityScores.dexterity.update(2);
      pc.abilityScores.intelligence.update(1);
    }
  
    proficiencies(pc: PlayerCharacter): void {
      pc.skills["perception"].proficient = true;
    }
  }