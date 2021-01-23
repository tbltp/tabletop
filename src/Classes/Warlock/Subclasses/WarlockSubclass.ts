import { Subclass } from "../../Subclass";
import { Archfey } from "./Archfey/Archfey";
import { Fiend } from "./Fiend/Fiend";
import { GreatOldOne } from "./GreatOldOne/GreatOldOne";

export class WarlockSubclass extends Subclass {
  constructor(subclassSelection: {subclass: string, options?: string[]}){
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
      };
}