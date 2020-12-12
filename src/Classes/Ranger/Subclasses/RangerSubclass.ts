import { Subclass } from "../../Subclass";
import { BeastMaster } from "./BeastMaster/BeastMaster";
import { Hunter } from "./Hunter/Hunter";
import { MonsterSlayer } from "./MonsterSlayer/MonsterSlayer";
export class RangerSubclass extends Subclass {

  constructor(subclass: string){
    super(subclass);
  }

  subclassDictionary = {
    HUNTER: {
      "3": Hunter.hunter3,
      "7": Hunter.hunter7,
      "11": Hunter.hunter11,
      "15": Hunter.hunter15,
    },
    "BEAST MASTER": {
      "3": BeastMaster.beastMaster3,
      "7": BeastMaster.beastMaster7,
      "11": BeastMaster.beastMaster11,
      "15": BeastMaster.beastMaster15,
    },
    "MONSTER SLAYER": {
      "3": MonsterSlayer.monsterSlayer3,
      "5": MonsterSlayer.monsterSlayer5,
      "7": MonsterSlayer.monsterSlayer7,
      "9": MonsterSlayer.monsterSlayer9,
      "11": MonsterSlayer.monsterSlayer11,
      "13": MonsterSlayer.monsterSlayer13,
      "15": MonsterSlayer.monsterSlayer15,
      "17": MonsterSlayer.monsterSlayer17
    }
  };
}