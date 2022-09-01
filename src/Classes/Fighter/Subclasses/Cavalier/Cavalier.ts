import { ResourceTrait, ScalingTrait, Trait } from "Character/Interfaces";
import { PlayerCharacter } from "../../../../Character/PlayerCharacter";
import { LevelingParams, PlayerClass } from "../../../../Classes/PlayerClass";
import * as CavalierArchetype from "./Cavalier.json"
import * as Languages from "../../../../../Assets/Languages.json";

export class Cavalier {

  static getFeature(level: string, featureName: string) {
    return CavalierArchetype["features"][level][featureName];
  }

  static upMark(pc: PlayerCharacter) {
    pc.pcHelper.findFeatureTraitByName("Unwavering Mark").scaling.bonus++;
  }

  static cavalier3(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(Cavalier.getFeature("3", "BONUS PROFICIENCY"), Cavalier.getFeature("3", "BORN TO THE SADDLE"), Cavalier.getFeature("3", "UNWAVERING MARK"));
    
    const unwaveringMark = {
      resource: { resourceMax: (pc.abilityScores.strength.modifier.value>=1) ? pc.abilityScores.strength.modifier : {value: 1}},
      scaling: {bonus: 1}
    }
    pc.pcHelper.addEffectsToFeature("Unwavering Mark", unwaveringMark)

    params.subclassParams.skillProficiencies.length > 0 ?
    pc.skills[params.subclassParams.skillProficiencies[0]].proficient = true :
    pc.traits.languages.add(Languages[params.subclassParams.languages[0]]);
  }

  static cavalier7(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(Cavalier.getFeature("7", "WARDING MANEUVER"));
    const wardingManeuver = {
      resource: {resourceMax: (pc.abilityScores.constitution.modifier.value>=1) ? pc.abilityScores.constitution.modifier : {value: 1}},
      scaling: {dice: "1d8"}
    }
    pc.pcHelper.addEffectsToFeature("Warding Maneuver", wardingManeuver)
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