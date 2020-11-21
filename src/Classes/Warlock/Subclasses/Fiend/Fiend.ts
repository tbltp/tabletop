import { PlayerCharacter } from "../../../../Base/PlayerCharacter";
import { LevelingParams } from "../../../../Classes/PlayerClass";
import * as FiendPatronDict from "./TheFiend.json"

export class Fiend {

    static getFeature(level: string, featureName: string) {
        return FiendPatronDict["features"][level][featureName];
    }

    static getPatronSpells(pc: PlayerCharacter, patron: string, level: string) {
        pc.pcHelper.addSpells(Fiend.patronSpells[level], "charisma");
    }

    static fiend1(pc: PlayerCharacter, params: LevelingParams) {
        pc.pcHelper.addFeatures(Fiend.getFeature("1", "DARK ONE'S BLESSING"));
      }
  
      static fiend6(pc: PlayerCharacter, params: LevelingParams) {
        pc.pcHelper.addFeatures(Fiend.getFeature("6", "DARK ONE'S OWN LUCK"));
      }
    
      static fiend10(pc: PlayerCharacter, params: LevelingParams) {
        pc.pcHelper.addFeatures(Fiend.getFeature("10", "FIENDISH RESILIENCE"));
      }
    
      static fiend14(pc: PlayerCharacter, params: LevelingParams) {
        pc.pcHelper.addFeatures(Fiend.getFeature("14", "HURL THROUGH HELL"));
      }

    static patronSpells = {
        "1": ["BURNING HANDS", "COMMAND"],
        "2": ["BLINDNESS/DEAFNESS", "SCORCHING RAY"],
        "3": ["FIREBALL", "STINKING CLOUD"],
        "4": ["FIRE SHIELD", "WALL OF FIRE"],
        "5": ["FLAME STRIKE", "HALLOW"]
    }
}