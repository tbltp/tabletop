import { Subclass } from "../../Subclass";
import { Archfey } from "./Archfey/Archfey";
import { Fiend } from "./Fiend/Fiend";
import { GreatOldOne } from "./GreatOldOne/GreatOldOne";
import { Celestial } from "./Celestial/Celestial";

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
        CELESTIAL: { 
          "1": Celestial.celestial1,
          "2": Celestial.upScale,
          "3": Celestial.celestial3,
          "4": Celestial.upScale,
          "5": Celestial.celestial5,
          "6": Celestial.celestial6,
          "7": Celestial.celestial7,
          "8": Celestial.upScale,
          "9": Celestial.celestial9,
          "10": Celestial.celestial10,
          "11": Celestial.upBoth,
          "12": Celestial.upBoth,
          "13": Celestial.upBoth,
          "14": Celestial.celestial14,
          "15": Celestial.upBoth,
          "16": Celestial.upBoth,
          "17": Celestial.upBoth,
          "18": Celestial.upBoth,
          "19": Celestial.upBoth,
          "20": Celestial.upBoth,
        }
      };
}