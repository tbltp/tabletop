import { PlayerCharacter } from "Base/PlayerCharacter";
import { LevelingParams } from "Classes/PlayerClass";
import * as ArchfeyPatronDict from "./TheArchfey.json"

export class Archfey {

    static getFeature(level: string, featureName: string) {
        return ArchfeyPatronDict["features"][level][featureName];
    }

    static getPatronSpells(pc: PlayerCharacter, patron: string, level: string) {
        pc.pcHelper.addSpells(Archfey.patronSpells[level], "charisma");
    }

    static archfey1(pc: PlayerCharacter, params: LevelingParams) {
        pc.pcHelper.addFeatures(Archfey.getFeature("1", "FEY PRESENCE"));
      }
  
      static archfey6(pc: PlayerCharacter, params: LevelingParams) {
        pc.pcHelper.addFeatures(Archfey.getFeature("6", "MISTY ESCAPE"));
      }
    
      static archfey10(pc: PlayerCharacter, params: LevelingParams) {
        pc.pcHelper.addFeatures(Archfey.getFeature("10", "BEGUILING DEFENSES"));
      }
    
      static archfey14(pc: PlayerCharacter, params: LevelingParams) {
        pc.pcHelper.addFeatures(Archfey.getFeature("14", "DARK DELIRIUM"));
      }

    static patronSpells = {
        "1": ["FAERIE FIRE", "SLEEP"],
        "2": ["CALM EMOTIONS", "PHANTASMAL FORCE"],
        "3": ["BLINK", "PLANT GROWTH"],
        "4": ["DOMINATE BEAST", "GREATER INVISIBILITY"],
        "5": ["DOMINATE PERSON", "SEEMING"]
    }
}