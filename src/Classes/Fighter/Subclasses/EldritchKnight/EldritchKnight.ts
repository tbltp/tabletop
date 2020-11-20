import { PlayerCharacter } from "Base/PlayerCharacter";
import { LevelingParams } from "Classes/PlayerClass";
import { SpellSlotFactory } from "Classes/SpellSlotFactory";
import * as EldritchKnightArchetype from "./EldritchKnight.json"

export class EldritchKnight {

    static getFeature(level: string, featureName: string) {
        return EldritchKnightArchetype["features"][level][featureName];
    }

    static eldritchKnight3(pc: PlayerCharacter, params: LevelingParams) {
  
      // FUCK LOL
      // this.addSpellcasting(pc, "FIGHTER (ELDRITCH KNIGHT)");

        pc.addSpells(params.spellSelection, "intelligence");
        pc.addFeatures(EldritchKnight.getFeature( "3", "WEAPON BOND"))
    
      }
      
      static eldritchKnight4(pc: PlayerCharacter, params: LevelingParams) {
        pc.addSpells(params.spellSelection, "intelligence");
      }

      static eldritchKnight7(pc: PlayerCharacter, params: LevelingParams) {
        pc.addFeatures(EldritchKnight.getFeature("7", "WAR MAGIC"))
        pc.addSpells(params.spellSelection, "intelligence");
      }

      static eldritchKnight8(pc: PlayerCharacter, params: LevelingParams) {
        pc.addSpells(params.spellSelection, "intelligence");
      }
    
      static eldritchKnight10(pc: PlayerCharacter, params: LevelingParams) {
        pc.addFeatures(EldritchKnight.getFeature("10", "ELDRITCH STRIKE"))
        pc.addSpells(params.spellSelection, "intelligence");
      }

      static eldritchKnight11(pc: PlayerCharacter, params: LevelingParams) {
        pc.addSpells(params.spellSelection, "intelligence");
      }

      static eldritchKnight13(pc: PlayerCharacter, params: LevelingParams) {
        pc.addSpells(params.spellSelection, "intelligence");
      }

      static eldritchKnight14(pc: PlayerCharacter, params: LevelingParams) {
        pc.addSpells(params.spellSelection, "intelligence");
      }
    
      static eldritchKnight15(pc: PlayerCharacter, params: LevelingParams) {
        pc.addFeatures(EldritchKnight.getFeature("15", "ARCANE CHARGE"))
      }

      static eldritchKnight16(pc: PlayerCharacter, params: LevelingParams) {
        pc.addSpells(params.spellSelection, "intelligence");
      }
    
      static eldritchKnight18(pc: PlayerCharacter, params: LevelingParams) {
        pc.addFeatures(EldritchKnight.getFeature("18", "IMPROVED WAR MAGIC"))
      }

      static eldritchKnight19(pc: PlayerCharacter, params: LevelingParams) {
        pc.addSpells(params.spellSelection, "intelligence");
      }

      static eldritchKnight20(pc: PlayerCharacter, params: LevelingParams) {
        pc.addSpells(params.spellSelection, "intelligence");
      }
}