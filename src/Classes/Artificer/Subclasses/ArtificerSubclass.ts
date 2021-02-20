import { Subclass } from "../../Subclass";
import { LevelingParams, SubclassParams } from "Classes/PlayerClass";
import { PlayerCharacter } from "index";

import { Alchemist } from './Alchemist/Alchemist';
import { Armorer } from './Armorer/Armorer';
import { Artillerist } from './Artillerist/Artillerist';
import { BattleSmith } from "./BattleSmith/BattleSmith";

export class ArtificerSubclass extends Subclass {

  constructor(subclassSelection: SubclassParams){
    super(subclassSelection);
  }

  subclassDictionary = {
    ALCHEMIST: {
      "3": Alchemist.alchemist3,
      "5": Alchemist.alchemist5,
      "6": Alchemist.alchemist6,
      "9": Alchemist.alchemist9,
      "13": Alchemist.alchemist13,
      "15": Alchemist.alchemist15,
      "17": Alchemist.alchemist17
    },
    ARMORER: {
      "3": Armorer.armorer3,
      "5": Armorer.armorer5,
      "9": Armorer.armorer9,
      "13": Armorer.armorer13,
      "15": Armorer.armorer15,
      "17": Armorer.armorer17
    },
    ARTILLERIST: {
      "3": Artillerist.artillerist3,
      "5": Artillerist.artillerist5,
      "9": Artillerist.artillerist9,
      "13": Artillerist.artillerist13,
      "15": Artillerist.artillerist15,
      "17": Artillerist.artillerist17
    },
    "BATTLE SMITH": {
      "3": BattleSmith.battleSmith3,
      "5": BattleSmith.battleSmith5,
      "9": BattleSmith.battleSmith9,
      "13": BattleSmith.battleSmith13,
      "15": BattleSmith.battleSmith15,
      "17": BattleSmith.battleSmith17
    }
  };

  subclassDriver(pc: PlayerCharacter, level: string, subclass: string, params: LevelingParams){
    if(!this.subclassDictionary[subclass][level]){ return; }
    if(this.persistentSelection){
    }
    this.subclassDictionary[subclass][level](pc, params);
  }
}