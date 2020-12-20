import { Subclass } from "../../Subclass";
import { OpenHand } from "./OpenHand/OpenHand";
import { Shadow } from "./Shadow/Shadow";
import { FourElements } from "./FourElements/FourElements";
import { Kensei } from "./Kensei/Kensei";

export class MonkSubclass extends Subclass {
  constructor(subclass: string){
    super(subclass);
  }
  
  subclassDictionary = {
    "OPEN HAND": {
      "3": OpenHand.openHand3,
      "6": OpenHand.openHand6,
      "11": OpenHand.openHand11,
      "17": OpenHand.openHand17
    },
    SHADOW: {
      "3": Shadow.shadow3,
      "6": Shadow.shadow6,
      "11": Shadow.shadow11,
      "17": Shadow.shadow17
    },
    KENSEI : {
      "3": Kensei.kensei3,
      "6": Kensei.kensei6,
      "11": Kensei.kensei11,
      "17": Kensei.kensei17
    },
    "FOUR ELEMENTS": {
      "3": FourElements.fourElements3,
      "5": FourElements.fourElements5,
      "6": FourElements.fourElements6,
      "9": FourElements.fourElements9,
      "11": FourElements.fourElements11,
      "13": FourElements.fourElements13,
      "17": FourElements.fourElements17
    }
  }
}