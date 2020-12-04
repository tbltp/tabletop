import { PlayerCharacter } from "../../../Base/PlayerCharacter";
import { LevelingParams } from "../../../Classes/PlayerClass";
import { Subclass } from "../../Subclass";
import { LandCircle } from "./Land/LandCircle"
import { MoonCircle } from "./Moon/MoonCircle"
import { SporesCircle } from "./Spores/SporesCircle"

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
    SPORES: {
      "2": SporesCircle.spores2,
      "3": SporesCircle.spores3,
      "5": SporesCircle.spores5,
      "6": SporesCircle.spores6,
      "7": SporesCircle.spores7,
      "8": SporesCircle.spores8,
      "9": SporesCircle.spores9,
      "10": SporesCircle.spores10,
      "14": SporesCircle.spores14
    },
    MOON: {
      "2": MoonCircle.moon2,
      "6": MoonCircle.moon6,
      "9": MoonCircle.moon9,
      "10": MoonCircle.moon10,
      "12": MoonCircle.moon12,
      "14": MoonCircle.moon14,
      "15": MoonCircle.moon15,
      "18": MoonCircle.moon18,
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