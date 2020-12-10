import { ScalingTrait } from "Base/Interfaces";
import { PlayerCharacter } from "../../../../Base/PlayerCharacter";
import { LevelingParams } from "../../../PlayerClass";
import * as StormHeraldDict from "./StormHerald.json";

export class StormHerald {

  static getFeature(level: string, featureName: string) {
      return StormHeraldDict["features"][level][featureName];
  }

  static stormHerald3(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(StormHerald.getFeature("3", "STORM AURA"));
    const stormScale: ScalingTrait = {
      title: "Storm Aura",
      description: "How powerful your Storm Aura is",
      dice: "1d6",
      bonus: 2
    }
    pc.pcHelper.addScalingTraits(stormScale);
  }
  static stormHerald5(pc: PlayerCharacter, params: LevelingParams) {
    const stormScale: ScalingTrait = pc.pcHelper.findScalingTraitByName("Storm Aura");
    stormScale.bonus+=1;
  }
  static stormHerald6(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(StormHerald.getFeature("6", "STORM SOUL"));
  }

  static stormHerald10(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(StormHerald.getFeature("10", "SHIELDING STORM"));
    const stormScale: ScalingTrait = pc.pcHelper.findScalingTraitByName("Storm Aura");
    stormScale.bonus+=1;
    stormScale.dice = "2d6";
  }

  static stormHerald14(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(StormHerald.getFeature("14", "RAGING STORM"));
  }

  static stormHerald15(pc: PlayerCharacter, params: LevelingParams) {
    const stormScale: ScalingTrait = pc.pcHelper.findScalingTraitByName("Storm Aura");
    stormScale.bonus+=1;
    stormScale.dice = "3d6";
  }

  static stormHerald20(pc: PlayerCharacter, parmas: LevelingParams) {
    const stormScale: ScalingTrait = pc.pcHelper.findScalingTraitByName("Storm Aura");
    stormScale.bonus+=1;
    stormScale.dice = "4d6";
  }
}