import { Subclass, SubclassParams } from "../../Subclass";
import { Archfey } from "./Archfey/Archfey";
import { Fiend } from "./Fiend/Fiend";
import { GreatOldOne } from "./GreatOldOne/GreatOldOne";
import { Fathomless } from "./Fathomless/Fathomless";

export class WarlockSubclass extends Subclass {
  constructor(subclassSelection: SubclassParams){
    super(subclassSelection);
  }

  subclassDictionary = {
        ARCHFEY: {
          "1": Archfey.archfey1,
          "6": Archfey.archfey6,
          "10": Archfey.archfey10,
          "14": Archfey.archfey14,
        },
        FIEND: {
          "1": Fiend.fiend1,
          "6": Fiend.fiend6,
          "10": Fiend.fiend10,
          "14": Fiend.fiend14,
        },
        "GREAT OLD ONE": {
          "1": GreatOldOne.greatOldOne1,
          "6": GreatOldOne.greatOldOne6,
          "10": GreatOldOne.greatOldOne10,
          "14": GreatOldOne.greatOldOne14,
        },
        FATHOMLESS: {
          "1": Fathomless.fathomless1,
          "6": Fathomless.fathomless6,
          "10": Fathomless.fathomless10,
          "14": Fathomless.fathomless14,
        },
      };
}