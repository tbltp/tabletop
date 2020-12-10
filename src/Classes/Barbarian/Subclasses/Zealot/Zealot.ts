import { ScalingTrait } from "Base/Interfaces";
import { PlayerCharacter } from "../../../../Base/PlayerCharacter";
import { LevelingParams } from "../../../PlayerClass";
import * as ZealotDict from "./Zealot.json";

export class Zealot {

  static getFeature(level: string, featureName: string) {
      return ZealotDict["features"][level][featureName];
  }

  static upFury(pc: PlayerCharacter) {
    const furyDamage: ScalingTrait = pc.pcHelper.findScalingTraitByName("Divine Fury");
    furyDamage.bonus+=1;
  }

  static zealot3(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(Zealot.getFeature("3", "DIVINE FURY"));
    const furyDamage: ScalingTrait = {
      title: "Divine Fury",
      description: "Bonus damage from Divine Fury",
      dice: "1d6",
      bonus: 1
    }
    pc.pcHelper.addScalingTraits(furyDamage);
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