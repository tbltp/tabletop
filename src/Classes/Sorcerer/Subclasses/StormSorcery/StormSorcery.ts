import { PlayerCharacter } from "../../../../Character/PlayerCharacter";
import { LevelingParams, PlayerClass } from "../../../../Classes/PlayerClass";
import * as StormSorceryArchetypeDict from "./StormSorcery.json"
import * as Languages from "../../../../../Assets/Languages.json";
import { ScalingTrait } from "../../../../Character/Interfaces";

export class StormSorcery {
  
  static getFeature(level: string, featureName: string) {
    return StormSorceryArchetypeDict["features"][level][featureName];
  }

  static upHeart(pc: PlayerCharacter) {
    pc.pcHelper.findFeatureTraitByName("Heart of the Storm").scaling.bonus++;
  }

  static upFury(pc: PlayerCharacter) {
    pc.pcHelper.findFeatureTraitByName("Storm's Fury").scaling.bonus++;
  }

  static upBoth(pc: PlayerCharacter) {
    StormSorcery.upHeart(pc);
    StormSorcery.upFury(pc);
  }

  static stormSorcery1(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(
      StormSorcery.getFeature("1", "WIND SPEAKER"), 
      StormSorcery.getFeature("1", "TEMPESTUOUS MAGIC")
    );
    pc.traits.languages.add(Languages["Primordial"]);
  }

  static stormSorcery6(pc: PlayerCharacter, params: LevelingParams) {      
    pc.pcHelper.addFeatures(StormSorcery.getFeature("6", "STORM GUIDE"), StormSorcery.getFeature("6", "HEART OF THE STORM"));
    pc.pcHelper.addEffectsToFeature("Heart of the Storm", {scaling: {bonus: 3}})
  }

  static stormSorcery14(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(StormSorcery.getFeature("14", "STORM'S FURY"));
    pc.pcHelper.addEffectsToFeature("Storm's Fury", {scaling: {bonus: 14}})
    StormSorcery.upHeart(pc);
  }

  static stormSorcery18(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(StormSorcery.getFeature("18", "WIND SOUL"));
    StormSorcery.upBoth(pc);
  }
}