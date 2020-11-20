import { PlayerCharacter } from "Base/PlayerCharacter";
import { LevelingParams } from "Classes/PlayerClass";
import * as VengeanceOathDict from "./OathOfVengeance.json"


export class Vengeance {
    static getFeature(level: string, featureName: string) {
        return VengeanceOathDict["features"][level][featureName];
      }
  
      static addArchetypeSpells(pc: PlayerCharacter, level: string){
        pc.pcHelper.addSpells(this.oathSpells[level], "charisma");
      }
      
      static vengeance3(pc: PlayerCharacter, params: LevelingParams) {
        pc.pcHelper.addFeatures(
          Vengeance.getFeature("3", "ABJURE ENEMY"),
          Vengeance.getFeature("3", "VOW OF ENMITY")
        )
  
        Vengeance.addArchetypeSpells(pc, "3");
      }
  
      static vengeance5(pc: PlayerCharacter, params: LevelingParams) {
        Vengeance.addArchetypeSpells(pc, "5");
      }
    
      static vengeance7(pc: PlayerCharacter, params: LevelingParams) {
        pc.pcHelper.addFeatures(Vengeance.getFeature("7", "RELENTLESS AVENGER"))
      }
    
      static vengeance9(pc: PlayerCharacter, params: LevelingParams) {
        Vengeance.addArchetypeSpells(pc, "9");
      }
  
      static vengeance13(pc: PlayerCharacter, params: LevelingParams) {
        Vengeance.addArchetypeSpells(pc, "13");
      }
  
      static vengeance15(pc: PlayerCharacter, params: LevelingParams) {
        pc.pcHelper.addFeatures(Vengeance.getFeature("15", "SOUL OF VENGEANCE"))
      }
  
      static vengeance17(pc: PlayerCharacter, params: LevelingParams) {
        Vengeance.addArchetypeSpells(pc, "17");
      }
    
      static vengeance20(pc: PlayerCharacter, params: LevelingParams) {
        pc.pcHelper.addFeatures(Vengeance.getFeature("20", "AVENGING ANGEL"))
      }

    static oathSpells = {
        "3": ["BANE", "HUNTER'S MARK"],
        "5": ["HOLD PERSON", "MISTY STEP"],
        "9": ["HASTE", "PROTECTION FROM ENERGY"],
        "13": ["BANISHMENT", "DIMENSION DOOR"],
        "17": ["HOLD MONSTER", "SCRYING"]
    };
}