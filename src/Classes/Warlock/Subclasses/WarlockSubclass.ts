import { Subclass } from "../../Subclass";
import { Archfey } from "./Archfey/Archfey";
import { Fiend } from "./Fiend/Fiend";
import { GreatOldOne } from "./GreatOldOne/GreatOldOne";
import { Hexblade } from "./Hexblade/Hexblade";

export class WarlockSubclass extends Subclass {
  constructor(subclass: string){
    super(subclass);
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
    "HEXBLADE": {
      "1": Hexblade.hexblade1,
      "2": Hexblade.upCurse,
      "3": Hexblade.upCurse,
      "4": Hexblade.upCurse,
      "5": Hexblade.upCurse,
      "6": Hexblade.hexblade6,
      "7": Hexblade.upCurse,
      "8": Hexblade.upSpecter,
      "9": Hexblade.upCurse,
      "10": Hexblade.hexblade10,
      "11": Hexblade.upCurse,
      "12": Hexblade.upSpecter,
      "13": Hexblade.upCurse,
      "14": Hexblade.hexblade14,
      "15": Hexblade.upCurse,
      "16": Hexblade.upSpecter,
      "17": Hexblade.upCurse,
      "18": Hexblade.upSpecter,
      "19": Hexblade.upCurse,
      "20": Hexblade.upSpecter,
    }
  };
}