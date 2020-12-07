import { ScalingTrait } from "Base/Interfaces";
import { PlayerCharacter } from "../../../../Base/PlayerCharacter";
import { LevelingParams } from "../../../PlayerClass";
import * as AncestralGuardianDict from "./AncestralGuardian.json";

export class AncestralGuardian {

    static getFeature(level: string, featureName: string) {
        return AncestralGuardianDict["features"][level][featureName];
    }

    static ancestralGuardian3(pc: PlayerCharacter, params: LevelingParams) {
      pc.pcHelper.addFeatures(AncestralGuardian.getFeature("3", "ANCESTRAL PROTECTORS"));
    }
  
    static ancestralGuardian6(pc: PlayerCharacter, params: LevelingParams) {
      pc.pcHelper.addFeatures(AncestralGuardian.getFeature("6", "SPIRIT SHIELD"));
      const spiritShield: ScalingTrait = {
        title: "Spirit Shield",
        description: "The amount of damage you negate with Spirit Shield",
        dice: "2d6"
      }
      pc.pcHelper.addScalingTraits(spiritShield);
    }
  
    static ancestralGuardian10(pc: PlayerCharacter, params: LevelingParams) {
      pc.pcHelper.addFeatures(AncestralGuardian.getFeature("10", "CONSULT THE SPIRITS"));
      pc.pcHelper.addSpells(["AUGURY","CLAIRVOYANCE"],"wisdom");
      const spiritShield: ScalingTrait = pc.pcHelper.findScalingTraitByName("Spirit Shield");
      spiritShield.dice = "3d6";
    }
  
    static ancestralGuardian14(pc: PlayerCharacter, params: LevelingParams) {
      pc.pcHelper.addFeatures(AncestralGuardian.getFeature("14", "VENGEFUL ANCESTORS"));
      const spiritShield: ScalingTrait = pc.pcHelper.findScalingTraitByName("Spirit Shield");
      spiritShield.dice = "4d6";
    }
}