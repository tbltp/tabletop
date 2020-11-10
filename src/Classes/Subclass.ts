import { PlayerCharacter } from "../Base/PlayerCharacter";
import { LevelingParams } from "./PlayerClass";

export abstract class Subclass {
  static subclassDictionary: {
    [key1: string]: {
      [key2: string]: (pc: PlayerCharacter, params: LevelingParams) => void;
    };
  } = {};
}