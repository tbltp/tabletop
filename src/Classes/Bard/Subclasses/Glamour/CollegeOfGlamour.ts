import { PlayerCharacter } from "../../../../Base/PlayerCharacter";
import { LevelingParams } from "../../../PlayerClass";
import * as CollegeOfGlamourDict from "./CollegeOfGlamour.json";
import { ScalingTrait, Trait } from "../../../../Base/Interfaces";

export class CollegeOfGlamour {
    
  static getFeature(level: string, featureName: string) {
      return CollegeOfGlamourDict["features"][level][featureName];
  }

  static upMantle(pc: PlayerCharacter) {
    const mantleHP = pc.pcHelper.findScalingTraitByName("Mantle of Inspiration");
    mantleHP.bonus+=3;
  }
  static glamour3(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(CollegeOfGlamour.getFeature("3", "MANTLE OF INSPIRATION"));
    const mantleHP: ScalingTrait = {
      title: "Mantle of Inspiration",
      description: "Temporary HP granted from Mantle of Inspiration",
      bonus: 5
    }
    pc.pcHelper.addScalingTraits(mantleHP);
    pc.pcHelper.addFeatures(CollegeOfGlamour.getFeature("3", "ENTHRALLING PERFORMANCE"));
  }

  static glamour6(pc: PlayerCharacter, params: LevelingParams) {
    CollegeOfGlamour.getFeature("6", "MANTLE OF MAJESTY");
    pc.pcHelper.addSpells(["COMMAND"], "charisma");
  }

  static glamour14(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(CollegeOfGlamour.getFeature("14", "UNBREAKABLE MAJESTY"));
  }  
}