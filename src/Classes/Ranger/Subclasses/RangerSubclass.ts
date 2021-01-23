import { Subclass } from "../../Subclass";
import { BeastMaster } from "./BeastMaster/BeastMaster";
import { Hunter } from "./Hunter/Hunter";
import { GloomStalker } from "./GloomStalker/GloomStalker";

export class RangerSubclass extends Subclass {

  constructor(subclassSelection: {subclass: string, options?: string[]}){
    super(subclassSelection);
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
    "GLOOM STALKER": {
      "3": GloomStalker.gloomStalker3,
      "5": GloomStalker.gloomStalker5,
      "7": GloomStalker.gloomStalker7,
      "9": GloomStalker.gloomStalker9,
      "11": GloomStalker.gloomStalker11,
      "15": GloomStalker.gloomStalker15,
      "17": GloomStalker.gloomStalker17
    }
  };
}