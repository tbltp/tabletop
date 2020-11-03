import { PlayerCharacter } from "../Base/PlayerCharacter";
import { LevelingParams } from "./PlayerClass";
import * as Archetypes from "../../Assets/Archetypes.json";

export abstract class Archetype {
  static archetypeHelper: {
    [key1: string]: {
      [key2: string]: (pc: PlayerCharacter, params: LevelingParams) => void;
    };
  } = {};

  static getFeature(
    className: string,
    archetypeName: string,
    level: string,
    featureName: string
  ) {
    return Archetypes[className][archetypeName]["features"][level][featureName];
  }
}