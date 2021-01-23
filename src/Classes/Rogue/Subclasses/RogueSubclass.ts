import { Subclass } from "../../Subclass";
import { ArcaneTrickster } from "./ArcaneTrickster/ArcaneTrickster";
import { Assassin } from "./Assassin/Assassin";
import { Thief } from "./Thief/Thief";
import { Mastermind } from "./Mastermind/Mastermind";
import { Inquisitive } from "./Inquisitive/Inquisitive";
import { Scout } from "./Scout/Scout";

export class RogueSubclass extends Subclass {
  
  constructor(subclassSelection: {subclass: string, options?: string[]}){
    super(subclassSelection);
  }

  subclassDictionary = {
    THIEF: {
      "3": Thief.thief3,
      "9": Thief.thief9,
      "13": Thief.thief13,
      "17": Thief.thief17,
    },
    SCOUT: {
      "3": Scout.Scout3,
      "9": Scout.Scout9,
      "13": Scout.Scout13,
      "17": Scout.Scout17,
    },
    ASSASSIN: {
      "3": Assassin.assassin3,
      "9": Assassin.assassin9,
      "13": Assassin.assassin13,
      "17": Assassin.assassin17,
    },
    MASTERMIND: {
      "3": Mastermind.mastermind3,
      "9": Mastermind.mastermind9,
      "13": Mastermind.mastermind13,
      "17": Mastermind.mastermind17
    },
    INQUISITIVE: {
      "3": Inquisitive.inquisitive3,
      "9": Inquisitive.inquisitive9,
      "13": Inquisitive.inquisitive13,
      "17": Inquisitive.inquisitive17
    },
    "ARCANE TRICKSTER": {
      "3": ArcaneTrickster.arcaneTrickster3,
      "4": ArcaneTrickster.arcaneTrickster4,
      "7": ArcaneTrickster.arcaneTrickster7,
      "8": ArcaneTrickster.arcaneTrickster8,
      "9": ArcaneTrickster.arcaneTrickster9,
      "10": ArcaneTrickster.arcaneTrickster10,
      "11": ArcaneTrickster.arcaneTrickster11,
      "13": ArcaneTrickster.arcaneTrickster13,
      "14": ArcaneTrickster.arcaneTrickster14,
      "16": ArcaneTrickster.arcaneTrickster16,
      "17": ArcaneTrickster.arcaneTrickster17,
      "19": ArcaneTrickster.arcaneTrickster19,
      "20": ArcaneTrickster.arcaneTrickster20
    }
  }
}