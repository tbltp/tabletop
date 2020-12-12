import { Subclass } from "../../Subclass";
import { BeastMaster } from "./BeastMaster/BeastMaster";
import { Hunter } from "./Hunter/Hunter";
import { HorizonWalker } from "./HorizonWalker/HorizonWalker"

export class RangerSubclass extends Subclass {

  constructor(subclass: string){
    super(subclass);
  }

  subclassDictionary = {
    HUNTER: {
      "3": Hunter.hunter3,
      "7": Hunter.hunter7,
      "11": Hunter.hunter11,
      "15": Hunter.hunter15,
    },
    "BEAST MASTER": {
      "3": BeastMaster.beastMaster3,
      "7": BeastMaster.beastMaster7,
      "11": BeastMaster.beastMaster11,
      "15": BeastMaster.beastMaster15,
    },
    "HORIZON WALKER": {
      "3": HorizonWalker.horizonWalker3,
      "5": HorizonWalker.horizonWalker5,
      "7": HorizonWalker.horizonWalker7,
      "9": HorizonWalker.horizonWalker9,
      "11": HorizonWalker.horizonWalker11,
      "13": HorizonWalker.horizonWalker13,
      "15": HorizonWalker.horizonWalker15,
      "17": HorizonWalker.horizonWalker17
    }
  };
}