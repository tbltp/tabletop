import { Subclass } from "../../Subclass";
import { Berserker } from "./Berserker/Berserker";
import { TotemWarrior } from "./TotemWarrior/TotemWarrior";
import { AncestralGuardian } from "./AncestralGuardian/AncestralGuardian"
export class BarbarianSubclass extends Subclass {

  constructor(subclass: string){
    super(subclass);
  }

  subclassDictionary = {
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
    "ANCESTRAL GUARDIAN": {
      "3": AncestralGuardian.ancestralGuardian3,
      "6": AncestralGuardian.ancestralGuardian6,
      "10": AncestralGuardian.ancestralGuardian10,
      "14": AncestralGuardian.ancestralGuardian14,
    },
  };
}