import { ResourceTrait } from "../../../../Base/Interfaces";
import { PlayerCharacter } from "../../../../Base/PlayerCharacter";
import { LevelingParams } from "../../../../Classes/PlayerClass";
import * as InquisitiveArchetypeDict from "./Inquisitive.json"

export class Inquisitive {

  static getFeature(level: string, featureName: string) {
    return InquisitiveArchetypeDict["features"][level][featureName];
  }

  static inquisitive3(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(Inquisitive.getFeature("3", "EAR FOR DECEIT"), 
    Inquisitive.getFeature("3", "EYE FOR DETAIL"),
    Inquisitive.getFeature("3","INSIGHTFUL FIGHTING"));
  }

  static inquisitive9(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(Inquisitive.getFeature("9", "STEADY EYE"));
  }

  static inquisitive13(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(Inquisitive.getFeature("13", "UNERRING EYE"));
    const unerringEye: ResourceTrait = {
      title: "Unerring Eye",
      description: "Number of times you may use Unerring Eye",
      resourceMax: (pc.abilityScores.wisdom.modifier.value>=1) ? pc.abilityScores.wisdom.modifier : {value: 1}
    }
    pc.pcHelper.addScalingTraits(unerringEye);
  }

  static inquisitive17(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(Inquisitive.getFeature("17", "EYE FOR WEAKNESS"));
  }
}