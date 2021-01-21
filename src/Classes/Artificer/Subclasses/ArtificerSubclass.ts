import { Subclass } from "../../Subclass";
import { LevelingParams } from "Classes/PlayerClass";
import { PlayerCharacter } from "index";

export class ArtificerSubclass extends Subclass {

  constructor(subclassSelection: {subclass: string, options?: string[]}){
    super(subclassSelection);
  }

  subclassDictionary = {
  };

  subclassDriver(pc: PlayerCharacter, level: string, subclass: string, params: LevelingParams){
    if(!this.subclassDictionary[subclass][level]){ return; }
    if(this.persistentSelection){
    }
    this.subclassDictionary[subclass][level](pc, params);
  }
}