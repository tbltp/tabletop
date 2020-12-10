import { ResourceTrait, Trait } from "Base/Interfaces";
import { PlayerCharacter } from "../../../../Base/PlayerCharacter";
import { LevelingParams, PlayerClass } from "../../../../Classes/PlayerClass";
import * as SamuraiArchetype from "./Samurai.json"
import * as Languages from "../../../../../Assets/Languages.json";

export class Samurai {

  static getFeature(level: string, featureName: string) {
    return SamuraiArchetype["features"][level][featureName];
  }

  static upSpirit(pc: PlayerCharacter) {
    const fightingSpirit: ResourceTrait = pc.pcHelper.findResourceTraitByName("Fighting Spirit");
    fightingSpirit.bonus+=5;
  }
  static samurai3(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(Samurai.getFeature("3", "BONUS PROFICIENCY"));
    pc.skills[params.proficiencySelection[0]].proficient = true;
    pc.traits.languages.push(Languages[params.subclassSelection.options[0]]);
    pc.pcHelper.addFeatures(Samurai.getFeature("3", "FIGHTING SPIRIT"));
    const fightingSpirit: ResourceTrait = {
      title: "Fighting Spirit",
      description: "Maximum number of times you may use Fighting Spirit, and how many temporary hit points you receive.",
      bonus: 5,
      resourceMax: {value: 3}
    }
    pc.pcHelper.addResourceTraits(fightingSpirit);
  }

  static samurai7(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(Samurai.getFeature("7", "ELEGANT COURTIER"));
    pc.abilityScores[params.proficiencySelection[0]].savingThrowProficiency = true;
  }

  static samurai10(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(Samurai.getFeature("10", "TIRELESS SPIRIT"));
    Samurai.upSpirit(pc);
  }

  static samurai15(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(Samurai.getFeature("15", "RAPID STRIKE"));
    Samurai.upSpirit(pc);
  }

  static samurai18(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(Samurai.getFeature("18", "STRENGTH BEFORE DEATH"));
  }
}