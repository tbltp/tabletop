import { PlayerCharacter } from "../Character/PlayerCharacter";
import { LevelingParams } from "./PlayerClass";

export abstract class Subclass {

  constructor(subclassSelection: SubclassParams){
    this.name = subclassSelection.name;
  }

  name: string;
  persistentSelection?: SubclassParams;

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

export interface SubclassParams {
  name: string;
  spellSelections?: {
    add: string[];
    remove?: string;
  };
  skillProficiencies?: string[],
  weapons?: string[];
  toolProficiencies?: string[];
  fightingStyles?: string[];
  languages?: string[];
  savingThrows?: string[];
}