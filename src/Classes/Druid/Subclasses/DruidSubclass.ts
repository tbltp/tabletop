import { Subclass } from "../../Subclass";
import { LandCircle } from "./Land/LandCircle"
import { MoonCircle } from "./Moon/MoonCircle"

export class DruidSubclass extends Subclass {
    static subclassDictionary = {
        LAND: {
          "2": LandCircle.land2,
          "3": LandCircle.land3,
          "6": LandCircle.land6,
          "10": LandCircle.land10,
          "14": LandCircle.land14
        },
        MOON: {
          "2": MoonCircle.moon2,
          "6": MoonCircle.moon6,
          "10": MoonCircle.moon10,
          "14": MoonCircle.moon14
        },
      };

    static subclassSpells = {
      LAND: LandCircle.getTerrainSpells
    }
}