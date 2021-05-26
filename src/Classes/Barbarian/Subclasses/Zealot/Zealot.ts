import { ScalingTrait } from "Base/Interfaces";
import { PlayerCharacter } from "../../../../Base/PlayerCharacter";
import { LevelingParams, PlayerClass } from "../../../PlayerClass";
import * as ZealotDict from "./Zealot.json";

export class Zealot {

  static getFeature(level: string, featureName: string) {
      return ZealotDict["features"][level][featureName];
  }

  static upFury(pc: PlayerCharacter) {
    pc.pcHelper.findFeatureTraitByName("Divine Fury").scaling.bonus++;
  }

  static zealot3(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(Zealot.getFeature("3", "DIVINE FURY"));
    pc.pcHelper.addEffectsToClassFeature("Divine Fury", {scaling: {dice: "1d6", bonus: 1}});
    pc.pcHelper.addFeatures(Zealot.getFeature("3", "WARRIOR OF THE GODS"));
  }

  static zealot6(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(Zealot.getFeature("6", "FANATICAL FOCUS"));
    Zealot.upFury(pc);
  }

  static zealot10(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(Zealot.getFeature("10", "ZEALOUS PRESENCE"));
    Zealot.upFury(pc);
  }
  
  static zealot14(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(Zealot.getFeature("14", "RAGE BEYOND DEATH"));
    Zealot.upFury(pc);
  }
}