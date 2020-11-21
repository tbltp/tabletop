import { PlayerCharacter } from "../../../../Base/PlayerCharacter";
import { LevelingParams } from "../../../../Classes/PlayerClass";
import * as AncientsOathDict from "./OathOfTheAncients.json"

export class Ancients {

    static getFeature(level: string, featureName: string) {
        return AncientsOathDict["features"][level][featureName];
      }
  
      static addArchetypeSpells(pc: PlayerCharacter, level: string){
        pc.pcHelper.addSpells(this.oathSpells[level], "charisma");
      }

      static ancients3(pc: PlayerCharacter, params: LevelingParams) {
        pc.pcHelper.addFeatures(
            Ancients.getFeature("3", "NATURE'S WRATH"),
            Ancients.getFeature("3", "TURN THE FAITHLESS")
        )
  
        Ancients.addArchetypeSpells(pc, "3");
  
      }
      
      static ancients5(pc: PlayerCharacter, params: LevelingParams) {
        Ancients.addArchetypeSpells(pc, "5");
      }
  
      static ancients7(pc: PlayerCharacter, params: LevelingParams) {
        pc.pcHelper.addFeatures(Ancients.getFeature("7", "AURA OF WARDING"))
      }
  
      static ancients9(pc: PlayerCharacter, params: LevelingParams) {
        Ancients.addArchetypeSpells(pc, "9");
      }
      
      static ancients13(pc: PlayerCharacter, params: LevelingParams) {
        Ancients.addArchetypeSpells(pc, "13");
      }
  
      static ancients15(pc: PlayerCharacter, params: LevelingParams) {
        pc.pcHelper.addFeatures(Ancients.getFeature("15", "UNDYING SENTINEL"))
      }
    
      static ancients17(pc: PlayerCharacter, params: LevelingParams) {
        Ancients.addArchetypeSpells(pc, "17");
      }
  
      static ancients20(pc: PlayerCharacter, params: LevelingParams) {
        pc.pcHelper.addFeatures(Ancients.getFeature("20", "ELDER CHAMPION"))
      }

    static oathSpells = {
        "3": ["ENSNARING STRIKE", "SPEAK WITH ANIMALS"],
        "5": ["MOONBEAM", "MISTY STEP"],
        "9": ["PLANT GROWTH", "PROTECTION FROM ENERGY"],
        "13": ["ICE STORM", "STONESKIN"],
        "17": ["COMMUNE WITH NATURE", "TREE STRIDE"],
    };
    
}