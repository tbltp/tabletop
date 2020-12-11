import { Subclass } from "../../Subclass";
import { Ancients } from "./Ancients/Ancients";
import { Devotion } from "./Devotion/Devotion";
import { Vengeance } from "./Vengeance/Vengeance";
import { Conquest } from "./Conquest/Conquest";

export class PaladinSubclass extends Subclass {

  constructor(subclass: string){
    super(subclass);
  }

  subclassDictionary = {
    DEVOTION: {
      "3": Devotion.devotion3,
      "5": Devotion.devotion5,
      "7": Devotion.devotion7,
      "9": Devotion.devotion9,
      "13": Devotion.devotion13,
      "15": Devotion.devotion15,
      "17": Devotion.devotion17,
      "20": Devotion.devotion20,
    },
    ANCIENTS: {
      "3": Ancients.ancients3,
      "5": Ancients.ancients5,
      "7": Ancients.ancients7,
      "9": Ancients.ancients9,
      "13": Ancients.ancients13,
      "15": Ancients.ancients15,
      "17": Ancients.ancients17,
      "20": Ancients.ancients20,
    },
    VENGEANCE: {
      "3": Vengeance.vengeance3,
      "5": Vengeance.vengeance5,
      "7": Vengeance.vengeance7,
      "9": Vengeance.vengeance9,
      "13": Vengeance.vengeance13,
      "15": Vengeance.vengeance15,
      "17": Vengeance.vengeance17,
      "20": Vengeance.vengeance20,
    },
    CONQUEST: {
      "3": Conquest.conquest3,
      "5": Conquest.conquest5,
      "7": Conquest.conquest7,
      "8": Conquest.improveAura,
      "9": Conquest.conquest9,
      "10": Conquest.improveAura,
      "12": Conquest.improveAura,
      "13": Conquest.conquest13,
      "14": Conquest.improveAura,
      "15": Conquest.conquest15,
      "16": Conquest.improveAura,
      "17": Conquest.conquest17,
      "18": Conquest.improveAura,
      "20": Conquest.conquest20,
    }
  };
}