import { Subclass } from "../../Subclass";
import { OpenHand } from "./OpenHand/OpenHand"
import { Shadow } from "./Shadow/Shadow"
import { FourElements } from "./FourElements/FourElements"

export class MonkSubclass extends Subclass {

    static subclassDictionary = {
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
          "6": FourElements.fourElements6,
          "11": FourElements.fourElements11,
          "17": FourElements.fourElements17
        }
    }
}