import { PlayerCharacter } from "../../../Base/PlayerCharacter";
import { LevelingParams } from "../../../Classes/PlayerClass";
import { Subclass } from "../../Subclass";
import { LandCircle } from "./Land/LandCircle"
import { MoonCircle } from "./Moon/MoonCircle"
import { SporesCircle } from "./Spores/SporesCircle"
import { DreamsCircle } from "./Dreams/DreamsCircle"

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
      "4": LandCircle.land4,
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
      "4": SporesCircle.spores4,
      "5": SporesCircle.spores5,
      "6": SporesCircle.spores6,
      "7": SporesCircle.spores7,
      "8": SporesCircle.spores8,
      "9": SporesCircle.spores9,
      "10": SporesCircle.spores10,
      "11": SporesCircle.upSymbioticEntity,
      "12": SporesCircle.upSymbioticEntity,
      "13": SporesCircle.upSymbioticEntity,
      "14": SporesCircle.spores14,
      "15": SporesCircle.upSymbioticEntity,
      "16": SporesCircle.upSymbioticEntity,
      "17": SporesCircle.upSymbioticEntity,
      "18": SporesCircle.upSymbioticEntity,
      "19": SporesCircle.upSymbioticEntity,
      "20": SporesCircle.upSymbioticEntity,
    },
    MOON: {
      "2": MoonCircle.moon2,
      "6": MoonCircle.moon6,
      "9": MoonCircle.upWildShape,
      "10": MoonCircle.moon10,
      "12": MoonCircle.upWildShape,
      "14": MoonCircle.moon14,
      "15": MoonCircle.upWildShape,
      "18": MoonCircle.upWildShape,
    },
    DREAMS: {
      "2": DreamsCircle.dreams2,
      "3": DreamsCircle.upBalm,
      "4": DreamsCircle.dreams4,
      "5": DreamsCircle.upBalm,
      "6": DreamsCircle.dreams6,
      "7": DreamsCircle.upBalm,
      "8": DreamsCircle.dreams8,
      "9": DreamsCircle.upBalm,
      "10": DreamsCircle.dreams10,
      "11": DreamsCircle.upBalm,
      "12": DreamsCircle.upBalm,
      "13": DreamsCircle.upBalm,
      "14": DreamsCircle.dreams14,
      "15": DreamsCircle.upBalm,
      "16": DreamsCircle.upBalm,
      "17": DreamsCircle.upBalm,
      "18": DreamsCircle.upBalm,
      "19": DreamsCircle.upBalm,
      "20": DreamsCircle.upBalm,
    }
  };

  subclassDriver(pc: PlayerCharacter, level: string, subclass: string, params: LevelingParams){
    if(!this.subclassDictionary[subclass][level]){ return; }
    if(this.terrain){
      params.subclassSelection = {subclass: "LAND", options: [this.terrain]};
    }
    this.subclassDictionary[subclass][level](pc, params);
  }
}