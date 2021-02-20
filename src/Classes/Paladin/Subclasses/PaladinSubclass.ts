import { Subclass, SubclassParams } from "../../Subclass";
import { Ancients } from "./Ancients/Ancients";
import { Devotion } from "./Devotion/Devotion";
import { Vengeance } from "./Vengeance/Vengeance";
import { Redemption } from "./Redemption/Redemption";

export class PaladinSubclass extends Subclass {

  constructor(subclassSelection: SubclassParams){
    super(subclassSelection);
  }

  subclassDictionary = {
    DEVOTION: {
      "3": Devotion.devotion3,
      "7": Devotion.devotion7,
      "15": Devotion.devotion15,
      "20": Devotion.devotion20,
    },
    REDEMPTION: {
      "3": Redemption.redemption3,
      "5": Redemption.redemption5,
      "7": Redemption.redemption7,
      "9": Redemption.redemption9,
      "13": Redemption.redemption13,
      "15": Redemption.redemption15,
      "16": Redemption.upSpirit,
      "17": Redemption.redemption17,
      "18": Redemption.upSpirit,
      "20": Redemption.redemption20
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