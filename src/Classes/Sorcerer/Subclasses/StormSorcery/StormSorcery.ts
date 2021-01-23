import { PlayerCharacter } from "../../../../Base/PlayerCharacter";
import { LevelingParams } from "../../../../Classes/PlayerClass";
import * as StormSorceryArchetypeDict from "./StormSorcery.json"
import * as Languages from "../../../../../Assets/Languages.json";
import { ScalingTrait } from "../../../../Base/Interfaces";

export class StormSorcery {
  
  static getFeature(level: string, featureName: string) {
    return StormSorceryArchetypeDict["features"][level][featureName];
  }

  static upHeart(pc: PlayerCharacter) {
    const heartDmg: ScalingTrait = pc.pcHelper.findScalingTraitByName("Heart of the Storm");
    heartDmg.bonus++;
  }

  static upFury(pc: PlayerCharacter) {
    const furyDmg: ScalingTrait = pc.pcHelper.findScalingTraitByName("Storm's Fury");
    furyDmg.bonus++;
  }

  static upBoth(pc: PlayerCharacter) {
    StormSorcery.upHeart(pc);
    StormSorcery.upFury(pc);
  }

  static stormSorcery1(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(StormSorcery.getFeature("1", "WIND SPEAKER"), 
    StormSorcery.getFeature("1", "TEMPESTUOUS MAGIC"));
    pc.traits.languages.push(Languages["Primordial"]);
  }

  static stormSorcery6(pc: PlayerCharacter, params: LevelingParams) {      
    pc.pcHelper.addFeatures(StormSorcery.getFeature("6", "STORM GUIDE"));
    pc.pcHelper.addFeatures(StormSorcery.getFeature("6", "HEART OF THE STORM"));
    const heartDmg: ScalingTrait = {
      title: "Heart of the Storm",
      description: "The damage you deal with Heart of the Storm",
      bonus: 3
    }
    pc.pcHelper.addScalingTraits(heartDmg);
  }

  static stormSorcery14(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(StormSorcery.getFeature("14", "STORM'S FURY"));
    const furyDmg: ScalingTrait = {
      title: "Storm's Fury",
      description: "The damage you deal with Storm's Fury",
      bonus: 14
    }
    pc.pcHelper.addScalingTraits(furyDmg);
    StormSorcery.upHeart(pc);
  }

  static stormSorcery18(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(StormSorcery.getFeature("18", "WIND SOUL"));
    StormSorcery.upBoth(pc);
  }
}