import { Subclass } from "../../Subclass";
import { Ancients } from "./Ancients/Ancients";
import { Devotion } from "./Devotion/Devotion";
import { Vengeance } from "./Vengeance/Vengeance";

export class PaladinSubclass extends Subclass {
    static subclassDictionary = {
        DEVOTION: {
          "3": Devotion.devotion3,
          "7": Devotion.devotion7,
          "15": Devotion.devotion15,
          "20": Devotion.devotion20,
        },
        ANCIENTS: {
          "3": Ancients.ancients3,
          "7": Ancients.ancients7,
          "15": Ancients.ancients15,
          "20": Ancients.ancients20,
        },
        VENGEANCE: {
          "3": Vengeance.vengeance3,
          "7": Vengeance.vengeance7,
          "15": Vengeance.vengeance15,
          "20": Vengeance.vengeance20,
        },
      };
}