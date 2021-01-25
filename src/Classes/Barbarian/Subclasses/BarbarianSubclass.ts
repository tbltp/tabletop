import { Subclass } from "../../Subclass";
import { Berserker } from "./Berserker/Berserker";
import { TotemWarrior } from "./TotemWarrior/TotemWarrior";
import { AncestralGuardian } from "./AncestralGuardian/AncestralGuardian"
import { StormHerald } from "./StormHerald/StormHerald";
import { Zealot } from "./Zealot/Zealot";
import { LevelingParams } from "Classes/PlayerClass";
import { PlayerCharacter } from "index";
import { Beast } from "./Beast/Beast";

export class BarbarianSubclass extends Subclass {

  constructor(subclassSelection: {subclass: string, options?: string[]}){
    super(subclassSelection);
    subclassSelection.subclass === "STORM HERALD" ? this.persistentSelection = {choice: subclassSelection.options[0]} : null;
  }

  subclassDictionary = {
    BERSERKER: {
      "3": Berserker.berserker3,
      "6": Berserker.berserker6,
      "10": Berserker.berserker10,
      "14": Berserker.berserker14,
    },
    BEAST: {
      "3": Beast.beast3,
      "6": Beast.beast6,
      "10": Beast.beast10,
      "14": Beast.beast14,
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

  subclassDriver(pc: PlayerCharacter, level: string, subclass: string, params: LevelingParams){
    if(!this.subclassDictionary[subclass][level]){ return; }
    if(this.persistentSelection){
      params.subclassSelection = {subclass: "STORM HERALD", options: [this.persistentSelection.choice]};
    }
    this.subclassDictionary[subclass][level](pc, params);
  }
}