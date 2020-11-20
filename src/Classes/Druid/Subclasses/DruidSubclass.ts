import { PlayerCharacter } from "Base/PlayerCharacter";
import { LevelingParams } from "Classes/PlayerClass";
import { Subclass } from "../../Subclass";
import { LandCircle } from "./Land/LandCircle"
import { MoonCircle } from "./Moon/MoonCircle"

export class DruidSubclass extends Subclass {
  constructor(subclass: string, terrain?: string){
    super(subclass);
    terrain ? this.terrain = terrain : null;
  }

  terrain?: string;

  subclassDictionary = {
    LAND: {
      "2": LandCircle.land2,
      "3": LandCircle.land3,
      "5": LandCircle.land5,
      "6": LandCircle.land6,
      "7": LandCircle.land7,
      "8": LandCircle.land8,
      "9": LandCircle.land9,
      "10": LandCircle.land10,
      "14": LandCircle.land14
    },
    MOON: {
      "2": MoonCircle.moon2,
      "6": MoonCircle.moon6,
      "10": MoonCircle.moon10,
      "14": MoonCircle.moon14
    },
  };

  subclassDriver(pc: PlayerCharacter, level: string, subclass: string, params: LevelingParams){
    if(!this.subclassDictionary[subclass][level]){ return; }

    if(subclass === "LAND"){
      params.subclassSelection.options.push(this.terrain);
    }

    this.subclassDictionary[subclass][level](pc, params);

  }


}