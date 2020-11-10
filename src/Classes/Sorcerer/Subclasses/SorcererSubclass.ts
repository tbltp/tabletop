import { Subclass } from "../../Subclass";
import { DraconicAncestry } from "./DraconicAncestry/DraconicAncestry";
import { WildMagic } from "./WildMagic/WildMagic";

export class SorcererSubclass extends Subclass {
    static subclassDictionary = {
        "DRACONIC ANCESTRY": {
          "1": DraconicAncestry.draconicAncestry1,
          "6": DraconicAncestry.draconicAncestry6,
          "14": DraconicAncestry.draconicAncestry14,
          "18": DraconicAncestry.draconicAncestry18,
        },
        "WILD MAGIC": {
          "1": WildMagic.wildMagic1,
          "6": WildMagic.wildMagic6,
          "14": WildMagic.wildMagic14,
          "18": WildMagic.wildMagic18,
        },
      };
}