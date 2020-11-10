import { Subclass } from "../../Subclass";
import { BeastMaster } from "./BeastMaster/BeastMaster";
import { Hunter } from "./Hunter/Hunter";

export class RangerSubclass extends Subclass {
    static subclassDictionary = {
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
      };
}