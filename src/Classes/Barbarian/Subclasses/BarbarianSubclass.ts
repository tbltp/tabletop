import { Subclass } from "../../Subclass";
import { Berserker } from "./Berserker/Berserker";
import { TotemWarrior } from "./TotemWarrior/TotemWarrior";

export class BarbarianSubclass extends Subclass {

  static subclassDictionary = {
    BERSERKER: {
        "3": Berserker.berserker3,
        "6": Berserker.berserker6,
        "10": Berserker.berserker10,
        "14": Berserker.berserker14,
      },
      "TOTEM WARRIOR": {
        "3": TotemWarrior.totemWarrior3,
        "6": TotemWarrior.totemWarrior6,
        "10": TotemWarrior.totemWarrior10,
        "14": TotemWarrior.totemWarrior14,
      },
  };
}