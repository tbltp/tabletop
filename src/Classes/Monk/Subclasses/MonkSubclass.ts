import { Subclass } from "../../Subclass";
import { OpenHand } from "./OpenHand/OpenHand"
import { Shadow } from "./Shadow/Shadow"
import { FourElements } from "./FourElements/FourElements"
import { DrunkenMaster} from "./DrunkenMaster/DrunkenMaster"

export class MonkSubclass extends Subclass {
  constructor(subclassSelection: {subclass: string, options?: string[]}){
    super(subclassSelection);
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
    "FOUR ELEMENTS": {
      "3": FourElements.fourElements3,
      "5": FourElements.fourElements5,
      "6": FourElements.fourElements6,
      "9": FourElements.fourElements9,
      "11": FourElements.fourElements11,
      "13": FourElements.fourElements13,
      "17": FourElements.fourElements17
    },
    "DRUNKEN MASTER": {
      "3": DrunkenMaster.drunkenMaster3,
      "6": DrunkenMaster.drunkenMaster6,
      "11": DrunkenMaster.drunkenMaster11,
      "17": DrunkenMaster.drunkenMaster17
    }
  }
}