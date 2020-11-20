import { Elf } from "../Elf";
import { PlayerCharacter } from "../../../Base/PlayerCharacter";
import * as traits from "../Elf.json";
import * as languages from "../../../../Assets/Languages.json";
import * as Spells from "../../../../Assets/Spells.json";
import { ISpell, Spell } from "../../../Base/Interfaces";


export class DarkElf extends Elf {
    constructor(language: string) {
      super("Dark Elf");
      this.traits.push(
        traits["SUPERIOR DARKVISION"],
        traits["SUNLIGHT SENSITIVITY"],
        traits["DROW MAGIC"]
      );
      this.languages.push(languages[language]);
      this.weaponProficiencies.push("Rapier", "Shortsword", "Crossbow, hand");
    }
  
    abilitiesAtLevels = {
      "1": this.level1,
      "3": this.level3,
      "5": this.level5,
    };
  
    level1(pc: PlayerCharacter) {
      const ispell: ISpell = Spells["DANCING LIGHTS"];
      const spell: Spell = { ...ispell, spellcastingAbility: "charisma" };
      pc.spells["0"].push(spell);
    }
  
    level3(pc: PlayerCharacter) {
      const ispell: ISpell = Spells["FAERIE FIRE"];
      const spell: Spell = { ...ispell, spellcastingAbility: "charisma" };
      pc.spells["1"].push(spell);
    }
  
    level5(pc: PlayerCharacter) {
      const ispell: ISpell = Spells["DARKNESS"];
      const spell: Spell = { ...ispell, spellcastingAbility: "charisma" };
      pc.spells["2"].push(spell);
    }
  
    abilityIncrease(pc: PlayerCharacter): void {
      pc.abilityScores.dexterity.update(2);
      pc.abilityScores.charisma.update(1);
    }
  
    proficiencies(pc: PlayerCharacter): void {
      pc.skills["perception"].proficient = true;
    }
  }
  