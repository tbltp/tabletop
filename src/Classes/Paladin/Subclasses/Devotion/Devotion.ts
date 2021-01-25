import { PlayerCharacter } from "../../../../Base/PlayerCharacter";
import { LevelingParams } from "../../../../Classes/PlayerClass";
import * as DevotionOathDict from "./OathOfDevotion.json"

export class Devotion {
    static getFeature(level: string, featureName: string) {
        return DevotionOathDict[level][featureName];
      }
  
      static addArchetypeSpells(pc: PlayerCharacter, level: string){
        pc.pcHelper.addSpells(this.oathSpells[level], "charisma");
      }
    
    static devotion3(pc: PlayerCharacter, params: LevelingParams) {
        pc.pcHelper.addFeatures(
            Devotion.getFeature("3", "SACRED WEAPON"), 
            Devotion.getFeature("3", "TURN THE UNHOLY") 
        )
  
        Devotion.addArchetypeSpells(pc, "3");
      }
  
      static devotion5(pc: PlayerCharacter, params: LevelingParams) {
        Devotion.addArchetypeSpells(pc, "5");
      }
    
    
      static devotion7(pc: PlayerCharacter, params: LevelingParams) {
        pc.pcHelper.addFeatures(Devotion.getFeature("7", "AURA OF DEVOTION")) 
      }
    
      static devotion9(pc: PlayerCharacter, params: LevelingParams) {
        Devotion.addArchetypeSpells(pc, "9");
      }
  
      static devotion13(pc: PlayerCharacter, params: LevelingParams) {
        Devotion.addArchetypeSpells(pc, "13");
      }
  
      static devotion15(pc: PlayerCharacter, params: LevelingParams) {
        pc.pcHelper.addFeatures(Devotion.getFeature("15", "PURITY OF SPIRIT"))
      }
  
      static devotion17(pc: PlayerCharacter, params: LevelingParams) {
        Devotion.addArchetypeSpells(pc, "17");
      }
    
      static devotion20(pc: PlayerCharacter, params: LevelingParams) {
        pc.pcHelper.addFeatures(Devotion.getFeature("20", "HOLY NIMBUS"))
      }

    static oathSpells = {
        "3": ["PROTECTION FROM EVIL AND GOOD", "SANCTUARY"],
        "5": ["LESSER RESTORATION", "ZONE OF TRUTH"],
        "9": ["BEACON OF HOPE", "DISPEL MAGIC"],
        "13": ["FREEDOM OF MOVEMENT", "GUARDIAN OF FAITH"],
        "17": ["COMMUNE", "FLAME STRIKE"]
      };
}