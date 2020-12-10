import { Subclass } from "../../Subclass";
import { Berserker } from "./Berserker/Berserker";
import { TotemWarrior } from "./TotemWarrior/TotemWarrior";
import { AncestralGuardian } from "./AncestralGuardian/AncestralGuardian"
import { StormHerald } from "./StormHerald/StormHerald";
import { Zealot } from "./Zealot/Zealot";
export class BarbarianSubclass extends Subclass {

  constructor(subclass: string, aura?: string){
    super(subclass);
    aura ? this.aura = aura : null;
  }
  
  aura?: string;

  subclassDictionary = {
    BERSERKER: {
      "3": Berserker.berserker3,
      "6": Berserker.berserker6,
      "10": Berserker.berserker10,
      "14": Berserker.berserker14,
    },
    ZEALOT: {
      "3": Zealot.zealot3,
      "4": Zealot.upFury,
      "6": Zealot.zealot6,
      "8": Zealot.upFury,
      "10": Zealot.zealot10,
      "12": Zealot.upFury,
      "14": Zealot.zealot14,
      "16": Zealot.upFury,
      "18": Zealot.upFury,
      "20": Zealot.upFury,
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
    "STORM HERALD": {
      "3": StormHerald.stormHerald3,
      "5": StormHerald.stormHerald5,
      "6": StormHerald.stormHerald6,
      "10": StormHerald.stormHerald10,
      "14": StormHerald.stormHerald14,
      "15": StormHerald.stormHerald15,
      "20": StormHerald.stormHerald20,
    }
  };
}