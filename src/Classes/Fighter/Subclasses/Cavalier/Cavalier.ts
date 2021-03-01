import { ResourceTrait, ScalingTrait, Trait } from "Base/Interfaces";
import { PlayerCharacter } from "../../../../Base/PlayerCharacter";
import { LevelingParams, PlayerClass } from "../../../../Classes/PlayerClass";
import * as CavalierArchetype from "./Cavalier.json"
import * as Languages from "../../../../../Assets/Languages.json";

export class Cavalier {

  static getFeature(level: string, featureName: string) {
    return CavalierArchetype["features"][level][featureName];
  }

  static upMark(pc: PlayerCharacter) {
    const unwaveringMark: ScalingTrait = pc.pcHelper.findScalingTraitByName("Unwavering Mark");
    unwaveringMark.bonus+=1;
  }

  static cavalier3(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(Cavalier.getFeature("3", "BONUS PROFICIENCY"));
    params.subclassParams.skillProficiencies.length > 0 ?
    pc.skills[params.subclassParams.skillProficiencies[0]].proficient = true :
    pc.traits.languages.push(Languages[params.subclassParams.languages[0]]);
    pc.pcHelper.addFeatures(Cavalier.getFeature("3", "BORN TO THE SADDLE"));
    pc.pcHelper.addFeatures(Cavalier.getFeature("3", "UNWAVERING MARK"));
    const unwaveringMark: ResourceTrait = {
      title: "Unwavering Mark",
      description: "Number of times you may use Unwavering Mark",
      resourceMax: (pc.abilityScores.strength.modifier.value>=1) ? pc.abilityScores.strength.modifier : {value: 1}
    }
    const unwaveringDmg: ScalingTrait = {
      title: "Unwavering Mark",
      description: "Damage bonus for Unwavering Mark",
      bonus: 1
    }
    pc.pcHelper.addScalingTraits(unwaveringDmg);
    pc.pcHelper.addResourceTraits(unwaveringMark);
  }

  static cavalier7(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(Cavalier.getFeature("7", "WARDING MANEUVER"));
    const wardingManeuver: ResourceTrait = {
      title: "Warding Maneuver",
      description: "Number of times you may use Warding Maneuver",
      dice: "1d8",
      resourceMax: (pc.abilityScores.constitution.modifier.value>=1) ? pc.abilityScores.constitution.modifier : {value: 1}
    }
    pc.pcHelper.addResourceTraits(wardingManeuver);
  }

  static cavalier10(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(Cavalier.getFeature("10", "HOLD THE LINE"));
    PlayerClass.addFightingStyle(pc, params.subclassParams.fightingStyles[0]);  // move add fighting style to PC 

  }

  static cavalier15(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(Cavalier.getFeature("15", "FEROCIOUS CHARGER"));
  }

  static cavalier18(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(Cavalier.getFeature("18", "VIGILANT DEFENDER"));
    Cavalier.upMark(pc);
  }
}