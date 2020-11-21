import { PlayerCharacter } from "../Base/PlayerCharacter";
import { LevelingParams } from "./PlayerClass";

export abstract class Subclass {

  constructor(subclass: string){
    this.title = subclass;
  }

  title: string;

  subclassDictionary: {
    [key1: string]: {
      [key2: string]: (pc: PlayerCharacter, params: LevelingParams) => void;
    };
  };

  public subclassDriver(pc: PlayerCharacter, level: string, subclass: string, params: LevelingParams){
    if(!this.subclassDictionary[subclass][level]){ return; }
    this.subclassDictionary[subclass][level](pc, params);
  }

}