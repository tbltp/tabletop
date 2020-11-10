import { PlayerCharacter } from "Base/PlayerCharacter";
import { LevelingParams } from "Classes/PlayerClass";
import { SpellSlotFactory } from "Classes/SpellSlotFactory";
import * as EldritchKnightArchetype from "./EldritchKnight.json"

export class EldritchKnight {

    static getFeature(level: string, featureName: string) {
        return EldritchKnightArchetype["features"][level][featureName];
    }

    static eldritchKnight3(pc: PlayerCharacter, params: LevelingParams) {
        pc.addSpells(params.spellSelection, "intelligence");
        SpellSlotFactory.applySpellSlotsAtLevel(pc, 3, "TERTIARY")
        pc.addFeatures(EldritchKnight.getFeature( "3", "WEAPON BOND"))
    
      }
    
      static eldritchKnight7(pc: PlayerCharacter, params: LevelingParams) {
        pc.addFeatures(EldritchKnight.getFeature("7", "WAR MAGIC"))
      }
    
      static eldritchKnight10(pc: PlayerCharacter, params: LevelingParams) {
        pc.addFeatures(EldritchKnight.getFeature("10", "ELDRITCH STRIKE"))
      }
    
      static eldritchKnight15(pc: PlayerCharacter, params: LevelingParams) {
        pc.addFeatures(EldritchKnight.getFeature("15", "ARCANE CHARGE"))
      }
    
      static eldritchKnight18(pc: PlayerCharacter, params: LevelingParams) {
        pc.addFeatures(EldritchKnight.getFeature("18", "IMPROVED WAR MAGIC"))
      }
}